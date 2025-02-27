import { describe, it, expect } from 'vitest';
import { classNames } from './taliwind-classnames.helper';

describe('Helper file: tailwind-classnames-helper.ts', () => {
  describe('Method: classNames', () => {
    it('should join multiple class names into a single string', () => {
      const result = classNames('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
      expect(result).toBeTypeOf('string');
    });

    it('should filter out falsy values', () => {
      const result = classNames('class1', '', 'class3', undefined, 'class5', null, 'class7');
      expect(result).toBe('class1 class3 class5 class7');
    });

    it('should return an empty string if no valid class names are provided', () => {
      const result = classNames('', undefined, null);
      expect(result).toBe('');
    });

    it('should handle a single class name correctly', () => {
      const result = classNames('class1');
      expect(result).toBe('class1');
    });

    it('should handle no arguments correctly', () => {
      const result = classNames();
      expect(result).toBe('');
    });
  });
});
