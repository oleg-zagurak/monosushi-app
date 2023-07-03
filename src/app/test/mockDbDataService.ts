import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class mockDbDataService {
    private URL: string = environment.BACK_URL;
    private api = { key: ''};
    set API(apiKey: string){
      this.api.key = this.URL + apiKey;
    }
  
    getAll<T>(apiPath?: string): Observable<T[]>{
      return new Observable<T[]>((observer) => observer.next())
    }
    getOne<T>(id: number): Observable<T>{
      return new Observable<T>((observer) => observer.next())
    }
    create<R, S>(item: R): Observable<S>{
      return new Observable<S>((observer) => observer.next())
    }
    delete(id: number): Observable<void>{
      return new Observable<void>((observer) => observer.next())
    }
    update<R, S>(id: number, item: R): Observable<S>{
      return new Observable<S>((observer) => observer.next())
    }
    getByCategory<T>(category: string): Observable<T[]> {
      return new Observable<T[]>((observer) => observer.next())
    }
  }