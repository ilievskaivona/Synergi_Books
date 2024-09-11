import { BookStatus, Difficulty, Grade } from "./book.model.types"

export interface BookByIdParam {
  bookId: number
}

export interface BooksQueryParam {
  title?: string,
  grade?: Grade,
  difficulty?: Difficulty,
  author?: string,
  status?: BookStatus,
  createdBy?: number,
  updatedBy?: number,
  createdByFrom?: string,
  createdByTo?: string,
  subjectName?: string
  page?: number;
  pageSize?: number;
}

export interface FilterQueryParam {
  title?: string,
  author?: string,
  grade?: Grade,
  status?: BookStatus,
  subjectNames?: string,
  userName?: string,
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  sortBy?: 'newestFirst' | 'oldestFirst' | 'recentlyModified' | 'oldestModified' | 'titleAtoZ' | 'titleZtoA';
}

export interface BookPostBody {
  title: string,
  grade: Grade,
  difficulty: Difficulty,
  author: string,
  status: BookStatus,
  user: number,
}