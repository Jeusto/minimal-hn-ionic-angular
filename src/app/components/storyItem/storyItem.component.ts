import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { ShareService } from 'src/app/services/share.service';
import { Story } from 'src/app/stores/stories/stories.models';

@Component({
  selector: 'story',
  templateUrl: './storyItem.component.html',
  styleUrls: ['./storyItem.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryItemComponent {
  @Input() story?: Story;
  private platform = inject(Platform);

  domainName: string | null = null;
  timeAgo: string | null = null;
  faviconUrl: string = `https://www.google.com/s2/favicons?domain=noFavicon`;

  constructor(private shareService: ShareService) {}

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

  isIos() {
    return this.platform.is('ios');
  }
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} sec`;
  } else if (minutes < 60) {
    return `${minutes} min`;
  } else if (hours < 24) {
    return `${hours} hrs`;
  } else {
    return `${days} days`;
  }
}
