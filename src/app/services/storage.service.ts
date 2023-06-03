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

  public async addBookmark(storyId: number) {
    const bookmarks = await this.get('bookmarks');

    if (bookmarks) {
      bookmarks.push(storyId);
      await this.set('bookmarks', bookmarks);
    } else {
      await this.set('bookmarks', [storyId]);
    }
  }

  public async removeBookmark(storyId: number) {
    const bookmarks = await this.get('bookmarks');

    if (bookmarks) {
      const updatedBookmarks = bookmarks.filter((id: number) => id !== storyId);
      await this.set('bookmarks', updatedBookmarks);
    }
  }

  public async getBookmarks() {
    return await this.get('bookmarks');
  }
}
