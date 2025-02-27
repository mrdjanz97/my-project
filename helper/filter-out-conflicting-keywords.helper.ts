export const filterOutConflictingFilterKeywords = (
  filters: { keyword: string; value: boolean | string }[],
  keyword: string,
  conflictingValues: (boolean | string)[],
): { keyword: string; value: boolean | string }[] => {
  return filters.filter(filter => filter.keyword !== keyword || !conflictingValues.includes(filter.value));
};
