import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertType{
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning'
};

@Injectable({
  providedIn: 'root'
})
export class AlertModalService { 
  constructor( private modalService: BsModalService ) { }

  private showAlert(messagem: String, type: AlertType, dismissTimeout?:number){
    const bsModalRef : BsModalRef = this.modalService.show(AlertModalComponent);     
    bsModalRef.content.type = type;
    bsModalRef.content.messagem = messagem;

    if(dismissTimeout){
      setTimeout(()=> bsModalRef.hide(), dismissTimeout )
    }
  }

  showAlertDanger(messagem: String){
    this.showAlert(messagem, AlertType.DANGER);
  }

  showAlertSuccess(messagem: String){
    this.showAlert(messagem, AlertType.SUCCESS, 3000);
  }

  showConfirm(title: string, txt: string, okTxt?: string, cancelTxt?: string){
    const bsModalRef : BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.txt = txt;

    if(okTxt){
      bsModalRef.content.okTxt = okTxt;
    }
    if(cancelTxt){
      bsModalRef.content.cancelTxt = cancelTxt;
    } 
    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;

  }
}
