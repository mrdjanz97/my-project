import React, { useState } from 'react';
import { SearchIcon } from '@root/src/assets/icons';
import { GOOGLE_SEARCH_URL } from './const/consts';
import { useTranslation } from 'react-i18next';
export const SearchBar = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  const searchPlaceholder = t('search');

  const onChangeHandler = e => {
    setSearchValue(e.target.value);
  };

  const onKeyDownHandler = e => {
    if (e.key === 'Enter') {
      const query = encodeURIComponent(searchValue);
      window.location.href = `${GOOGLE_SEARCH_URL}${query}`;
    }
  };

  return (
    <label className="input input-bordered flex items-center gap-2 text-black bg-primary rounded-full py-0 !border-none !outline-none !shadow-none">
      <SearchIcon />
      <input
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        type="text"
        className="grow text-black bg-primary lg:w-[300px]"
        placeholder={searchPlaceholder}
      />
    </label>
  );
};
