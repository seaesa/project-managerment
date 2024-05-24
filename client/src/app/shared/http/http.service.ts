import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Http {
  constructor(private http: HttpClient) { }
  get(url: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
    transferCache?: {
      includeHeaders?: string[];
    } | boolean;
  }): Observable<ArrayBuffer> {
    return this.http.get(`${environment.API_URL}${url}`, options as any)
  }
  post(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
      includeHeaders?: string[];
    } | boolean;
  }): Observable<Object> {
    return this.http.post(`${environment.API_URL}${url}`, body, options)
  }
  delete(url: string, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
    body?: any | null;
  }): Observable<ArrayBuffer> {
    return this.http.delete(`${environment.API_URL}${url}`, options)
  }
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<ArrayBuffer> {
    return this.http.patch(`${environment.API_URL}${url}`, body, options)
  }
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType: 'arraybuffer';
    withCredentials?: boolean;
  }): Observable<ArrayBuffer> {
    return this.http.put(`${environment.API_URL}${url}`, body, options)
  }
}
