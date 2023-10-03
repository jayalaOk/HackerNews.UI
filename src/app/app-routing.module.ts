import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'story',
    loadChildren: () =>
      import('./features/story/story.module').then((m) => m.StoryModule), // Lazy load the StoryModule
  },
  {
    path: '',
    redirectTo: '/story',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
