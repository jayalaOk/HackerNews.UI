import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoryState, privateStoryReducer } from './story.reducer';

const selectState = createFeatureSelector<StoryState>(
  privateStoryReducer.featureKey
);
const selectLoading = createSelector(selectState, (state) => state.loading);
const selectLoaded = createSelector(selectState, (state) => state.loaded);
const selectError = createSelector(selectState, (state) => state.error);
const selectStories = createSelector(selectState, (state) => state.data);
const selectStory = createSelector(selectState, (state) =>
  state.data?.find(() => true)
);


export const privateStorySelectors = {
  selectState,
  selectLoading,
  selectLoaded,
  selectStories,
  selectStory,
  selectError,
};

export const publicStorySelectors = {
  selectLoading,
  selectLoaded,
  selectStories,
  selectStory,
  selectError,
};
