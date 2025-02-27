export const calculateIsAvailableFeedbackToCeo = (date: string): boolean => {
  if (!date) {
    return true;
  }
  const feedbackDate = new Date(date);
  const currentDate = new Date();
  const differenceInDays = (currentDate.getTime() - feedbackDate.getTime()) / (1000 * 3600 * 24);

  const restrictDays = Number(process.env.FEEDBACK_RESTRICT_DAYS_TO_CEO) || 7;

  return differenceInDays >= restrictDays;
};
