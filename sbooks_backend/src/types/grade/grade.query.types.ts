export interface GradeByIdParam {
  gradeId: number;
}

export interface GradesQueryParam {
  name?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
}

export interface GradePostBody {
  name: string;
}
