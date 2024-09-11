export interface DifficultyByIdParam {
    difficultyId: number
  }

export interface DifficultyQueryParam {
    name?: string,
    CreatedAt?: string,
    UpdatedAt?: string,
}
  
export interface DifficultyPostBody {
    name: string
}