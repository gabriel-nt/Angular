import { FilmesListaComponent } from './filmes-lista/filmes-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmesFormComponent } from './filmes-form/filmes-form.component';
import { FilmeResolverGuard } from './guard/filme-resolver.guard';

const routes: Routes = [
  { path: '', component: FilmesListaComponent},
  { path: 'novo', component: FilmesFormComponent, resolve:{ filme: FilmeResolverGuard }},
  { path: 'editar/:id', component: FilmesFormComponent, resolve:{ filme: FilmeResolverGuard }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmesRoutingModule { }
