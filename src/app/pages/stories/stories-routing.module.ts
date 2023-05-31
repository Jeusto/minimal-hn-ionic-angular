import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoriesPage } from './stories.page';
import { StoryPage } from '../storyDetails/storyDetails.page';

const routes: Routes = [
  {
    path: '',
    component: StoriesPage,
  },
  {
    path: ':id',
    component: StoryPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoriesPageRoutingModule {}
