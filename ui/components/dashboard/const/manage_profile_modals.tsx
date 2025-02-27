import { ChangeAvatarIcon, NoteIcon } from '@root/src/assets/icons';

const TOST_PREFIX = 'toast.';
export const CHANGE_AVATAR_MODAL_ID = 'change_avatar';
export const CHANGE_PASSWORD_MODAL_ID = 'change_password';
export const REJECT_FEEDBACK_MODAL_ID = 'reject_feedback';

export const CHANGE_AVATAR_LABEL = 'change_avatar';
export const CHANGE_PASSWORD_LABEL = 'change_password';
export const ADD_COMPANY_RESOURCE_MODAL_ID = 'add_resource';
export const REMOVE_COMPANY_RESOURCE_MODAL_ID = 'remove_resource';

export const RESOURCE_SUCCESS_ADD = TOST_PREFIX + 'resource_added_success';
export const RESOURCE_ERROR_ADD = TOST_PREFIX + 'resource_added_error';

export const RESOURCE_SUCCESS_REMOVE = TOST_PREFIX + 'resource_removed_success';
export const RESOURCE_ERROR_REMOVE = TOST_PREFIX + 'resource_removed_error';

export const RESOURCE_SUCCESS_EDIT = TOST_PREFIX + 'resource_edit_success';
export const RESOURCE_ERROR_EDIT = TOST_PREFIX + 'resource_edit_error';

export const manageProfileModals = [
  {
    id: CHANGE_AVATAR_MODAL_ID,
    label: CHANGE_AVATAR_LABEL,
    icon: () => <ChangeAvatarIcon />,
  },
  {
    id: CHANGE_PASSWORD_MODAL_ID,
    label: CHANGE_PASSWORD_LABEL,
    icon: () => <NoteIcon />,
  },
];

export const AVATAR_MODAL_TITLE = 'avatar_title';
