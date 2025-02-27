import SingleResource from './SingleResource';
import { useTranslation } from 'react-i18next';
import AddCompanyResourceModal from './AddCompanyResourceModal';
import { useGetResources } from '@root/src/lib/core/company_resources/queries/useGetResources';
import { ADD_NEW_RESOURCE, COMPANY_RESOURCES } from './const';
import { ADD_COMPANY_RESOURCE_MODAL_ID } from './const/manage_profile_modals';
import { useUsersStore } from '@root/src/lib/core/auth/auth.store';
import { UserRoles } from '../common/const/consts';

const CompanyResources = () => {
  const { t } = useTranslation();
  const { role } = useUsersStore(s => s.profile.company_roles[0].role);

  const showModalHandler = (modalId: string) => {
    if (document) (document.getElementById(modalId) as HTMLFormElement).showModal();
  };

  const { data: companyResources, isLoading } = useGetResources();

  const renderResources = () => {
    return companyResources?.map(resource => <SingleResource key={resource.id} resource={resource} />);
  };

  const showSpinner = () => {
    return (
      <div className="self-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  };

  return (
    <>
      <div className="bg-primary rounded-xl flex flex-col w-full px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">{t(COMPANY_RESOURCES)}</h2>
        </div>
        <div className="flex flex-col gap-2">
          {isLoading && showSpinner()}
          {renderResources()}
        </div>
        {role === UserRoles.HR && (
          <button
            className="btn btn-accent text-white text-lg font-semibold rounded-xl w-auto mt-5 ml-auto"
            onClick={() => showModalHandler(ADD_COMPANY_RESOURCE_MODAL_ID)}>
            {t(ADD_NEW_RESOURCE)}
          </button>
        )}
      </div>
      <AddCompanyResourceModal />
    </>
  );
};

export default CompanyResources;
