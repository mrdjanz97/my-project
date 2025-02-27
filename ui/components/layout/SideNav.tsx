import { FC } from 'react';
import { NavEntry } from '@src/lib/core/nav/nav-entry';
import { useNav } from '@src/lib/core/nav/nav.store';
import { classNames } from '@src/lib/utils/classname';
import { useUsersStore } from '@src/lib/core/auth/auth.store';
import { UserRoles } from '../common/const/consts';

export interface SideNavProps {}

export const SideNav: FC<SideNavProps> = () => {
  const { navigate, isCurrent, entries } = useNav(s => s);
  const { role } = useUsersStore(s => s.profile.company_roles[0].role);

  const handleChange = (item: NavEntry) => {
    navigate(item.key);
  };

  const isHr = role === UserRoles.HR;

  if (!isHr) return null;

  return (
    <div className="bg-neutral-900 bg-opacity-20 rounded-l-2xl shadow-xl fixed z-50 top-24 right-0 flex flex-col">
      {(entries || [])?.map((item: NavEntry) => {
        const Icon = item.icon;
        const selected = isCurrent(item.key);
        return (
          <div
            key={item.key}
            className="py-3"
            onClick={() => {
              handleChange(item);
            }}>
            <div>
              <a
                className={classNames(
                  'block px-2 py-2 cursor-pointer rounded-xl hover:bg-primary',
                  selected ? 'bg-neutral-500' : '',
                )}>
                <Icon strokeWidth={1} className="w-8 h-8 text-white" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
