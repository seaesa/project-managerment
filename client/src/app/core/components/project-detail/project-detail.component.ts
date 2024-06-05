import { Component, Inject, inject } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { Http } from '../../../shared/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';

const Mdbmodule = [MdbRippleModule, MdbModalModule]
const CompModule = [ModalDeleteComponent]
@Component({
  selector: 'pm-project-detail',
  standalone: true,
  imports: [Mdbmodule, CompModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
  http = inject(Http)
  declare id: string
  constructor(
    private modalService: MdbModalService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) { }
  ngDoCheck() {
  }
  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id') as string
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
}
