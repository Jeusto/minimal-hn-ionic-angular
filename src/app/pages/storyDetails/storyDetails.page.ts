import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppState, Story } from 'src/app/stores/stories/stories.models';
import { Observable } from 'rxjs';
import { loadStoryDetails } from 'src/app/stores/stories/stories.actions';
import { selectSelectedStory } from 'src/app/stores/stories/stories.selectors';

@Component({
  selector: 'app-view-message',
  templateUrl: './storyDetails.page.html',
  styleUrls: ['./storyDetails.page.scss'],
})
export class StoryPage {
  storyDetails$!: Observable<Partial<AppState['selectedStory']>>;
  storyId!: string;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.storyId = params.get('id') as string;
      this.store.dispatch(loadStoryDetails({ storyId: this.storyId }));
    });

    this.storyDetails$ = this.store.select(selectSelectedStory);
  }

  handleInfiniteScroll(event: any) {}
}
