import { createReducer, on } from '@ngrx/store';
import { privateLoadingActions } from './loading.actions';

const featureKey = 'Loading';

export interface LoadingState {
  loading: boolean;
  loaded: boolean;
}

const initialState: LoadingState = {
  loading: false,
  loaded: false,
};

const reducer = createReducer(
  initialState,
  on(
    privateLoadingActions.loaded,
    (state): LoadingState => ({
      ...state,
      loading: false,
      loaded: true,
    })
  ),

  on(
    privateLoadingActions.loading,
    (state): LoadingState => ({
      ...state,
      loading: true,
      loaded: false,
    })
  )
);

export const privateLoadingReducer = {
  featureKey,
  initialState,
  reducer,
};
