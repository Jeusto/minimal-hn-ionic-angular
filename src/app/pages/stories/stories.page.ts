import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadStories } from 'src/app/stores/stories/stories.actions';
import { AppState } from 'src/app/stores/stories/stories.models';
import { selectMainPageStories } from 'src/app/stores/stories/stories.selectors';
import { BrowserService } from 'src/app/services/browser.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-stories',
  templateUrl: 'stories.page.html',
  styleUrls: ['stories.page.scss'],
})
export class StoriesPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  mainPageStories$: Observable<Partial<AppState['stories']>> = new Observable();
  currentPage: number = 0;
  totalPages: number = 0;
  canLoadMoreStories = true;
  showScrollTopButton = false;
  previousScrollPosition = 0;

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
    this.store.dispatch(loadStories({ page: 0 }));
    event.target.complete();
  }

  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    const isScrollingUp = scrollTop < this.previousScrollPosition;

    if (isScrollingUp && scrollTop > 100) {
      this.showScrollTopButton = true;
    } else {
      this.showScrollTopButton = false;
    }

    this.previousScrollPosition = scrollTop;
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
