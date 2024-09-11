export interface BookDetailsModel {
  BookDetailsId?: number;
  BookId: number;
  description: string;
  level: number;
  parent?: number;
  sort: number;
  source: string;
}
