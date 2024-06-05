import { Component } from '@angular/core';
import { ProjectHeaderComponent } from '../project-header/project-header.component';
import { ProjectContentComponent } from '../project-content/project-content.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { RouterOutlet } from '@angular/router';

const ComponentModule = [ProjectHeaderComponent, ProjectContentComponent, AddProjectComponent]
const AngularModule = [RouterOutlet]
@Component({
  selector: 'pm-project',
  standalone: true,
  imports: [ComponentModule, AngularModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  openAddProject = false
  openProjectDetail = false
  handleCloseModalAddProject() {
    this.openAddProject = false
  }
  handleOpenModalAddProject() {
    this.openAddProject = true
  }
  handleCloseModalProjectDefailt() {
    this.openAddProject = false
  }
  handleOpenModalProjectDetail() {
    this.openAddProject = true
  }
}
