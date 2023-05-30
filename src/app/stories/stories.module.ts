import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoriesPage } from './stories.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { StoriesPageRoutingModule } from './stories-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    StoriesPageRoutingModule,
  ],
  declarations: [StoriesPage],
})
export class StoriesPageModule {}
