import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadStories } from 'src/app/stores/stories/stories.actions';
import { AppState } from 'src/app/stores/stories/stories.models';
import { selectMainPageStories } from 'src/app/stores/stories/stories.selectors';
import { BrowserService } from 'src/app/services/browser.service';

@Component({
  selector: 'app-stories',
  templateUrl: 'stories.page.html',
})
export class StoriesPage implements OnInit {
  mainPageStories$: Observable<Partial<AppState['stories']>> = new Observable();
  currentPage: number = 0;
  totalPages: number = 0;
  canLoadMoreStories = true;

  constructor(
    private store: Store<AppState>,
    private browserService: BrowserService
  ) {}

  ngOnInit() {
    this.store.dispatch(loadStories({ page: 0 }));
    this.mainPageStories$ = this.store.select(selectMainPageStories);

    this.mainPageStories$.subscribe(({ currentPage, totalPages }) => {
      this.currentPage = currentPage || 0;
      this.totalPages = totalPages || 0;
      this.canLoadMoreStories = this.currentPage < this.totalPages;
    });
  }

  openWebsite(url: string) {
    if (url) this.browserService.openWebsite(url);
  }

  handleInfiniteScroll(event: any) {
    if (this.canLoadMoreStories) {
      this.store.dispatch(loadStories({ page: this.currentPage + 1 }));
    }

    event.target.complete();
  }

  handleRefresh(event: any) {
    event.target.complete();
  }
}
