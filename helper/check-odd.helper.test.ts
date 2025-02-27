import { describe, it, expect } from 'vitest';
import { checkIsOdd } from './check-odd.helper';

describe('Helper file: check-odd.helper.ts', () => {
  describe('Method: checkIsOdd', () => {
    it('should return false for even numbers', () => {
      const numberZero = checkIsOdd(0);
      expect(numberZero).toBe(false);
      expect(numberZero).not.toBe(true);

      const numberTwo = checkIsOdd(2);
      expect(numberTwo).toBe(false);
      expect(numberTwo).not.toBe(true);

      const numberFour = checkIsOdd(4);
      expect(numberFour).toBe(false);
      expect(numberFour).not.toBe(true);
    });

    it('should return true for odd numbers', () => {
      const numberOne = checkIsOdd(1);
      expect(numberOne).toBe(true);
      expect(numberOne).not.toBe(false);

      const numberThree = checkIsOdd(3);
      expect(numberThree).toBe(true);
      expect(numberThree).not.toBe(false);
    });

    it('should handle negative numbers correctly', () => {
      const negativeNumberOne = checkIsOdd(-1);
      expect(negativeNumberOne).toBe(true);

      const negativeNumberTwo = checkIsOdd(-2);
      expect(negativeNumberTwo).toBe(false);
    });
  });
});
