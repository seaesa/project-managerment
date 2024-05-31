import { ChangeDetectionStrategy, Component, DestroyRef, inject, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Http } from '../../../shared/http/http.service';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  leaderStatus: '' | 'error' = ''
  userStatus: '' | 'error' = ''
  members: Array<any> = []
  leaders: Array<any> = []
  closeModal = output()
  destroyRef = inject(DestroyRef)
  constructor(
    private builder: FormBuilder
  ) {
    this.formWrap = this.builder.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      leader: new FormControl(null, Validators.required),
      member: new FormControl([], Validators.required),
    })
  }

  ngOnInit() {
    this.http.get('/all-user').subscribe((res: any) => {
      this.members = (res.user as Array<any>).filter(user => user.role === 'member')
      this.leaders = (res.user as Array<any>).filter(user => user.role === 'leader')
    })
  }

  getLeader() {
    return this.formWrap.get('leader')!
  }
  getMember() {
    return this.formWrap.get('member')!
  }
  handleAdddProject() {
    if (this.formWrap.invalid) {
      this.formWrap.markAllAsTouched()
      this.getMember().invalid && (this.userStatus = 'error')
      this.getLeader().invalid && (this.leaderStatus = 'error')
    } else {
      this.waiting = true
      // this.http.post('/project/create', this.formWrap.value).subscribe(res => {
      //   this.waiting = false 
      // })
    }
  }
  handleHiddenModal() {
    this.formWrap.reset()
    this.closeModal.emit();
  }
  handleInputFocus(role: string) {
    if (role === 'user') {
      this.userStatus = ''
    }
  }
  handleInputBlur(role: string, condition: boolean) {
    if (role === 'user') {
      if (condition) this.userStatus = 'error'
    } else {
      if (condition) this.leaderStatus = 'error'
    }
  }
  handleModalChange(role: string) {
    if (role === 'user') {
      this.userStatus = ''
    } else {
      this.leaderStatus = ''
    }
  }
}
