// http://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Pageable.html
//https://github.com/arifcseru/springboot-angular-mysql-basic-crud/blob/master/angular_app/src/app/pagination.ts

export interface PaginationPropertySort {
  direction: string;
  property: string;
}

export interface PaginationPage<T> {
  content : Array<T>;
  last?: boolean;
  first?: boolean;
  number: number;
  size: number;
  totalPages? : number;
  itemsPerPage?: number;
  sort?: Array<PaginationPropertySort>;
}
