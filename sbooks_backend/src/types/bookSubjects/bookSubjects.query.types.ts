export interface BookSubjectsByIdParam {
  subjectId: number,
  bookId: number
}

export interface BookSubjectsQueryParam {
  subjectId?: number;
  bookId?: number;
}

export interface BookSubjectsPostBody {
  subjectId: number;
  bookId: number;
}
