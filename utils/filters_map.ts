import { GetFilterKeywords } from '../core/feedback/feedback';
import { getLabelFromValue } from '../helper/value_to_label.helper';
import {
  IS_ANONYMOUS,
  PENDING,
  REJECTED,
  RESOLVED,
  STATUS,
  UNRESOLVED,
} from '../ui/components/dashboard/const/filter_feedbacks';

interface FilterMapping {
  [key: string]: { keyword: string; value: boolean | string };
}

export const filterMapping: FilterMapping = {
  [GetFilterKeywords.ANONYMOUSLY]: { keyword: IS_ANONYMOUS, value: true },
  [GetFilterKeywords.PUBLIC]: { keyword: IS_ANONYMOUS, value: false },
  [GetFilterKeywords.RESOLVED]: { keyword: STATUS, value: RESOLVED },
  [GetFilterKeywords.UNRESOLVED]: { keyword: STATUS, value: UNRESOLVED },
  [GetFilterKeywords.PENDING]: { keyword: STATUS, value: PENDING },
  [GetFilterKeywords.REJECTED]: { keyword: STATUS, value: REJECTED },
};

export const getFilterParams = (sortOption: GetFilterKeywords) => filterMapping[sortOption];

export const filterOptions = getLabelFromValue(Object.entries(GetFilterKeywords));
