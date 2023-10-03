import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StoryService } from './story.service';
import { privateStoryActions } from './story.actions';
import { privateStorySelectors } from './story.selectors';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class StoryEffects {
  public constructor(
    private store: Store,
    private action: Actions,
    private StoryService: StoryService
  ) {}

  public readonly onLoad$ = createEffect(() => {
    return this.action.pipe(
      ofType(privateStoryActions.load),
      concatLatestFrom(() =>
        this.store.select(privateStorySelectors.selectLoading)
      ),
      map(([, isLoading]) =>
        isLoading ? privateStoryActions.loading() : privateStoryActions.check()
      )
    );
  });
  public readonly onCheck$ = createEffect(() => {
    return this.action.pipe(
      ofType(privateStoryActions.check),
      concatLatestFrom(() =>
        this.store.select(privateStorySelectors.selectLoaded)
      ),
      map(([, isLoaded]) =>
        isLoaded
          ? privateStoryActions.retrieve()
          : privateStoryActions.request({ reset: true })
      )
    );
  });

  public readonly onRequest$ = createEffect(() => {
    return this.action.pipe(
      ofType(privateStoryActions.request),
      mergeMap(() =>
        this.StoryService.getAllStories().pipe(
          map((data) => privateStoryActions.loaded({ data })),
          catchError((error) => {
            return of(
              privateStoryActions.error({
                error: error,
                reset: true,
              })
            );
          })
        )
      )
    );
  });
}
