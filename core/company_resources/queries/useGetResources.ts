import { useQuery } from '@tanstack/react-query';
import { RESOURCES_QUERY_KEY } from './const/consts';
import { getResources } from '../company_resources.service';

export const useGetResources = () => {
  const getResourcesFunction = useQuery({
    queryKey: [RESOURCES_QUERY_KEY],
    queryFn: () => getResources(),
  });

  return getResourcesFunction;
};
