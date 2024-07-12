import { SortDirection } from "../enam/SortDirection";

export const userQueryFilter = (search: any) => {
  return {
    pageNumber: search.pageNumber ? +search.pageNumber : 1,
    pageSize: search.pageSize !== undefined ? +search.pageSize : 10,
    sortBy: search.sortBy ? search.sortBy : 'createdAt',
    sortDirection: search.sortDirection
      ? (search.sortDirection as SortDirection)
      : SortDirection.Descending,
    searchLoginTerm: search.searchLoginTerm ? search.searchLoginTerm : null,
    searchEmailTerm: search.searchEmailTerm ? search.searchEmailTerm : null,
  };
};
