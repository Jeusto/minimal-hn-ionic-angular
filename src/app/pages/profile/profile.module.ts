import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { StorageService } from 'src/app/services/storage.service';
import { StoryItemComponentModule } from 'src/app/components/storyItem/storyItem.module';
import { SpinnerComponentModule } from 'src/app/components/spinner.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProfilePageRoutingModule,
    StoryItemComponentModule,
    SpinnerComponentModule,
  ],
  declarations: [ProfilePage],
  providers: [StorageService],
})
export class ProfilePageModule {}
