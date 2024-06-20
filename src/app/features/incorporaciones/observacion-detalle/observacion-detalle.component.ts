import { Component, Inject, OnInit } from "@angular/core";
import { IncorporacionesService } from "src/app/core/services/incorporaciones/incorporaciones.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Incorporacion } from "src/app/shared/models/incorporaciones/incorporacion";
import { firstValueFrom } from "rxjs";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-observacion-detalle",
  templateUrl: "./observacion-detalle.component.html",
  styleUrls: ["./observacion-detalle.component.css"],
})
export class ObservacionDetalleComponent implements OnInit {
  observacionEvaluacionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ObservacionDetalleComponent>,
    private incorporacionesService: IncorporacionesService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA)
    private dataInc: Pick<
      Incorporacion,
      | "idIncorporacion"
      | "puestoNuevoId"
      | "personaId"
      | "observacionDetalleIncorporacion"
    >
  ) {
    console.log("Data enviada: ", dataInc);
    this.observacionEvaluacionForm = this.formBuilder.group({
      observacionDetalleIncorporacion: [
        dataInc.observacionDetalleIncorporacion,
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {}

  async guardarFormulario(): Promise<void> {
    try {
      if (this.observacionEvaluacionForm.valid) {
        const resp = await firstValueFrom(
          this.incorporacionesService.createUpdateIncorporacion({
            idIncorporacion: this.dataInc.idIncorporacion,
            puestoNuevoId: this.dataInc.puestoNuevoId,
            personaId: this.dataInc.personaId,
            ...this.observacionEvaluacionForm.value,
          })
        );

        if (resp?.objeto) {
          console.log("Guardado exitosamente!!!");
          this.notificationService.showSuccess(
            "Se guardó exitosamente la observación de evaluación!!!"
          );
          this.dialogRef.close(this.observacionEvaluacionForm.value);
        } else {
          this.notificationService.showError(
            "Error al guardar la Observación de Evaluación."
          );
        }
      } else {
        this.notificationService.showError(
          "El formulario no es válido. Por favor, revise los campos."
        );
      }
    } catch (error: any) {
      this.notificationService.showError(
        "Error al guardar la Observación de Evaluación: " + error.message
      );
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
