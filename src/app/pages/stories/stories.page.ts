import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadStories } from 'src/app/stores/stories/stories.actions';
import { Story } from 'src/app/stores/stories/stories.model';
import { selectStories } from 'src/app/stores/stories/stories.selectors';

@Component({
  selector: 'app-stories',
  templateUrl: 'stories.page.html',
  styleUrls: ['stories.page.scss'],
})
export class StoriesPage {
  // stories$ = this.store.select((state) => state.stories);
  stories$!: Observable<Story[] | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadStories());
    this.stories$ = this.store.select(selectStories);
  }
}
