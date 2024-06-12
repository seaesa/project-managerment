import { Component, Inject, inject } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { Http } from '../../../shared/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ProjectService } from '../../../shared/project/project.service';
const Mdbmodule = [MdbRippleModule, MdbModalModule, MdbFormsModule, MdbValidationModule]
const CompModule = [ModalDeleteComponent]
const AntModule = [NzInputModule, NzTableModule]
const AngularModule = [CommonModule, FormsModule, ReactiveFormsModule]
@Component({
  selector: 'pm-project-detail',
  standalone: true,
  imports: [Mdbmodule, CompModule, AntModule, AngularModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
  http = inject(Http)
  projectService = inject(ProjectService)
  declare project: object
  declare id: string
  declare tasks: any[]
  declare formWrap: FormGroup
  constructor(
    private modalService: MdbModalService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder
  ) {
    this.formWrap = this.builder.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })
  }
  suffix = ' <i class="fa-solid fa-signature"></i>'
  prefix = ' <i class="fa-solid fa-signature"></i>'

  listOfColumns: any = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.name.localeCompare(b.name),
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' }
      ],
      filterFn: (list: string[], item: any) => list.some(name => item.name.indexOf(name) !== -1)
    },
    {
      name: 'Description',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.age - b.age,
      listOfFilter: [],
      filterFn: null
    },
  ];
  open = false
  waiting = false
  ngDoCheck() {
  }
  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id') as string
    this.http.get('/project/get-task', {
      responseType: 'json', params: { id: this.id }
    }).subscribe((res: any) => {
      if (!res.error) {
        this.tasks = res.tasks
      }
    })
  }
  requestDelete() {
    this.modalService.open(ModalDeleteComponent, {
      data: { id: this.id },
      ignoreBackdropClick: true
    })
  }
  handleHideModal() {
    this.router.navigate(['./project'])
  }
  handleAddTask() {
    this.waiting = true
    this.http.post('/project/add-task', { projectId: this.id, ...this.formWrap.value }).subscribe((res: any) => {
      if (!res.error) {
        this.open = false
        this.waiting = false
        this.http.get('/project/get-task', {
          responseType: 'json', params: { id: this.id }
        }).subscribe((res: any) => {
          if (!res.error) {
            this.tasks = res.tasks
          }
        })
      }
    })
  }
  openTask() {
    this.open = true
  }
  hiddenTask() {
    this.open = false
  }
}
