export interface BookTagsByIdParam {
  TagId: number;
}

export interface BookTagsQueryParam {
  bookId?: number;

}

export interface BookTagsPostBody {
  BookId: number;
}
