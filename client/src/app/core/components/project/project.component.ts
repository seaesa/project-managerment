import { Component } from '@angular/core';
import { ProjectHeaderComponent } from '../project-header/project-header.component';
import { ProjectContentComponent } from '../project-content/project-content.component';

const ComponentModule = [ProjectHeaderComponent, ProjectContentComponent]
@Component({
  selector: 'pm-project',
  standalone: true,
  imports: [ComponentModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

}
