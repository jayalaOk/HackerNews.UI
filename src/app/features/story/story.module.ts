import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryRoutingModule } from './story-routing.module';
import { StoriesComponent } from './components/stories/stories.component';
import { StoryComponent } from './story.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { StoryService } from 'src/app/stores/story/story.service';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { StoryStoreModule } from 'src/app/stores/story';
import { LoadingStoreModule } from 'src/app/stores/story/loading';

@NgModule({
  declarations: [StoriesComponent, StoryComponent],
  imports: [
    CommonModule,
    StoryRoutingModule,
    GridModule,
    InputsModule,
    FormsModule,
    ReactiveFormsModule,
    LabelModule,
    ButtonsModule,
    DropDownsModule,
    StoryStoreModule,
    LoadingStoreModule,
  ],
  providers: [StoryService],
})
export class StoryModule {}
