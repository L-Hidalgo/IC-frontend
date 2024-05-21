import { Component, Inject, OnInit } from "@angular/core";
import { IncorporacionesService } from "src/app/core/services/incorporaciones/incorporaciones.service";
import { PuestosService } from "src/app/core/services/incorporaciones/puestos.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Incorporacion } from 'src/app/shared/models/incorporaciones/incorporacion';
import { Requisito } from "src/app/shared/models/incorporaciones/requisito";
import { firstValueFrom } from "rxjs";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-registro-requisitos",
  templateUrl: "./registro-requisitos.component.html",
  styleUrls: ["./registro-requisitos.component.css"],
})
export class RegistroRequisitosComponent implements OnInit {
  requisitosForm: FormGroup;
  requisitoPuesto: Requisito | undefined;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegistroRequisitosComponent>,
    private puestosService: PuestosService,
    private incorporacionesService: IncorporacionesService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA)
    private dataInc: Pick<
      Incorporacion,
      | "idIncorporacion"
      | "puestoNuevoId"
      | "personaId"
      | "cumpleExpProfesionalIncorporacion"
      | "cumpleExpEspecificaIncorporacion"
      | "cumpleExpMandoIncorporacion"
      | "cumpleFormacionIncorporacion"
    >
  ) {
    console.log("data Enviada a requisitos: ", dataInc);
    this.requisitosForm = this.formBuilder.group({
      cumpleExpProfesionalIncorporacion: [
        dataInc.cumpleExpProfesionalIncorporacion,
        Validators.required,
      ],
      cumpleExpEspecificaIncorporacion: [
        dataInc.cumpleExpEspecificaIncorporacion,
        Validators.required,
      ],
      cumpleExpMandoIncorporacion: [
        dataInc.cumpleExpMandoIncorporacion,
        Validators.required,
      ],
      cumpleFormacionIncorporacion: [
        dataInc.cumpleFormacionIncorporacion,
        Validators.required,
      ],
    });

    this.getRequisitoData();
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.requisitosForm.valid) {
      const resp = await firstValueFrom(
        this.incorporacionesService.createUpdateIncorporacion({
          idIncorporacion: this.dataInc.idIncorporacion,
          puestoNuevoId: this.dataInc.puestoNuevoId,
          personaId: this.dataInc.personaId,
          ...this.requisitosForm.value,
        })
      )
        /*.catch(error => console.log(error));*/
        .catch((error) => {
          this.notificationService.showError(
            "Error al guardar requistos: " + error
          ); // Mostrar mensaje de error
        });
      if (resp?.objeto) {
        console.log("Guardado exitosamente!!!");
        this.notificationService.showSuccess(
          "Se guardo exitosamente los requisitos del puesto!!!"
        );
      }
      this.dialogRef.close(this.requisitosForm.value);
    }
  }

  async getRequisitoData() {
    if (this.dataInc.puestoNuevoId) {
      const respReqs = await firstValueFrom(
        this.puestosService.getPuestoRequisito(this.dataInc.puestoNuevoId)
      ).catch((error) => console.log(error));
      if (respReqs?.objeto) {
        this.requisitoPuesto = respReqs.objeto;
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
