import { describe, it, expect } from 'vitest';
import { filterOutConflictingFilterKeywords } from './filter-out-conflicting-keywords.helper';
import { IS_ANONYMOUS, PENDING, RESOLVED, STATUS, UNRESOLVED } from '../ui/components/dashboard/const/filter_feedbacks';

describe('Helper file: filter_out_conflicting-keywords.helper.ts', () => {
  describe('Method: filterOutConflictingFilterKeywords', () => {
    it('should filter out conflicting filters based on keyword and values', () => {
      const filters = [
        { keyword: STATUS, value: RESOLVED },
        { keyword: STATUS, value: UNRESOLVED },
        { keyword: IS_ANONYMOUS, value: true },
        { keyword: IS_ANONYMOUS, value: false },
      ];

      const keyword = STATUS;
      const conflictingValues = [RESOLVED];

      const result = filterOutConflictingFilterKeywords(filters, keyword, conflictingValues);

      expect(result).toEqual([
        { keyword: STATUS, value: UNRESOLVED },
        { keyword: IS_ANONYMOUS, value: true },
        { keyword: IS_ANONYMOUS, value: false },
      ]);
    });

    it('should filter out multiple conflicting filters based on keyword and values', () => {
      const filters = [
        { keyword: STATUS, value: RESOLVED },
        { keyword: STATUS, value: UNRESOLVED },
        { keyword: IS_ANONYMOUS, value: true },
        { keyword: IS_ANONYMOUS, value: false },
      ];

      const keyword = STATUS;
      const conflictingValues = [RESOLVED, UNRESOLVED];

      const result = filterOutConflictingFilterKeywords(filters, keyword, conflictingValues);

      expect(result).toEqual([
        { keyword: IS_ANONYMOUS, value: true },
        { keyword: IS_ANONYMOUS, value: false },
      ]);
    });

    it('should not filter out filters if no conflicting values match', () => {
      const filters = [
        { keyword: STATUS, value: RESOLVED },
        { keyword: STATUS, value: UNRESOLVED },
        { keyword: IS_ANONYMOUS, value: true },
        { keyword: IS_ANONYMOUS, value: false },
      ];

      const keyword = STATUS;
      const conflictingValues = [PENDING];

      const result = filterOutConflictingFilterKeywords(filters, keyword, conflictingValues);

      expect(result).toEqual([
        { keyword: STATUS, value: RESOLVED },
        { keyword: STATUS, value: UNRESOLVED },
        { keyword: IS_ANONYMOUS, value: true },
        { keyword: IS_ANONYMOUS, value: false },
      ]);
    });

    it('should handle empty filters array', () => {
      const filters: { keyword: string; value: boolean | string }[] = [];

      const keyword = STATUS;
      const conflictingValues = [RESOLVED, UNRESOLVED];

      const result = filterOutConflictingFilterKeywords(filters, keyword, conflictingValues);

      expect(result).toEqual([]);
    });

    it('should handle empty conflictingValues array', () => {
      const filters = [
        { keyword: STATUS, value: RESOLVED },
        { keyword: STATUS, value: UNRESOLVED },
        { keyword: IS_ANONYMOUS, value: true },
        { keyword: IS_ANONYMOUS, value: false },
      ];

      const keyword = STATUS;
      const conflictingValues: (boolean | string)[] = [];

      const result = filterOutConflictingFilterKeywords(filters, keyword, conflictingValues);

      expect(result).toEqual([
        { keyword: STATUS, value: RESOLVED },
        { keyword: STATUS, value: UNRESOLVED },
        { keyword: IS_ANONYMOUS, value: true },
        { keyword: IS_ANONYMOUS, value: false },
      ]);
    });
  });
});
