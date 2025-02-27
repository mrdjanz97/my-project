import { describe, it, expect } from 'vitest';
import { getNextPage } from './get-next-page-param.helper';
import { PAGE_COUNT } from '../core/feedback/queries/const/consts';

describe('Helper file: get-next-page-param.helper.ts', () => {
  describe('Method: getNextPage', () => {
    const dummyDataCreator = (length: number) => {
      return Array.from({ length }, (_, i) => ({
        id: (i + 1).toString(),
        content: 'example content',
        created_at: '2024-08-14',
        is_anonymous: true,
        visibility: 'general',
      }));
    };

    it('should return undefined if there are no more pages to fetch', () => {
      const mockAllPages = [
        {
          count: 15,
          data: dummyDataCreator(PAGE_COUNT),
        },
      ];

      const mockLastPage = [
        {
          count: 15,
          data: [],
        },
      ];

      const lastPage = mockLastPage;
      const allPages = mockAllPages;

      const nextPage = getNextPage(lastPage, allPages);

      expect(nextPage).toBeUndefined();
    });

    it('should return the next page number if the last page is incomplete but there are more pages', () => {
      const mockAllPages = [
        {
          count: 25,
          data: dummyDataCreator(PAGE_COUNT),
        },
        {
          count: 25,
          data: dummyDataCreator(5),
        },
      ];

      const lastPage = mockAllPages[1];
      const allPages = mockAllPages;

      const nextPage = getNextPage(lastPage, allPages);

      expect(nextPage).toBe(3);
    });

    it('should return undefined if the last page has enough items and no more pages are needed', () => {
      const mockAllPages = [
        {
          count: 20,
          data: dummyDataCreator(PAGE_COUNT),
        },
        {
          count: 20,
          data: dummyDataCreator(PAGE_COUNT),
        },
      ];

      const lastPage = mockAllPages[1];
      const allPages = mockAllPages;

      const nextPage = getNextPage(lastPage, allPages);

      expect(nextPage).toBeUndefined();
    });

    it('should return the next page number when the current page has less than PAGE_COUNT items', () => {
      const mockAllPages = [
        {
          count: 30,
          data: dummyDataCreator(PAGE_COUNT),
        },
        {
          count: 30,
          data: dummyDataCreator(5),
        },
      ];

      const lastPage = mockAllPages[1];
      const allPages = mockAllPages;

      const nextPage = getNextPage(lastPage, allPages);

      expect(nextPage).toBe(3);
    });

    it('should return undefined if there is no lastPage passed', () => {
      const allPages = [];

      const nextPage = getNextPage(undefined, allPages);

      expect(nextPage).toBeUndefined();
    });
  });
});
