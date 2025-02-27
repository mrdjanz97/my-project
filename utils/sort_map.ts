import { GetSortKeywords } from '../core/feedback/feedback';
import { getLabelFromValue } from '../helper/value_to_label.helper';
import { CREATED_AT, DOWN_COUNT, UP_COUNT } from '../ui/components/dashboard/const/sort_feedbacks';

interface SortMapping {
  [key: string]: { keyword: string; value: boolean };
}

const sortMapping: SortMapping = {
  [GetSortKeywords.NEWEST]: { keyword: CREATED_AT, value: false },
  [GetSortKeywords.OLDEST]: { keyword: CREATED_AT, value: true },
  [GetSortKeywords.MOST_LIKED]: { keyword: UP_COUNT, value: false },
  [GetSortKeywords.LEAST_LIKED]: { keyword: UP_COUNT, value: true },
  [GetSortKeywords.MOST_DISLIKED]: { keyword: DOWN_COUNT, value: false },
  [GetSortKeywords.LEAST_DISLIKED]: { keyword: DOWN_COUNT, value: true },
};

export const getSortParams = (sortOption: GetSortKeywords) => sortMapping[sortOption];

export const sortOptions = getLabelFromValue(Object.entries(GetSortKeywords));
