import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoadingState, privateLoadingReducer } from './loading.reducer';

const selectState = createFeatureSelector<LoadingState>(
  privateLoadingReducer.featureKey
);
const selectLoading = createSelector(selectState, (state) => state.loading);
const selectLoaded = createSelector(selectState, (state) => state.loaded);

export const privateLoadingSelectors = {
  selectState,
  selectLoading,
  selectLoaded,
};

export const publicLoadingSelectors = {
  selectLoading,
  selectLoaded,
};
