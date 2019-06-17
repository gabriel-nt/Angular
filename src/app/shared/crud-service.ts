import { HttpClient } from '@angular/common/http';
import { delay, tap, take } from 'rxjs/operators';

export class CrudService <T> {
    constructor(public http: HttpClient, private API_URL){};

    lista(){
        return this.http.get<T[]>(this.API_URL)
        .pipe(
          delay(2000),
          tap(console.log)
        );
      }
    
      private create(registro: T){
        return this.http.post(this.API_URL, registro).pipe(take(1));
      }
    
      loadId(id){
        return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
      }
    
      private edit(registro: T){
        return this.http.put(`${this.API_URL}/${registro['id']}`, registro).pipe(take(1));
      }
    
      save(registro: T){
        if(registro['id']){
          return this.edit(registro);
        }
        else{
          return this.create(registro);
        }
      }
    
      remove(id) {
        return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
      }

}
