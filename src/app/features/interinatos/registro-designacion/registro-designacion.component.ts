import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { InterinatoService } from "src/app/core/services/incorporaciones/interinato.service";
import { Interinato } from "src/app/shared/models/incorporaciones/interinato";
import { DateFormatService } from "src/app/core/services/incorporaciones/date-format.service";
import Swal from "sweetalert2";
import * as moment from "moment";
import { PuestosService } from "src/app/core/services/incorporaciones/puestos.service";
import { MatDividerModule } from "@angular/material/divider";
import { Puesto } from "src/app/shared/models/incorporaciones/puesto";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-registro-designacion",
  templateUrl: "./registro-designacion.component.html",
  styleUrls: ["./registro-designacion.component.css"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatDividerModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistroDesignacionComponent implements OnInit {
  formStep1!: FormGroup;
  formStep2!: FormGroup;
  formStep3!: FormGroup;

  formGroup!: FormGroup;

  puestoDestinoEncontrado: Puesto | null = null;
  puestoActualEncontrado: Puesto | null = null;

  firstFormGroup = this.fb.group({
    firstCtrl: ["", Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ["", Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<RegistroDesignacionComponent>,
    private interinatoService: InterinatoService,
    private puestoService: PuestosService,
    private fb: FormBuilder,
    private dateFormatService: DateFormatService
  ) {
    this.formStep1 = this.fb.group({
      puestoNuevoId: ["", Validators.required],
      puestoActualId: ["", Validators.required],
    });

    this.formStep2 = this.fb.group({
      proveidoTramiteInterinato: [""],
      citeNotaInformeMinutaInterinato: [""],
      fchCiteNotaInfMinutaInterinato: [""],
      citeInformeInterinato: [""],
      fojasInformeInterinato: [""],
      citeMemorandumInterinato: [""],
      codigoMemorandumInterinato: [""],
      citeRapInterinato: [""],
      codigoRapInterinato: [""],
      fchMemorandumRapInterinato: [""],
    });

    this.formStep3 = this.fb.group({
      fchInicioInterinato: ["", Validators.required],
      fchFinInterinato: ["", Validators.required],
      totalDiasInterinato: [""],
      periodoInterinato: [""],
      tipoNotaInformeMinutaInterinato: [""],
      observacionesInterinato: [""],
      sayriInterinato: [""],
    });
  }

  ngOnInit(): void {}

  calcularPeriodo(): string {
    const fechaInicio = moment(this.formStep3.value.fchInicioInterinato);
    const fechaFin = moment(this.formStep3.value.fchFinInterinato);

    if (fechaInicio.isValid() && fechaFin.isValid()) {
      const formatoInicio = fechaInicio.format("D [de] MMMM");
      const formatoFin = fechaFin.format("D [de] MMMM YYYY");

      return `${formatoInicio} al ${formatoFin}`;
    }
    return "";
  }

  calcularTotalDias(): number {
    const fechaInicio = this.formStep3.value.fchInicioInterinato;
    const fechaFin = this.formStep3.value.fchFinInterinato;

    if (fechaInicio && fechaFin) {
      const inicio = moment(fechaInicio);
      const fin = moment(fechaFin);

      const dias = fin.diff(inicio, "days") + 1;

      return dias;
    }

    return 0;
  }

  enviarDatos() {
    const formValue = {
      ...this.formStep1.value,
      ...this.formStep2.value,
      ...this.formStep3.value,
      puestoNuevoId: this.formStep1.get("puestoNuevoId")?.value,
      puestoActualId: this.formStep1.get("puestoActualId")?.value,
    };
    const formattedDates = {
      fchCiteNotaInfMinutaInterinato: this.dateFormatService.formatToMySQLDate(
        formValue.fchCiteNotaInfMinutaInterinato
      ),
      fchMemorandumRapInterinato: this.dateFormatService.formatToMySQLDate(
        formValue.fchMemorandumRapInterinato
      ),
      fchInicioInterinato: this.dateFormatService.formatToMySQLDate(
        formValue.fchInicioInterinato
      ),
      fchFinInterinato: this.dateFormatService.formatToMySQLDate(
        formValue.fchFinInterinato
      ),
    };

    const interinatoData: Partial<Interinato> = {
      ...formValue,
      ...formattedDates,
      periodoInterinato: this.calcularPeriodo(),
      totalDiasInterinato: this.calcularTotalDias(),
    };

    this.interinatoService.crearInterinato(interinatoData).subscribe(
      (response) => {
        console.log("Respuesta de la API:", response);
        Swal.fire({
          icon: "success",
          title: "¡Interinato registrado exitosamente!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.closeModal();
        });
      },
      (error) => {
        console.error("Error al enviar datos:", error);
        Swal.fire({
          icon: "error",
          title: "Error al registrar los datos.",
          text: "Por favor, inténtalo de nuevo.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          this.closeModal();
        });
      }
    );
  }

  searchDataPuestoDestino(item: number): void {
    this.puestoService.findPuestoByItem(item).subscribe(
      (resp) => {
        if (resp && resp.objeto) {
          console.log("Puesto de destino encontrado:", resp.objeto);
          this.puestoDestinoEncontrado = resp.objeto;
          this.formStep1
            .get("puestoNuevoId")
            ?.setValue(this.puestoDestinoEncontrado.idPuesto);
        } else {
          console.log("No se encontró ningún puesto de destino.");
          this.puestoDestinoEncontrado = null;
          this.formStep1.get("puestoNuevoId")?.setValue(null);
        }
      },
      (error) => {
        console.error("Error al buscar puesto de destino por item:", error);
        this.puestoDestinoEncontrado = null;
        this.formStep1.get("puestoNuevoId")?.setValue(null);
      }
    );
  }

  searchDataPuestoActual(item: number): void {
    this.puestoService.findPuestoByItem(item).subscribe(
      (resp) => {
        if (resp && resp.objeto) {
          console.log("Puesto de actual encontrado:", resp.objeto);
          this.puestoActualEncontrado = resp.objeto;
          this.formStep1
            .get("puestoActualId")
            ?.setValue(this.puestoActualEncontrado.idPuesto);
        } else {
          console.log("No se encontró ningún puesto de actual.");
          this.puestoActualEncontrado = null;
          this.formStep1.get("puestoActualId")?.setValue(null);
        }
      },
      (error) => {
        console.error("Error al buscar puesto de actual por item:", error);
        this.puestoActualEncontrado = null;
        this.formStep1.get("puestoActualId")?.setValue(null);
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
