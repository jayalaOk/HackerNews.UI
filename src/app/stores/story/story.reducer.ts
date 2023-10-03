import { createReducer, on } from '@ngrx/store';
import { Story } from './story.interface';
import { privateStoryActions } from './story.actions';

const featureKey = 'Story';

export interface StoryState {
  data: Story[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

const initialState: StoryState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
};

const reducer = createReducer(
  initialState,
  on(
    privateStoryActions.request,
    (state, action): StoryState => ({
      ...state,
      loading: true,
      loaded: false,
      data: action.reset ? [] : state.data,
      error: null,
    })
  ),

  on(
    privateStoryActions.loaded,
    (state, action): StoryState => ({
      ...state,
      loading: false,
      loaded: true,
      data: action.data,
      error: null,
    })
  ),

  on(
    privateStoryActions.retrieve,
    (state): StoryState => ({
      ...state,
      loading: false,
      loaded: true,
    })
  ),

  on(
    privateStoryActions.reset,
    (): StoryState => ({
      ...initialState,
    })
  ),

  on(
    privateStoryActions.error,
    (state, action): StoryState => ({
      ...state,
      loading: false,
      loaded: true,
      data: action.reset ? [] : state.data,
      error: action.error,
    })
  )
);

export const privateStoryReducer = {
  featureKey,
  initialState,
  reducer,
};
