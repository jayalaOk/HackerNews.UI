import { Injectable } from '@angular/core';
import { privateLoadingActions } from './loading.actions';
import { map } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { publicStoryActions } from '../story.actions';

@Injectable()
export class LoadingEffects {
  public constructor(private action: Actions) {}

  public onLoaded$ = createEffect(() => {
    return this.action.pipe(
      ofType(publicStoryActions.loaded),
      map((action) => {
        return privateLoadingActions.loaded();
      })
    );
  });

  public onLoading$ = createEffect(() => {
    return this.action.pipe(
      ofType(publicStoryActions.loading, publicStoryActions.request),
      map(() => privateLoadingActions.loading())
    );
  });
}
