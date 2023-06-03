import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  loadStories,
  updateStoriesCategory,
} from 'src/app/stores/stories/stories.actions';
import { AppState } from 'src/app/stores/stories/stories.models';
import { selectMainPageStories } from 'src/app/stores/stories/stories.selectors';
import { BrowserService } from 'src/app/services/browser.service';
import { IonContent } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-stories',
  templateUrl: 'stories.page.html',
  styleUrls: ['stories.page.scss'],
})
export class StoriesPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  mainPageStories$: Observable<Partial<AppState['stories']>> = new Observable();
  mainPageStories: Partial<AppState['stories']> = {};

  storiesAvailable = false;
  canLoadMoreStories = false;

  showScrollTopButton = false;
  previousScrollPosition = 0;

  constructor(
    private store: Store<AppState>,
    private browserService: BrowserService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.store.dispatch(
      loadStories({ page: 0, category: this.mainPageStories.category ?? 'top' })
    );
    this.mainPageStories$ = this.store.select(selectMainPageStories);

    this.mainPageStories$.subscribe((stories) => {
      this.mainPageStories = stories;
      this.storiesAvailable = !!(stories.list && stories.list.length > 0);

      let currentPage = stories.currentPage ?? 0;
      let totalPages = stories.totalPages ?? 0;
      this.canLoadMoreStories = currentPage < totalPages;

      if (stories.error) {
        this.showErrorToast(stories.error.statusText);
      }
    });
  }

  openWebsite(url: string) {
    if (url) this.browserService.openWebsite(url);
  }

  handleInfiniteScroll(event: any) {
    let currentPage = this.mainPageStories.currentPage ?? 0;

    if (this.canLoadMoreStories) {
      this.store.dispatch(
        loadStories({
          page: currentPage + 1,
          category: this.mainPageStories.category ?? 'top',
        })
      );
    }

    event.target.complete();
  }

  handleRefresh(event: any) {
    this.store.dispatch(
      loadStories({ page: 0, category: this.mainPageStories.category ?? 'top' })
    );
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

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: 'Error: ' + message,
      duration: 3000,
      color: 'danger',
      cssClass: 'toast',
    });
    toast.present();
  }

  handleCategoryChange(event: any) {
    this.store.dispatch(
      updateStoriesCategory({ category: event.detail.value })
    );
    this.store.dispatch(loadStories({ page: 0, category: event.detail.value }));
  }
}
