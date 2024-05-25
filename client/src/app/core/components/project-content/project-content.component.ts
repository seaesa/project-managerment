import { Component } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

const MdbModule = [MdbRippleModule]
@Component({
  selector: 'project-content',
  standalone: true,
  imports: [MdbModule],
  templateUrl: './project-content.component.html',
  styleUrl: './project-content.component.scss'
})
export class ProjectContentComponent {

}
