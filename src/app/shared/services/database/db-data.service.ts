import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbDataService {
  constructor(private http: HttpClient) { }
  private URL: string = environment.BACK_URL;
  private api = { key: ''};
  set API(apiKey: string){
    this.api.key = this.URL + apiKey;
  }

  getAll<T>(apiPath?: string): Observable<T[]>{
    let path = this.api.key;
    if(apiPath) path = this.URL + apiPath;
    
    return this.http.get<T[]>(path);
  }
  getOne<T>(id: number): Observable<T>{
    return this.http.get<T>(`${this.api.key}/${id}`)
  }
  create<R, S>(item: R): Observable<S>{
    return this.http.post<S>(this.api.key, item)
  }
  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api.key}/${id}`)
  }
  update<R, S>(id: number, item: R): Observable<S>{
    return this.http.patch<S>(`${this.api.key}/${id}`, item);
  }
  getByCategory<T>(category: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.api.key}/?category.path=${category}`);
  }
}
