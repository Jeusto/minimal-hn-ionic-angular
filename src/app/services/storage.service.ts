import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public async get(key: string) {
    return await this._storage?.get(key);
  }

  public async toggleBookmark(storyId: string) {
    const bookmarks: string[] = await this.getBookmarks();

    if (!bookmarks) return [];

    if (bookmarks.includes(storyId)) {
      const index = bookmarks.indexOf(storyId);
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(storyId);
    }

    await this.set('bookmarks', bookmarks);
    return bookmarks;
  }

  public async getBookmarks() {
    return (await this.get('bookmarks')) || [];
  }
}
