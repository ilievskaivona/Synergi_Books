export interface AttributionsByIdParam {
    userId: number,
    bookId: number,
}

export interface AttributionsQueryParam {
    userId?: number,
    bookId?: number,
    CreatedAt?: string,
    UpdatedAt?: string,
}
  
export interface AttributionsPostBody {
    userId?: number,
    bookId?: number,
}