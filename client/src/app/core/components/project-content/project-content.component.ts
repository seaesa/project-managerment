import { Component, inject, output } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { Http } from '../../../shared/http/http.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../../shared/project/project.service';
const MdbModule = [MdbRippleModule]
const AntModule = [NzEmptyModule, NzSkeletonModule]
const AngularModule = [RouterLink]
@Component({
  selector: 'project-content',
  standalone: true,
  imports: [MdbModule, AntModule, AngularModule],
  templateUrl: './project-content.component.html',
  styleUrl: './project-content.component.scss'
})
export class ProjectContentComponent {
  http = inject(Http);
  projectService = inject(ProjectService)
  openModal = output()
  sekeleton = true
  projects: any[] = []
  // ngDoCheck() {
  //   this.projects = this.projectService.getProject()
  // }
  handleOpenModal() {
    this.openModal.emit()
  }
  ngOnInit() {
    this.http.get('/project/all-project').subscribe((res: any) => {
      if (!res.error) {
        this.projectService.setProjects(res.project)
        this.projects = this.projectService.getProject()
        setTimeout(() => {
          this.sekeleton = false
        }, 2000)
      }
    })
  }
}
