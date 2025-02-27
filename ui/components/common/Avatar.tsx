import React, { FC } from 'react';
import { getInitialsToShowPlaceholderAvatar } from '@root/src/lib/utils/get_initials';
import { AvatarProps } from './common';
import { SUPABASE_URL } from './const/consts';

export const Avatar: FC<AvatarProps> = ({ size = '12', firstName, lastName, avatarUrl }) => {
  const fullImageUrl = `${SUPABASE_URL}/storage/v1/object/public/dev/${avatarUrl}?width=200&height=200`;

  const sizeInPixels = `${+size * 3}px`;

  const hasAvatar = () => (
    <div
      className="rounded-full static flex items-center justify-center"
      style={{ width: sizeInPixels, height: sizeInPixels }}>
      <img
        src={fullImageUrl}
        alt="User Avatar"
        className="object-cover rounded-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );

  const placeholderAvatar = () => (
    <div className="avatar static">
      <div className={`bg-primary text-neutral-content rounded-full flex items-center justify-center`}>
        <span className="text-2xl">{getInitialsToShowPlaceholderAvatar(firstName, lastName)}</span>
      </div>
    </div>
  );

  return <div className="avatar static">{avatarUrl ? hasAvatar() : placeholderAvatar()}</div>;
};
