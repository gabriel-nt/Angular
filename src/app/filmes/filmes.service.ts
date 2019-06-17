import { environment } from './../../environments/environment';
import { Filme } from './../filme';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private readonly API =  `${environment.API}filmes`;

  constructor(private http : HttpClient) { }

  lista(){
    return this.http.get<Filme[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    );
  }

  private create(filme){
    return this.http.post(this.API, filme).pipe(take(1));
  }

  loadId(id){
    return this.http.get<Filme>(`${this.API}/${id}`).pipe(take(1));
  }

  private edit(filme){
    return this.http.put(`${this.API}/${filme.id}`, filme).pipe(take(1));
  }

  save(filme){
    if(filme.id){
      return this.edit(filme);
    }
    else{
      return this.create(filme);
    }
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
