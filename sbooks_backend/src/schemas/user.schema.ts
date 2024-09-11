import { cloneDeep } from "lodash";
import { commonSchema } from "./common.schema";
const userSchema = cloneDeep(commonSchema);
import { Role, UserStatus } from "../types/user/user.model.types";
const userBodyBase = {
  name: { type: "string" },
  email: { type: "string" },
  role: { type: "string", enum: Object.values(Role) },
  status: { type: "string", enum: Object.values(UserStatus) },
};

const userBody = {
  DBUserId: { type: "integer" },
  ...userBodyBase,
  createdBy: { type: "integer" },
  updatedBy: { type: "integer" },
  CreatedAt: { type: "string" },
  UpdatedAt: { type: "string" },
};

const userQueryBody = {
  ...userBodyBase,
  createdBy: { type: "integer" },
  updatedBy: { type: "integer" },
  CreatedAt: { type: "string" },
  UpdatedAt: { type: "string" },
};

const userPostBody = {
  ...userBodyBase,
  password: { type: "string" },
  user: { type: "integer" },
};

const userBaseRequired = ["name", "email", "role"];
const userGetRequired = [
  "DBUserId",
  ...userBaseRequired,
  "createdBy",
  "updatedBy",
  "CreatedAt",
  "UpdatedAt",
];
const userPostRequired = [...userBaseRequired];

userSchema.response[200] = {
  type: "object",
  properties: userBody,
  required: userGetRequired,
};

userSchema.params = {
  type: "object",
  properties: {
    DBUserId: { type: "string" },
  },
  required: ["DBUserId"],
};

const usersSchema = cloneDeep(commonSchema);

usersSchema.response[200] = {
  type: "array",
  items: {
    type: "object",
    properties: userBody,
    required: userGetRequired,
  },
};

usersSchema.querystring = {
  type: "object",
  properties: userQueryBody,
};

const userPostSchema = cloneDeep(commonSchema);
userPostSchema.body = {
  type: "object",
  properties: userPostBody,
  required: userPostRequired,
  additionalProperties: false,
};

const userPutSchema = cloneDeep(commonSchema);
userPostSchema.body = {
  type: "object",
  properties: userPostBody,
  required: userPostRequired,
  additionalProperties: false,
};

export { userSchema, usersSchema, userPostSchema, userPutSchema }

