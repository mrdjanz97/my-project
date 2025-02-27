import { PAGE_COUNT } from '../core/feedback/queries/const/consts';

export const getPreviousPage = firstPage => {
  const currentPage = firstPage.data.length / PAGE_COUNT;
  return currentPage > 1 ? currentPage - 1 : undefined;
};
