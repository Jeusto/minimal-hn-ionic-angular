import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Story } from 'src/app/stores/stories/stories.model';

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryComponent {
  @Input() story?: Story;
  private platform = inject(Platform);
  domainName: string | null = null;
  timeAgo: string | null = null;

  constructor() {}

  ngOnInit() {
    if (this.story) {
      this.domainName = this.story.url
        .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
        .split('/')[0];
      this.timeAgo = getTimeAgo(this.story.created_at);
    }
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
