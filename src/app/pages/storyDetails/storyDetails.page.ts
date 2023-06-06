import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppState } from 'src/app/models/appState.model';
import { Observable } from 'rxjs';
import {
  loadStoryDetails,
  toggleBookmark,
} from 'src/app/stores/stories/stories.actions';
import { selectSelectedStory } from 'src/app/stores/stories/stories.selectors';
import { BrowserService } from 'src/app/services/browser.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './storyDetails.page.html',
  styleUrls: ['./storyDetails.page.scss'],
})
export class StoryPage {
  storyDetails$!: Observable<Partial<AppState['selectedStory']>>;
  timeAgo: string | null = null;
  storyDetails: Partial<AppState['selectedStory']> = {};
  storyId!: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private browserService: BrowserService,
    private shareService: ShareService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.storyId = params.get('id') as string;
      this.store.dispatch(loadStoryDetails({ storyId: this.storyId }));
    });

    this.storyDetails$ = this.store.select(selectSelectedStory);

    this.storyDetails$.subscribe((storyDetails) => {
      this.storyDetails = storyDetails;
    });
  }

  test = 'test';

  openWebsite() {
    let url = this.storyDetails.story?.url;
    if (url) this.browserService.openWebsite(url);
  }

  async share() {
    if (this.storyDetails && this.storyDetails.story) {
      await this.shareService.share(
        this.storyDetails.story.title,
        this.storyDetails.story.url
      );
    }
  }

  async save() {
    const storyId = this.storyDetails.story?.id.toString();
    if (storyId) this.store.dispatch(toggleBookmark({ storyId }));
  }
}
