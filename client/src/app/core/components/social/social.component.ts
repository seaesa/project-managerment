import { Component, Input } from '@angular/core';
@Component({
  selector: 'pm-social',
  standalone: true,
  imports: [],
  templateUrl: './social.component.html',
  styleUrl: './social.component.scss',
})
export class SocialComponent {
  @Input() icon = ''
}
