import { describe, it, expect } from 'vitest';
import { getLabelFromValue } from './value_to_label.helper';

describe('Helper file: value_to_label.helper.ts', () => {
  describe('Method: getLabelFromValue', () => {
    it('should convert keys to lowercase labels and return correct label-value pairs', () => {
      const input: [string, string][] = [
        ['FIRST_KEY', 'value1'],
        ['SECOND_KEY', 'value2'],
      ];

      const expectedOutput = [
        { label: 'first_key', value: 'value1' },
        { label: 'second_key', value: 'value2' },
      ];

      expect(getLabelFromValue(input)).toEqual(expectedOutput);
    });

    it('should handle an empty array correctly', () => {
      const input: [string, string][] = [];
      const expectedOutput = [];
      expect(getLabelFromValue(input)).toEqual(expectedOutput);
    });

    it('should handle keys with no underscores', () => {
      const input: [string, string][] = [['KEY', 'value']];
      const expectedOutput = [{ label: 'key', value: 'value' }];
      expect(getLabelFromValue(input)).toEqual(expectedOutput);
    });

    it('should handle multiple underscores in keys', () => {
      const input: [string, string][] = [['KEY_WITH_MULTIPLE_UNDERSCORES', 'value']];
      const expectedOutput = [{ label: 'key_with_multiple_underscores', value: 'value' }];
      expect(getLabelFromValue(input)).toEqual(expectedOutput);
    });
  });
});
