import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StoriesPageRoutingModule } from './stories-routing.module';
import { StoriesPage } from './stories.page';
import { StoryItemComponentModule } from 'src/app/components/storyItem/storyItem.module';
import { SpinnerComponentModule } from 'src/app/components/spinner.module';
import { StoryPage } from 'src/app/pages/storyDetails/storyDetails.page';
import { CommentComponentModule } from 'src/app/components/comment/comment.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    StoriesPageRoutingModule,
    StoryItemComponentModule,
    SpinnerComponentModule,
    CommentComponentModule,
  ],
  declarations: [StoriesPage, StoryPage],
})
export class StoriesPageModule {}
