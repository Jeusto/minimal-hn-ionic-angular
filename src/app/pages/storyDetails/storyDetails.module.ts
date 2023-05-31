import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoryPage } from './storyDetails.page';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { StoryItemComponentModule } from 'src/app/components/storyItem/storyItem.module';
import { SpinnerComponentModule } from 'src/app/components/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule,
    StoryItemComponentModule,
    SpinnerComponentModule,
  ],
  declarations: [StoryPage],
})
export class StoryPageModule {}
