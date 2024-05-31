import { Component, ElementRef, ViewChild, inject, output } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { Http } from '../../../shared/http/http.service';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { RouterLink } from '@angular/router';
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
  openModal = output()
  projects: Array<any> = []
  sekeleton = true
  handleOpenModal() {
    this.openModal.emit()
  }
  ngOnInit() {
    this.http.get('/project/all-project').subscribe((res: any) => {
      if (!res.error) {
        this.projects = res.project
        setTimeout(() => {
          this.sekeleton = false
        }, 2000)
      }
    })
  }
}
