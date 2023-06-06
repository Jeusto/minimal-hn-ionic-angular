import { AppState } from 'src/app/models/appState.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { Store } from '@ngrx/store';
import { loadBookmarks } from 'src/app/stores/stories/stories.actions';
import { selectBookmarks } from 'src/app/stores/stories/stories.selectors';

@Component({
  selector: 'app-bookmarks',
  templateUrl: 'bookmarks.page.html',
})
export class BookmarksPage {
  bookmarks$: Observable<Partial<AppState['stories']>> = new Observable();
  bookmarks: Partial<AppState['stories']> = {};

  constructor(
    private storageService: StorageService,
    private store: Store<AppState>
  ) {}

  async ngOnInit() {
    await this.storageService.init();
    this.store.dispatch(loadBookmarks());
    this.bookmarks$ = this.store.select(selectBookmarks);

    this.bookmarks$.subscribe((newData) => {
      this.bookmarks = newData;
    });
  }
}
