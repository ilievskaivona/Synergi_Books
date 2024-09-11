export enum BookStatus {
  DRAFT = 'draft',
  FOR_APPROVAL = 'for_approval',
  PUBLISHED = 'published',
}

export enum Grade {
  ONE = '1st',
  TWO = '2nd',
  THREE = '3rd',
  FOUR = '4th',
  FIVE = '5th',
  SIX = '6th',
  SEVEN = '7th',
  EIGHT = '8th',
  NINE = '9th',
  HIGH_SCHOOL = 'high_school',
  COLLEGE = 'college'
}

export enum Difficulty {
  BEGINNER = 'beginner',
  ADVANCED = 'advanced',
}

export interface BookModel {
  BookId?: number,
  title: string,
  grade: Grade,
  difficulty: Difficulty,
  author: string,
  status: BookStatus,
  createdBy: number,
  updatedBy: number
}

// export interface PaginationResponse<T> {
//   totalCount: number;
//   totalPages: number;
//   books: T[];
// }