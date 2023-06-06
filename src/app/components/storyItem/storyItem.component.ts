import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Story } from 'src/app/models/stories.model';
import { BrowserService } from 'src/app/services/browser.service';
import { ShareService } from 'src/app/services/share.service';
import { getTimeAgo } from 'src/app/utils';

@Component({
  selector: 'story',
  templateUrl: './storyItem.component.html',
  styleUrls: ['./storyItem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryItemComponent {
  @Input() story?: Story;

  domainName: string | null = null;
  timeAgo: string | null = null;
  faviconUrl: string | null = null;

  constructor(
    private shareService: ShareService,
    private browserService: BrowserService
  ) {}

  ngOnInit() {
    if (!this.story) return;

    if (this.story.url) {
      this.faviconUrl = `https://www.google.com/s2/favicons?domain=${this.story.url}`;
      this.domainName = this.story.url
        .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
        .split('/')[0];
    }

    this.timeAgo = getTimeAgo(this.story.created_at);
  }

  openWebsite() {
    if (this.story?.url) this.browserService.openWebsite(this.story.url);
  }

  async share() {
    if (this.story) {
      await this.shareService.share(this.story.title, this.story.url);
    }
  }
}
