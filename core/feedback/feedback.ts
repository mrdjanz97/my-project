export interface Feedback {
  id?: string;
  is_anonymous?: boolean;
  created_at?: string;
  owner_id?: string;
  content?: string;
  status?: string;
  owner?: {
    id: string;
    last_name: string;
    first_name: string;
    updated_at: string;
    avatar?: string;
  };
  up_count?: number;
  down_count?: number;
  user_reacted?: string | null;
  user_reaction_id?: string | null;
  comments?: any;
}

export interface AddFeedbackProps {
  content: string;
  isAnonymous: boolean;
  ownerId: string;
  visibility: FeedbackVisibility;
}

export interface AddFeedbackReactionProps {
  feedbackId: string;
  reaction: string;
  userId: string;
}

export interface RemoveFeedbackReactionProps {
  reactionId: string;
}

export enum FeedbackVisibility {
  General = 'general',
  Administration = 'administration',
  CEO = 'ceo',
}

export enum ReactionType {
  UP = 'up',
  DOWN = 'down',
}

export enum GetSortKeywords {
  NEWEST = 'newest',
  OLDEST = 'oldest',
  MOST_DISLIKED = 'most_disliked',
  LEAST_DISLIKED = 'least_disliked',
  MOST_LIKED = 'most_liked',
  LEAST_LIKED = 'least_liked',
}

export enum GetFilterKeywords {
  ANONYMOUSLY = 'anonymously',
  PUBLIC = 'public',
  RESOLVED = 'resolved',
  UNRESOLVED = 'unresolved',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

export enum FeedbackStatuses {
  PENDING = 'pending',
  RESOLVED = 'resolved',
  UNRESOLVED = 'unresolved',
  REJECTED = 'rejected',
}

export interface Filter {
  keyword: string;
  value: boolean | string;
}

export interface SortBy {
  keyword: string;
  value: boolean;
}

export interface GetFeedbacksParams {
  currentUserId: string;
  filters: Filter[];
  sortBy: SortBy;
  isHr: boolean;
}
