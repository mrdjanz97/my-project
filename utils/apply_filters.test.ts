import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetFilterKeywords } from '../core/feedback/feedback';
import { PENDING, RESOLVED, STATUS, UNRESOLVED } from '../ui/components/dashboard/const/filter_feedbacks';
import { applyFeedbackFilters } from './apply_filters';
import { filterOutConflictingFilterKeywords } from '../helper/filter-out-conflicting-keywords.helper';
import { filterMapping } from './filters_map';

vi.mock('../helper/filter-out-conflicting-keywords.helper', () => ({
  filterOutConflictingFilterKeywords: vi.fn(),
}));

describe('Util file: apply_filters.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Method: applyFeedbackFilters', () => {
    it('should correctly add and remove filters based on filterMapping', () => {
      Object.entries(filterMapping).forEach(([key, { keyword, value }]) => {
        const filters = [];
        const filterParams = { keyword, value };

        (filterOutConflictingFilterKeywords as any).mockReturnValueOnce(filters);
        const newFilters = applyFeedbackFilters(filters, filterParams, true, key as GetFilterKeywords);

        expect(newFilters).toContainEqual(filterParams);
        expect(filterOutConflictingFilterKeywords).toHaveBeenCalledWith([], keyword, expect.any(Array));

        const filtersAfterAddition = [filterParams];
        const newFiltersAfterRemoval = applyFeedbackFilters(
          filtersAfterAddition,
          filterParams,
          false,
          key as GetFilterKeywords,
        );

        expect(newFiltersAfterRemoval).not.toContainEqual(filterParams);
        expect(newFiltersAfterRemoval.length).toBe(filtersAfterAddition.length - 1);
        expect(newFiltersAfterRemoval).toEqual([]);
      });
    });

    it('should handle specific conflicting filters correctly', () => {
      const filters = [
        { keyword: STATUS, value: UNRESOLVED },
        { keyword: STATUS, value: PENDING },
      ];
      const filterParams = { keyword: STATUS, value: RESOLVED };

      const conflictingValues = Object.values(filterMapping)
        .filter(mapping => mapping.keyword === STATUS && mapping.value !== RESOLVED)
        .map(mapping => mapping.value);

      (filterOutConflictingFilterKeywords as any).mockReturnValueOnce(
        filters.filter(f => f.keyword !== STATUS || !conflictingValues.includes(f.value)),
      );

      const newFilters = applyFeedbackFilters(filters, filterParams, true, GetFilterKeywords.RESOLVED);

      conflictingValues.forEach(conflictingValue => {
        expect(newFilters).not.toContainEqual({ keyword: STATUS, value: conflictingValue });
      });
      expect(newFilters).toContainEqual(filterParams);
      expect(filterOutConflictingFilterKeywords).toHaveBeenCalledWith(filters, STATUS, conflictingValues);
    });
  });
});
