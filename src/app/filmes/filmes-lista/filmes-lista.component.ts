import { Filme } from './../../filme';
import { FilmesService } from './../filmes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, empty, Subject } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Filmes2Service } from '../filmes2.service';

@Component({
  selector: 'app-filmes-lista',
  templateUrl: './filmes-lista.component.html',
  styleUrls: ['./filmes-lista.component.css']
})
export class FilmesListaComponent implements OnInit {

  deleteModalRef: BsModalRef;
  @ViewChild('deleteModal', { static: true }) deleteModal;

  filmes$: Observable<Filme[]>;
  error$ = new Subject<boolean>();
  filmeSelecionado: Filme;

  constructor(private service: FilmesService, private modalService: BsModalService, private alertService: AlertModalService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.filmes$ = this.service.lista().pipe(
      catchError(error => {
        console.error(error);
        this.mostrarErro();
        return empty();
      })
      // Abaixo tratamento de erros utilizando o catchError do rxJS
    );
  }

  mostrarErro(){
    this.alertService.showAlertDanger("Erro ao carregar filmes.");
  }

  onEdit(id){
    this.router.navigate(['editar', id], { relativeTo: this.route})
  }

  onDelete(filme){
    this.filmeSelecionado = filme;
    const result$ = this.alertService.showConfirm('Confirmação', 'Deseja, realmente, deletar esse filme?','Sim', 'Não');
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.service.remove(filme.id) : empty()),
    ).subscribe(
      success => {
        this.alertService.showAlertSuccess('Filme removido com sucesso'),
        this.onRefresh()
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover filme')
      }
    );
  }

  onConfirm(){
    this.service.remove(this.filmeSelecionado.id).subscribe(
      success => {
        this.alertService.showAlertSuccess('Filme removido com sucesso'),
        this.onRefresh(),
        this.onCancel();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover filme'),
        this.onCancel();
      }
    );
  }

  onCancel(){
    this.deleteModalRef.hide();
  }
}
