import { GetFilterKeywords } from '../core/feedback/feedback';
import { filterOutConflictingFilterKeywords } from '../helper/filter-out-conflicting-keywords.helper';
import {
  IS_ANONYMOUS,
  PENDING,
  REJECTED,
  RESOLVED,
  STATUS,
  UNRESOLVED,
} from '../ui/components/dashboard/const/filter_feedbacks';

export const applyFeedbackFilters = (
  filters: { keyword: string; value: boolean | string }[],
  filterParams: { keyword: string; value: boolean | string },
  checked: boolean,
  value: GetFilterKeywords,
) => {
  let newFilters = [...filters];

  if (checked) {
    switch (value) {
      case GetFilterKeywords.ANONYMOUSLY:
        newFilters = filterOutConflictingFilterKeywords(newFilters, IS_ANONYMOUS, [false]);
        break;
      case GetFilterKeywords.PUBLIC:
        newFilters = filterOutConflictingFilterKeywords(newFilters, IS_ANONYMOUS, [true]);
        break;
      case GetFilterKeywords.RESOLVED:
        newFilters = filterOutConflictingFilterKeywords(newFilters, STATUS, [UNRESOLVED, PENDING, REJECTED]);
        break;
      case GetFilterKeywords.UNRESOLVED:
        newFilters = filterOutConflictingFilterKeywords(newFilters, STATUS, [RESOLVED, PENDING, REJECTED]);
        break;
      case GetFilterKeywords.PENDING:
        newFilters = filterOutConflictingFilterKeywords(newFilters, STATUS, [RESOLVED, UNRESOLVED, REJECTED]);
        break;
      case GetFilterKeywords.REJECTED:
        newFilters = filterOutConflictingFilterKeywords(newFilters, STATUS, [RESOLVED, UNRESOLVED, PENDING]);
        break;
      default:
        break;
    }
    newFilters.push(filterParams);
    return newFilters;
  }

  newFilters = newFilters.filter(
    filter => filter.keyword !== filterParams.keyword || filter.value !== filterParams.value,
  );

  return newFilters;
};
