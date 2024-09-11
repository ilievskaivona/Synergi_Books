export interface BookDetailsByIdParam {
  BookDetailsId: number;
}

export interface BookDetailsQueryParam {
  BookId?: number;
  description?: string;
  level?: number;
  parent?: number;
  sort?: number;
  source?: string;
}

export interface BookDetailsPostBody {
  BookId: number;
  description: string;
  level: number;
  parent?: number;
  sort: number;
  source: string;
}
