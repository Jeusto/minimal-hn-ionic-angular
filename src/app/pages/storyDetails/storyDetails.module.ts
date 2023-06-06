import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryPage } from './storyDetails.page';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    StoreModule,
  ],
  declarations: [StoryPage],
})
export class StoryPageModule {}
