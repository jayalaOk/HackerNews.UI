import { createAction } from '@ngrx/store';

const storeName = 'Loading';

const loading = createAction(`[${storeName}] Show loading indicator`);

const loaded = createAction(`[${storeName}] Hide loading indicator`);

export const privateLoadingActions = {
  storeName,
  loading,
  loaded,
};

export const publicLoadingActions = {
  loading,
  loaded,
};
