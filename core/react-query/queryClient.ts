import { QueryClient } from '@tanstack/react-query';
import { MINUTE } from '../../ui/components/common/const/consts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * MINUTE,
    },
  },
});

export default queryClient;
