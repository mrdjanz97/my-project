import { PAGE_COUNT } from '../core/feedback/queries/const/consts';

export const getNextPage = (lastPage, allPages) => {
  const currentPage = allPages.length;
  return currentPage < Math.ceil(lastPage?.count / PAGE_COUNT) ? currentPage + 1 : undefined;
};
