import { Component, Input } from '@angular/core';
import { ApiStoryDetails } from 'src/app/models/api.model';

@Component({
  selector: 'nested-comments',
  styleUrls: ['./comment.component.scss'],
  templateUrl: './comment.component.html',
})
export class CommentComponent {
  @Input() comments: ApiStoryDetails[] = [];
}
