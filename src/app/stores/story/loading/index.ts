import { publicLoadingActions } from './loading.actions';
import { publicLoadingSelectors } from './loading.selectors';

export { LoadingStoreModule } from './loading-store.module';

export const fromLoading = {
  ...publicLoadingActions,
  ...publicLoadingSelectors,
};
