import { describe, it, expect } from 'vitest';
import { getSortParams } from './sort_map';
import { GetSortKeywords } from '../core/feedback/feedback';

describe('Util file: sort_map.ts', () => {
  describe('Method: getSortParams', () => {
    //tried to be a bit creative, not sure if its good practice
    const testCases = [
      { input: GetSortKeywords.NEWEST, expected: { keyword: 'created_at', value: false } },
      { input: GetSortKeywords.OLDEST, expected: { keyword: 'created_at', value: true } },
      { input: GetSortKeywords.MOST_LIKED, expected: { keyword: 'up_count', value: false } },
      { input: GetSortKeywords.LEAST_LIKED, expected: { keyword: 'up_count', value: true } },
      { input: GetSortKeywords.MOST_DISLIKED, expected: { keyword: 'down_count', value: false } },
      { input: GetSortKeywords.LEAST_DISLIKED, expected: { keyword: 'down_count', value: true } },
    ];

    testCases.forEach(({ input, expected }) => {
      it(`should return correct sort parameters for ${input}`, () => {
        const sortParams = getSortParams(input);
        expect(sortParams).toEqual(expected);
      });
    });

    it('should handle an invalid sort option', () => {
      const sortParams = getSortParams('INVALID_SORT_OPTION' as GetSortKeywords);
      expect(sortParams).toBeUndefined();
    });
  });
});
