import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "./db.config";
import { Role, UserModel, UserStatus } from "../types/user/user.model.types";

class User extends Model<UserModel> implements UserModel {
  DBUserId!: number;
  password!: string;
  name!: string;
  email!: string;
  role!: Role;
  status!: UserStatus;
  createdBy!: number;
  updatedBy!: number;
}

User.init(
  {
    DBUserId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "Password",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "Name",
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "Email",
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.values(Role),
      allowNull: false,
      field: "Role",
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(UserStatus),
      defaultValue: UserStatus.PENDING,
      allowNull: false,
      field: "Status",
    },
    createdBy: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: "CreatedBy",
    },
    updatedBy: {
      type: DataTypes.NUMBER,
      allowNull: true,
      field: "UpdatedBy",
    },
  },
  {
    sequelize: sequelizeConnection,
  }
);

export default User;
