import React from 'react';
import { useTranslation } from 'react-i18next';
import { ENGLISH, SERBIAN } from './const/consts';

const Internationalization = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="w-[80px]">
      <select
        onChange={e => changeLanguage(e.target.value)}
        value={i18n.language}
        className="rounded w-full cursor-pointer">
        <option value="en" className="p-1">
          {t(ENGLISH)}
        </option>
        <option value="sr" className="p-1">
          {t(SERBIAN)}
        </option>
      </select>
    </div>
  );
};

export default Internationalization;
