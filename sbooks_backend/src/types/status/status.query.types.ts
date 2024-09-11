import { StatusModel } from "./status.model.type"

export interface StatusByIdParam {
  statusId: number
}

export interface StatusesQueryParam {
  name?: string,  
  CreatedAt?: string,
  UpdatedAt?: string
}

export interface StatusPostBody {
  name: string,
}