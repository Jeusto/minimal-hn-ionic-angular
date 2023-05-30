import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoriesEffects } from 'src/app/stores/stories/stories.effects';
import { storyReducer } from 'src/app/stores/stories/stories.reducers';
import { StoriesPageRoutingModule } from './stories-routing.module';
import { StoriesPage } from './stories.page';
import { StoryComponentModule } from 'src/app/components/story/story.module';
import { SpinnerComponentModule } from 'src/app/components/spinner.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    StoriesPageRoutingModule,
    StoreModule.forFeature('stories', storyReducer),
    EffectsModule.forFeature([StoriesEffects]),
    StoreModule,
    StoryComponentModule,
    SpinnerComponentModule,
  ],
  declarations: [StoriesPage],
})
export class StoriesPageModule {}
