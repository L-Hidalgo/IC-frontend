import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup
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
import { DateFormatServiceService } from "src/app/core/services/incorporaciones/date-format.service";
import Swal from "sweetalert2";
import * as moment from "moment";
import { PuestosService } from "src/app/core/services/incorporaciones/puestos.service";
import { MatDividerModule } from "@angular/material/divider";
import { Puesto } from "src/app/shared/models/incorporaciones/puesto";


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
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatDividerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistroDesignacionComponent implements OnInit {

  formStep1!: FormGroup;
  formStep2!: FormGroup;
  formStep3!: FormGroup;

  formGroup!: FormGroup;

  puestoEncontrado: Puesto | null = null;

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
    private dateFormatService: DateFormatServiceService
  ) {
    this.formStep1 = this.fb.group({
      puestoNuevoId: ["", Validators.required],
      puestoActualId: [""],
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
      fchInicioInterinato: [""],
      fchFinInterinato: [""],
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
          console.log("Puesto encontrado:", resp.objeto);
          this.puestoEncontrado = resp.objeto;
        } else {
          console.log("No se encontró ningún puesto.");
          this.puestoEncontrado = null; 
        }
      },
      (error) => {
        console.error("Error al buscar puesto por item:", error);
        this.puestoEncontrado = null; 
      }
    );
  }
  
  closeModal(): void {
    this.dialogRef.close();
  }
}