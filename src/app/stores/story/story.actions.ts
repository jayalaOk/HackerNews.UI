import { createAction, props } from '@ngrx/store';
import { Story } from './story.interface';

const storeName = 'Story';

const load = createAction(`[${storeName}] Loading data`);

const loading = createAction(`[${storeName}] Already loading data`);

const reset = createAction(`[${storeName}] Resetting into initial state`);

const request = createAction(
  `[${storeName}] Requesting data from the server`,
  props<{ skip?: number; pageSize?: number; reset: boolean }>()
);

const error = createAction(
  `[${storeName}] Error occurring while loading data`,
  props<{
    error: string;
    reset: boolean;
  }>()
);
const loaded = createAction(
  `[${storeName}] Loaded data from server`,
  props<{ data: Story[] }>()
);
const check = createAction(`[${storeName}] Checking cache for data`);
const retrieve = createAction(`[${storeName}] Retrieving data from cache`);

export const privateStoryActions = {
  storeName,
  load,
  reset,
  request,
  loading,
  error,
  loaded,
  check,
  retrieve,
};

export const publicStoryActions = {
  load,
  reset,
  request,
  loading,
  loaded,
  error,
};
