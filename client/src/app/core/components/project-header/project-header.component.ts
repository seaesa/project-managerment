import { Component } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

const MdbModule = [MdbRippleModule]
@Component({
  selector: 'project-header',
  standalone: true,
  imports: [MdbModule],
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.scss'
})
export class ProjectHeaderComponent {

}
