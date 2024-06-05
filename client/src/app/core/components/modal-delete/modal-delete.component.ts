import { Component, inject, output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Http } from '../../../shared/http/http.service';
import { Router } from '@angular/router';
import { ProjectService } from '../../../shared/project/project.service';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'pm-modal-delete',
  standalone: true,
  imports: [MdbModalModule],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss'
})
export class ModalDeleteComponent {
  http = inject(Http)
  projectService = inject(ProjectService)
  id: string | null = null
  waiting = false
  closeModalDetail = output()
  constructor(
    public modalRef: MdbModalRef<ModalDeleteComponent>,
    private router: Router
  ) {

  }
  closeModal() {
    this.modalRef.close()
  }
  handleDeleteProject() {
    this.waiting = true
    this.http.delete('/project/delete', {
      body: {
        id: this.id
      }
    }).subscribe((res: any) => {
      if (!res.error) {
        this.waiting = false
        this.modalRef.close()
        this.router.navigate(['/project'])
        this.projectService.refreshProject()
      }
    })
  }
}
