import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getInitialsToShowPlaceholderAvatar } from './get_initials';
import { getInitialLetter } from '../helper';

vi.mock('../helper', () => ({
  getInitialLetter: vi.fn(),
}));

describe('Util file: get_initials.ts', () => {
  describe('Method: getInitialsToShowPlaceholderAvatar', () => {
    let firstName: string | undefined;
    let lastName: string | undefined;

    beforeEach(() => {
      firstName = 'John';
      lastName = 'Doe';
      (getInitialLetter as unknown as ReturnType<typeof vi.fn>).mockImplementation(
        (name: string) => name?.charAt(0).toUpperCase() || '',
      );
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should return initials from first name and last name', () => {
      const result = getInitialsToShowPlaceholderAvatar(firstName, lastName);
      expect(result).toBe('JD');
    });

    it('should handle empty first name or last name', () => {
      firstName = '';
      lastName = 'Doe';
      const result = getInitialsToShowPlaceholderAvatar(firstName, lastName);
      expect(result).toBe('D');

      firstName = 'John';
      lastName = '';
      const result2 = getInitialsToShowPlaceholderAvatar(firstName, lastName);
      expect(result2).toBe('J');
    });

    it('should handle undefined first name or last name', () => {
      const result = getInitialsToShowPlaceholderAvatar(undefined, 'Doe');
      expect(result).toBe('D');

      const result2 = getInitialsToShowPlaceholderAvatar('John', undefined);
      expect(result2).toBe('J');
    });
  });
});
