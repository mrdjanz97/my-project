import supabase from '@src/supabase_client';
import { GET_FEEDBACKS_WITH_REACTIONS } from '@root/src/database/table.names';
import { PAGE_COUNT } from '../queries/const/consts';
import { FeedbackStatuses } from '../feedback';

export async function callGetFeedbackWithReactionFunctionRepository({
  sortBy,
  filters,
  currentUserId,
  pageParam,
  isHr,
}) {
  const offset = (pageParam - 1) * PAGE_COUNT;

  let query = supabase
    .rpc(
      GET_FEEDBACKS_WITH_REACTIONS,
      {
        current_user_id: currentUserId,
      },
      { count: 'exact' },
    )
    .order(sortBy.keyword, { ascending: sortBy.value })
    .range(offset, offset + PAGE_COUNT - 1);

  if (!isHr) {
    query = query.neq('status', FeedbackStatuses.REJECTED).neq('status', FeedbackStatuses.PENDING);
  }

  if (filters && filters.length > 0) {
    filters.forEach(filter => {
      query = query.eq(filter.keyword, filter.value);
    });
  }

  const { data, count, error } = await query;

  return { data, count, error };
}
