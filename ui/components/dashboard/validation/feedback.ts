import * as Yup from 'yup';

export const validateFeedbackInputText = Yup.object({
  content: Yup.string().required(),
});
