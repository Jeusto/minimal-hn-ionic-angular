import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Injectable({
  providedIn: 'root',
})
export class BrowserService {
  constructor() {}

  openWebsite(url: string) {
    if (url) Browser.open({ url });
  }
}
