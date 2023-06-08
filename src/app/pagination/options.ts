export interface Options {
  orderBy: string;
  orderDir: 'ASC' | 'DESC';
  sort: {
    property: string,
    direction: SortDirection
  },
  search: string,
  size: number,
  page: number;
}
export enum SortDirection {
  ASC= 'ASC',
  DESC = 'DESC'
}
