import { Injectable, inject } from '@angular/core';
import { Http } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  http = inject(Http)
  declare projects: any[]

  refreshProject() {
    this.getAllProjects()
  }
  getProject() {
    return this.projects
  }
  getAllProjects(callback?: Function) {
    this.http.get('/project/all-project').subscribe((res: any) => {
      if (!res.error) {
        this.projects = res.project
        if (callback)
          callback(res)
      }
    })
  }
}
