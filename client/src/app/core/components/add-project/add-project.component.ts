import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, EventEmitter, Input, Output, inject, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Http } from '../../../shared/http/http.service';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
const MdbModule = [MdbFormsModule, MdbValidationModule];
const AngularModule = [FormsModule, ReactiveFormsModule, CommonModule];
const AntModule = [NzSelectModule];

@Component({
  selector: 'pm-add-project',
  standalone: true,
  imports: [MdbModule, AngularModule, AntModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss'
})
export class AddProjectComponent {
  http = inject(Http)
  declare formWrap: FormGroup;
  waiting = false
  listOfOption: Array<{ value: string; label: string }> = [
    {
      value: 'hai',
      label: 'hai'
    },
    {
      value: 'hai',
      label: 'hai'
    },
    {
      value: 'hai',
      label: 'hai'
    },
  ];
  @Input() user: Array<any> = []
  @Input() leader: Array<any> = []
  @Input() fetchData: boolean = false
  closeModal = output()
  destroyRef = inject(DestroyRef)
  constructor(
    private builder: FormBuilder,
  ) {
    this.formWrap = this.builder.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      leader: new FormControl(null, Validators.required),
      member: new FormControl([], Validators.required),
    })
  }
  handleAdddProject() {
    this.formWrap.markAllAsTouched()
    this.waiting = true
    this.http.post('/project/create', this.formWrap.value).subscribe(res => {
      this.waiting = false
      console.log(res)
    })
  }
  handleHiddenModal() {
    this.formWrap.reset()
    this.closeModal.emit();
  }
}
