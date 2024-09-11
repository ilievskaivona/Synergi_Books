
export interface SubjectByIdParam {
    subjectId: number
  }

export interface SubjectsQueryParam {
    name?: string,
    CreatedAt?: string;
    UpdatedAt?: string;
  }
  
  export interface SubjectPostBody {
    name: string,
  }