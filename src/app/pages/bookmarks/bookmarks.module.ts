import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookmarksPage } from './bookmarks.page';
import { BookmarksPageRoutingModule } from './bookmarks-routing.module';
import { StorageService } from 'src/app/services/storage.service';
import { StoryItemComponentModule } from 'src/app/components/storyItem/storyItem.module';
import { SpinnerComponentModule } from 'src/app/components/spinner.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BookmarksPageRoutingModule,
    StoryItemComponentModule,
    SpinnerComponentModule,
  ],
  declarations: [BookmarksPage],
  providers: [StorageService],
})
export class BookmarksPageModule {}
