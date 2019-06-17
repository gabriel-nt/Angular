import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [AlertModalComponent, ConfirmModalComponent],
  imports: [
    CommonModule
  ],
  exports: [ AlertModalComponent ],
  //Com o entrycomponents, dizemos que este componente será instanciado e utilizado 
  //em tempo de execução, ele não será utilizado em nenhum template ou dentro de um roteamento.
  entryComponents: [ AlertModalComponent, ConfirmModalComponent ]
})
export class SharedModule { }
