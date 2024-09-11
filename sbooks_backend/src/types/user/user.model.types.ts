export enum UserStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  PENDING = "Pending",
}

export enum Role {
  ADMIN = "Admin",
  APPROVER = "Approver",
  EDITOR = "Editor",
}
export interface UserModel {
  DBUserId?: number;
  name: string;
  password: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdBy?: number;
  updatedBy?: number;
}
