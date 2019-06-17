import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmesRoutingModule } from './filmes-routing.module';
import { FilmesListaComponent } from './filmes-lista/filmes-lista.component';
import { FilmesFormComponent } from './filmes-form/filmes-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilmesListaComponent, FilmesFormComponent],
  imports: [
    CommonModule,
    FilmesRoutingModule,
    ReactiveFormsModule
  ]
})
export class FilmesModule { }
