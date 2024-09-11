import User from "../../models/user";

export type FieldError = {
  field: string;

  message: string;
};

export type UserResponse = {
  errors?: FieldError[];

  user?: User;
};
