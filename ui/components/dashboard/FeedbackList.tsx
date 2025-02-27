import { useState } from 'react';
import { useUsersStore } from '@root/src/lib/core/auth/auth.store';
import { useGetFeedbacks } from '@root/src/lib/core/feedback/queries/useGetFeedbacks';
import SingleFeedback from './SingleFeedback';
import { FeedbackListIcon, FilterIcon } from '@root/src/assets/icons';
import { GetFilterKeywords, GetSortKeywords } from '@root/src/lib/core/feedback/feedback';
import { getSortParams, sortOptions, filterMapping, filterOptions, applyFeedbackFilters } from '@root/src/lib/utils';
import { checkIsOdd } from '../../../helper';
import { useTranslation } from 'react-i18next';
import { FEEDBACK_LIST, LOAD_MORE, NO_FEEDBACK_FOUND, SORT_BY } from './const';
import { UserRoles } from '../common/const/consts';

export const FeedbackList = () => {
  const { t } = useTranslation();
  const { id: currentUserId } = useUsersStore(s => s.user.user);
  const { role } = useUsersStore(s => s.profile.company_roles[0].role);
  const [sortBy, setSortBy] = useState(getSortParams(GetSortKeywords.NEWEST));
  const [filters, setFilters] = useState<{ keyword: string; value: boolean | string }[]>([]);
  const {
    data: feedbacks,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFeedbacks({ sortBy, currentUserId, filters, isHr: role === UserRoles.HR });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as GetSortKeywords;
    setSortBy(getSortParams(value));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as GetFilterKeywords;
    const checked = e.target.checked;
    const filterParams = filterMapping[value];

    setFilters(prevFilters => applyFeedbackFilters(prevFilters, filterParams, checked, value));
  };

  const showSpinner = () => {
    return (
      <div className="self-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  };

  const listFeedbacks = () => {
    return feedbacks?.pages.map(page =>
      page.data.map((feedback, index) => (
        <SingleFeedback key={feedback.id} feedback={feedback} isOddIndex={checkIsOdd(index)} />
      )),
    );
  };
  const getFeedbackSortTranslation = sort => t(`feedbacks.sort.${sort}`);

  const renderSortOptions = () => {
    return sortOptions.map(option => (
      <option key={option.label} value={option.value}>
        {getFeedbackSortTranslation(option.label)}
      </option>
    ));
  };

  const isFilterChecked = (keyword: GetFilterKeywords) => {
    const filterParams = filterMapping[keyword];
    return filters.some(filter => filter.keyword === filterParams.keyword && filter.value === filterParams.value);
  };

  const emptyFeedbackList = () => (
    <div className="items-center self-center">
      <p>{t(NO_FEEDBACK_FOUND)}</p>
    </div>
  );

  const noFeedbacks = feedbacks?.pages.length === 0;

  const getFeedbackFilterTranslation = filter => t(`feedbacks.${filter}`);

  const loadMoreButton = () => (
    <button className="btn m-4 max-w-[200px] self-center" onClick={() => fetchNextPage()}>
      {t(LOAD_MORE)}
    </button>
  );

  const renderFilterOptions = () => {
    return filterOptions.map(option => (
      <div key={option.label} className="form-control">
        <label className="label cursor-pointer flex justify-between">
          <span className="label-text">{getFeedbackFilterTranslation(option.label)}</span>
          <input
            type="checkbox"
            className="toggle"
            value={option.value}
            checked={isFilterChecked(option.value as GetFilterKeywords)}
            onChange={handleFilterChange}
          />
        </label>
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-6 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <FeedbackListIcon />
          <p className="text-lg font-semibold">{t(FEEDBACK_LIST)}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1">
              <FilterIcon />
            </div>
            <div
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow flex flex-col">
              {renderFilterOptions()}
            </div>
          </div>
          <div>
            <p>{t(SORT_BY)}</p>
          </div>
          <select
            className="select bg-primary max-w-xs text-lg font-bold items-center h-[2rem]"
            onChange={e => handleSortChange(e)}>
            {renderSortOptions()}
          </select>
        </div>
      </div>
      {!isLoading && noFeedbacks && emptyFeedbackList()}
      {isLoading ? showSpinner() : listFeedbacks()}
      {hasNextPage && !isFetchingNextPage && loadMoreButton()}
      {isFetchingNextPage && showSpinner()}
    </div>
  );
};
