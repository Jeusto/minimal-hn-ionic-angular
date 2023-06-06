import { Component, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/models/appState.model';
import { ToastService } from 'src/app/services/toast.service';
import {
  loadMoreStories,
  loadStories,
  updateStoriesCategory,
} from 'src/app/stores/stories/stories.actions';
import { selectMainPageStories } from 'src/app/stores/stories/stories.selectors';

@Component({
  selector: 'app-stories',
  templateUrl: 'stories.page.html',
  styleUrls: ['stories.page.scss'],
})
export class StoriesPage {
  @ViewChild(IonContent) content!: IonContent;
  mainPageStories$: Observable<Partial<AppState['stories']>> = new Observable();
  mainPageStories: Partial<AppState['stories']> = {};
  canLoadMoreStories = false;

  showScrollTopButton = false;
  previousScrollPosition = 0;
  infiniteScrollEvent: InfiniteScrollCustomEvent | undefined;

  constructor(
    private store: Store<AppState>,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.store.dispatch(loadStories());
    this.mainPageStories$ = this.store.select(selectMainPageStories);

    this.mainPageStories$.subscribe((stories) => {
      this.mainPageStories = stories;
      this.infiniteScrollEvent?.target.complete();

      let currentPage = stories.currentPage ?? 0;
      let totalPages = stories.totalPages ?? 0;
      this.canLoadMoreStories = currentPage < totalPages;

      if (stories.error) {
        this.toastService.showToast(stories.error.statusText, 'danger');
      }
    });
  }

  handleInfiniteScroll(event: any) {
    if (this.canLoadMoreStories) {
      this.store.dispatch(loadMoreStories());
      this.infiniteScrollEvent = event;
    } else {
      event.target.complete();
    }
  }

  handleRefresh(event: any) {
    this.store.dispatch(loadStories());
    event.target.complete();
  }

  handleCategoryChange(event: any) {
    this.store.dispatch(
      updateStoriesCategory({ category: event.detail.value })
    );
    this.store.dispatch(loadStories());
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
