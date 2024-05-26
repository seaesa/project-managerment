import { Component, inject } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { UserService } from '../../../shared/user/user.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { CommonModule } from '@angular/common';

const ComponentModule = [AddProjectComponent];
const MdbModule = [MdbRippleModule];
const AnngularModule = [CommonModule]
@Component({
  selector: 'project-header',
  standalone: true,
  imports: [MdbModule, ComponentModule, AnngularModule],
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.scss'
})
export class ProjectHeaderComponent {
  user = inject(UserService)
  open = false
  openModalAddProduct() {
    this.open = true
  }
}
