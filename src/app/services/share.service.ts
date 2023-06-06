import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';
import { Story } from '../models/stories.model';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  constructor() {}

  async share(title: string, url: string) {
    await Share.share({
      title,
      url,
    });
  }

  async deviceSupportsSharing() {
    return (await Share.canShare()).value;
  }
}
