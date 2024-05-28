import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

const MdbModule = [MdbFormsModule];
const AngularModule = [FormsModule]
@Component({
  selector: 'pm-add-project',
  standalone: true,
  imports: [MdbModule, AngularModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent {
}
