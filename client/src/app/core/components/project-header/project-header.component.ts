import { Component, output } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


const MdbModule = [MdbRippleModule];
const AnngularModule = [CommonModule, FormsModule]
@Component({
  selector: 'project-header',
  standalone: true,
  imports: [MdbModule, AnngularModule],
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.scss'
})
export class ProjectHeaderComponent {
  openModal = output()

  constructor() { }
  openModalAddProduct() {
    this.openModal.emit()
  }

}
