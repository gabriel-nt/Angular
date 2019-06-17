import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FilmesService } from "../filmes.service";
import { AlertModalService } from "src/app/shared/alert-modal.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-filmes-form",
  templateUrl: "./filmes-form.component.html",
  styleUrls: ["./filmes-form.component.css"]
})
export class FilmesFormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private service: FilmesService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    const filme = this.route.snapshot.data['filme'];

    this.form = this.fb.group({
      id: [filme.id],
      titulo: [
        filme.titulo,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(250)
        ]
      ],
      categoria: [
        filme.categoria,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(250)
        ]
      ],
      anoLancamento: [
        filme.anoLancamento,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern("[0-9]{4}")
        ]
      ]
    });
  }

  hasErrors(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log("submit");
      let msgSucesso='Filme criado com sucesso';
      let msgErro='Erro ao criar filme, tente novamente';
      if(this.form.value.id){
        msgSucesso='Filme atualizado com sucesso';
        msgErro='Erro ao atualizar o filme, tente novamente';
      }
      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSucesso),
          this.location.back();
        },
        error => {
          this.modal.showAlertDanger(msgErro);
        },
        () => console.log("request completo"),
      );
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  onBack() {
    this.location.back();
  }
}
