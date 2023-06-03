import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';
import { Story } from '../stores/stories/stories.models';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor() {}

  async share(story: Story) {
    await Share.share({
      title: story.title,
      text: story.url,
      url: story.url,
    });
  }

  async deviceSupportsSharing() {
    return (await Share.canShare()).value;
  }
}
