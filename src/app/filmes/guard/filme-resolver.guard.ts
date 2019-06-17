import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FilmesService } from '../filmes.service';
import { Filme } from 'src/app/filme';

@Injectable({
  providedIn: 'root'
})
export class FilmeResolverGuard implements Resolve<Filme> {
  constructor(private service: FilmesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Filme> {
    if (route.params && route.params['id']) {
      return this.service.loadId(route.params['id']);
    }

    return of({
      id: null,
      titulo: null,
      categoria: null,
      anoLancamento: null
    });
  }
}