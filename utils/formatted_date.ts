import { DAYS_TRANSLATION_PREFIX } from '../ui/components/common/const/consts';

export const formatDateString = (dateString: string, t: any): string => {
  const date = new Date(dateString);

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[date.getUTCDay()];

  const day = date.getUTCDate();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getUTCMonth()];

  const year = date.getUTCFullYear();

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${t(DAYS_TRANSLATION_PREFIX + dayOfWeek)}, ${day} ${month} ${year} @ ${hours}:${formattedMinutes} ${ampm}`;
};
