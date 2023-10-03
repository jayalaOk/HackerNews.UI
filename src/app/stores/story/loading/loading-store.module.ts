import { privateLoadingReducer } from './loading.reducer';
import { LoadingEffects } from './loading.effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      privateLoadingReducer.featureKey,
      privateLoadingReducer.reducer
    ),
    EffectsModule.forFeature([LoadingEffects]),
  ],
})
export class LoadingStoreModule {}
