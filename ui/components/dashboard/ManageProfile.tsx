import { LogoutIcon, MoreIcon } from '@root/src/assets/icons';
import { useUsersStore } from '@root/src/lib/core/auth/auth.store';
import ChangeAvatarModal from './ChangeAvatarModal';
import ChangePasswordModal from './ChangePasswordModal';
import { manageProfileModals } from './const/manage_profile_modals';
import { useTranslation } from 'react-i18next';

const ManageProfile = () => {
  const { t } = useTranslation();
  const logout = useUsersStore(s => s.logout);

  const logoutHandler = () => {
    logout();
  };

  const showModalHandler = (modalId: string) => {
    if (document) (document.getElementById(modalId) as HTMLFormElement).showModal();
  };

  const renderModalOpenTriggers = () => {
    return manageProfileModals.map(modal => (
      <button key={modal.id} className="btn flex items-center justify-start" onClick={() => showModalHandler(modal.id)}>
        {modal.icon()}
        <p> {t(modal.label)}</p>
      </button>
    ));
  };
  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">
          <MoreIcon />
        </div>
        <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow flex flex-col">
          {renderModalOpenTriggers()}
          <button className="btn flex items-center justify-start" onClick={logoutHandler}>
            <LogoutIcon />
            <p>{t('logout')}</p>
          </button>
        </div>
      </div>
      <ChangePasswordModal />
      <ChangeAvatarModal />
    </>
  );
};

export default ManageProfile;
