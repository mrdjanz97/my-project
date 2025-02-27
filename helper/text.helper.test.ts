import { getInitialLetter } from './text.helper';
import { describe, it, expect } from 'vitest';

describe('Helper file: text.helper.ts', () => {
  describe('Method: getInitialLetter', () => {
    it('getInitalLetter', () => {
      const char = getInitialLetter('Miiir');
      expect(char).toBe('M');
    });
  });
});
