import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/stores/stories/stories.models';
import { selectSearchPageResults } from 'src/app/stores/stories/stories.selectors';
import { searchStories } from 'src/app/stores/stories/stories.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
})
export class SearchPage {
  searchResults: Partial<AppState['searchResults']> = {};
  searchResults$: Observable<Partial<AppState['searchResults']>> =
    new Observable();

  constructor(
    private store: Store<AppState>,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.searchResults$ = this.store.select(selectSearchPageResults);

    this.searchResults$.subscribe((results) => {
      this.searchResults = results;
    });
  }

  handleInput(event: any) {
    let query = event.target.value;

    if (query) {
      this.store.dispatch(searchStories({ query }));
    }
  }
}
