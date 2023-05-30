import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoryPage } from './story.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  declarations: [StoryPage],
})
export class StoryPageModule {}
