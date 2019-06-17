import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud-service';
import { Filme } from '../filme';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Filmes2Service extends CrudService<Filme>{

  constructor(public http: HttpClient) {
    super(http, `${environment.API}filmes`);
  }
}
