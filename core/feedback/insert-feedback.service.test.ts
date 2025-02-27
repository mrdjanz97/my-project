import { describe, it, expect, vi } from 'vitest';

import { insertFeedback } from './feedback.service';
import { insertFeedbackRepository } from './repositories';

vi.mock('./repositories/insert-feedback.repository', () => ({
  insertFeedbackRepository: vi.fn(),
}));

describe('Service file: feedback.service.ts', () => {
  describe('Method: insertFeedback', () => {
    it('should successfully insert feedback and return data', async () => {
      const feedbackData = { id: 1, content: 'Feedback content' };
      const mockResponse = { data: feedbackData, error: null };

      (insertFeedbackRepository as any).mockResolvedValueOnce(mockResponse);

      const result = await insertFeedback({
        content: 'Feedback content',
        isAnonymous: true,
        ownerId: 'owner-id',
        visibility: 'public',
      });

      expect(result).toEqual(feedbackData);
      expect(insertFeedbackRepository).toHaveBeenCalledWith({
        content: 'Feedback content',
        isAnonymous: true,
        ownerId: 'owner-id',
        visibility: 'public',
      });
    });

    it('should handle an error when inserting feedback', async () => {
      const mockError = new Error('Insert feedback failed');
      const mockResponse = { data: null, error: mockError };

      (insertFeedbackRepository as any).mockResolvedValueOnce(mockResponse);

      const result = await insertFeedback({
        content: 'Feedback content',
        isAnonymous: true,
        ownerId: 'owner-id',
        visibility: 'public',
      });

      expect(result).toBeUndefined();
      expect(insertFeedbackRepository).toHaveBeenCalledWith({
        content: 'Feedback content',
        isAnonymous: true,
        ownerId: 'owner-id',
        visibility: 'public',
      });
    });
  });
});
