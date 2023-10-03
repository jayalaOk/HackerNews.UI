import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { privateStoryReducer } from './story.reducer';
import { StoryService } from './story.service';
import { EffectsModule } from '@ngrx/effects';
import { StoryEffects } from './story.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(
      privateStoryReducer.featureKey,
      privateStoryReducer.reducer
    ),
    EffectsModule.forFeature([StoryEffects]),
  ],
  providers: [StoryService],
})
export class StoryStoreModule {}
