import { Component, EventEmitter, Output, inject, output } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { UserService } from '../../../shared/user/user.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { CommonModule } from '@angular/common';
import { Http } from '../../../shared/http/http.service';
import { FormsModule } from '@angular/forms';

const ComponentModule = [AddProjectComponent];
const MdbModule = [MdbRippleModule];
const AnngularModule = [CommonModule, FormsModule]
@Component({
  selector: 'project-header',
  standalone: true,
  imports: [MdbModule, ComponentModule, AnngularModule],
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.scss'
})
export class ProjectHeaderComponent {
  UserService = inject(UserService)
  http = inject(Http)
  leader: Array<object> = []
  user: Array<object> = []
  open = false
  fetchData = false
  openModalAddProduct() {
    this.open = true
    this.http.get('/all-user').subscribe((res: any) => {
      this.leader = res.user.filter((user: any) => user.role === 'leader')
      this.user = res.user.filter((user: any) => user.role === 'user')
      this.fetchData = true
    })
  }
  onModalClose() {
    this.open = false
  }
}
