import { ReactionType } from './feedback';

export interface FeedbackReaction {
  id?: string;
  feedback_id?: string;
  created_at?: string;
  owner_id?: string;
  reaction_type: ReactionType;
  comment: string;
}
