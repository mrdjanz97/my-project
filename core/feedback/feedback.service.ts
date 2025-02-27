// eslint-disable-next-line import/named
import {
  callGetFeedbackWithReactionFunctionRepository,
  deleteFeedbackReactionRepository,
  insertFeedbackReactionRepository,
  insertFeedbackRepository,
  getFeedbackCountsByStatusRepository,
  insertFeedbackCommentRepository,
  updateFeedbackRepository,
} from './repositories';
import { getLatestSingleFeedbackRepository } from './repositories/get_last_feedback_to_ceo.repository';

export const getFeedbacks = async ({ sortBy, currentUserId, filters, pageParam, isHr }) => {
  try {
    const { data, count, error } = await callGetFeedbackWithReactionFunctionRepository({
      sortBy,
      currentUserId,
      filters,
      pageParam,
      isHr,
    });
    if (error) {
      throw error;
    }

    return { data, count };
  } catch (error) {
    console.log(error);
  }
};

export const insertFeedback = async ({ content, isAnonymous, ownerId, visibility }) => {
  try {
    const { data, error } = await insertFeedbackRepository({
      content,
      isAnonymous,
      ownerId,
      visibility,
    });
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const insertFeedbackReaction = async ({ reaction, userId, feedbackId }) => {
  try {
    const { data, error } = await insertFeedbackReactionRepository({
      reaction,
      userId,
      feedbackId,
    });
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFeedbackReation = async ({ reactionId }) => {
  try {
    const { data, error } = await deleteFeedbackReactionRepository({
      reactionId,
    });
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFeedbacksStatusCount = async () => {
  try {
    const { data, error } = await getFeedbackCountsByStatusRepository();
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateFeedback = async payload => {
  try {
    const { data, error } = await updateFeedbackRepository(payload);
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const insertFeedbackComment = async payload => {
  try {
    const { data, error } = await insertFeedbackCommentRepository(payload);
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLatestFeedbackToCeo = async ({ currentUserId }) => {
  try {
    const { data, error } = await getLatestSingleFeedbackRepository({ currentUserId });
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.log(error);
  }
};
