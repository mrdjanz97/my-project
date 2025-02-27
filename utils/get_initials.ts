import { getInitialLetter } from '../helper';

export const getInitialsToShowPlaceholderAvatar = (firstName, lastName) => {
  const firstInitial = getInitialLetter(firstName);
  const lastInitial = getInitialLetter(lastName);
  return `${firstInitial}${lastInitial}`;
};
