import { Op } from "sequelize";
import bcrypt from "bcrypt";
import User from "../models/user";
import { UserPostBody, UserQueryParam } from "../types/user/user.query.types";
import { UserResponse } from "../types/user/user.response.types";
import { Role, UserStatus } from "../types/user/user.model.types";
import nodemailer from "nodemailer"


const getUserById = async (userId: number) => {
  const response = await User.findByPk(userId);
  return response;
};

const getUsers = async (query: UserQueryParam) => {
  let dbData 
  let totalUsers = 0;
  if(query.searchQuery?.trim()===""){
    dbData = await User.findAll()
  }else{
   dbData = await User.findAll({
    where: {
    [Op.or]:[{
      name: {[Op.iLike]: `%${query.searchQuery}%` },
    },{
      email: {[Op.iLike]: `%${query.searchQuery}%` }
    }, {
       role: {[Op.iLike]: `%${query.searchQuery}%` }
    },
    {
       status: {[Op.iLike]: `%${query.searchQuery}%` }
    }]
    },
  });
  }
  totalUsers = dbData.length
  console.log("DBDATA",dbData)
  return { dbData, totalUsers};
};


const getUsersByPage = async (query: UserQueryParam, offset: number, pageSize: number, endIndex:number): Promise<User[]> => {
  const { dbData } = await getUsers(query);
  const paginatedData = dbData.slice(offset, endIndex); 

  return paginatedData;
};


const createUser = async (body: UserPostBody) => {
  if (body.name.length <= 4) {
    return {
      errors: [
        {
          field: "name",
          message: "Name must be longer than 4 characters!",
        },
      ],
    };
  }
  if (!body.email.includes("@")) {
    return {
      errors: [
        {
          field: "email",
          message: "Enter a valid email",
        },
      ],
    };
  }
  const randomPassword = generateRandomPassword();
 

  try {
    const newUser = await User.create({
      ...body,
      password: randomPassword,
      createdBy: body.user,
      updatedBy: body.user,
    });
      const emailSubject = "First time log in ";
      const emailMessage = `Hello ${newUser.name},\n\nYour account has been successfully created.\n\nYour password is ${newUser.password}`;
      await sendEmail(newUser.email, emailSubject, emailMessage);
      return newUser;
    
  } catch (error) {
    console.log(error);
    return null;
  }
};



const loginUser = async (
  email: string,
  password: string
): Promise<UserResponse> => {
  if (!email.includes("@")) {
    return {
      errors: [
        {
          field: "email",
          message: "Enter a valid email",
        },
      ],
    };
  }
  let user;
  try {
    user = await User.findOne({ where: { email } });
  } catch (error) {
    console.log(error);
  }
  if (!user) {
    return {
      errors: [
        {
          field: "email",
          message: "Wrong email",
        },
      ],
    };
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return {
      errors: [
        {
          field: "password",
          message: "Wrong password",
        },
      ],
    };
  }
  // to do seession and authentication with cookies
  return { user };
};

const editUser = async (userId: number, body: UserPostBody): Promise<UserResponse> => {
    if (body.name.length <= 4) {
    return {
      errors: [
        {
          field: "name",
          message: "Name must be longer than 4 characters!",
        },
      ],
    };
  }
  if (!body.email.includes("@")) {
    return {
      errors: [
        {
          field: "email",
          message: "Enter a valid email",
        },
      ],
    };
  }
    let user;
  try {
    const [numAffectedRows, updatedUser] = await User.update(
      {
         ...body,
        updatedBy: body.user,
      },
      { where: { DBUserId: userId }, returning: true }
    );

    if (numAffectedRows === 0) {
      return {
        errors: [
          {
            field: "name",
            message: "Could not find user.",
          },
        ],
      };
    }
    user = updatedUser[0];
  } catch (error) {
    console.log(error);
  }
  return { user };
  
};

const deactivateUser = async (userId: number, body: UserPostBody) => {
  const [numAffectedRows] = await User.update(
    { status: body.status},
    { where: { DBUserId: userId } }
  );
  if (numAffectedRows === 0) {
    return { error: "Could not find user." };
  }
  return { success: true };
};

const generateRandomPassword = () => {
  const length = 10;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; ++i) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const sendEmail = async (to: string, subject: string, text: string) => {
  // Create a Nodemailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail's SMTP server
    port: 587, // Port for STARTTLS
    secure: false, // StartTLS requires false
    auth: {
      user: "davidzdravkovski23@gmail.com", // Your Gmail email address
      pass: "gpceihvgnawkynvj", // Your Gmail password or app-specific password
    },
  });

  // Send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"SBooks" <davidzdravkovski23@gmail.com>', // Sender address
    to: to, // List of recipients
    subject: subject, // Subject line
    text: text, // Plain text body
    // html: '<b>Hello world?</b>' // You can also send HTML content
  });

  console.log("Message sent: %s", info.messageId);
};
export default {
  getUserById,
  getUsers,
  createUser,
  loginUser,
  editUser,
  deactivateUser,
  getUsersByPage
};
