import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appState.model';
import { selectSearchPageResults } from 'src/app/stores/stories/stories.selectors';
import { searchStories } from 'src/app/stores/stories/stories.actions';
import { Observable } from 'rxjs';
import { BrowserService } from 'src/app/services/browser.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  resultsAvailable = true;
  searchResults: Partial<AppState['searchResults']> = {};
  searchResults$: Observable<Partial<AppState['searchResults']>> =
    new Observable();

  constructor(
    private store: Store<AppState>,
    private browserService: BrowserService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.searchResults$ = this.store.select(selectSearchPageResults);

    this.searchResults$.subscribe((results) => {
      this.searchResults = results;
      this.resultsAvailable = !!(results.list && results.list.length > 0);

      if (results.error) {
        this.toastService.showToast(results.error.statusText, 'danger');
      }
    });
  }

  handleInput(event: any) {
    let query = event.target.value;

    if (query) {
      this.store.dispatch(searchStories({ query }));
    } else {
      this.resultsAvailable = false;
    }
  }

  handleClear(event: any) {
    this.resultsAvailable = false;

    if (event.target.value) {
      event.target.value = '';
    }
  }

  openWebsite(url: string) {
    this.browserService.openWebsite(url);
  }
}
