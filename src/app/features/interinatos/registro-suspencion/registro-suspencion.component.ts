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
import { DateFormatService} from "src/app/core/services/incorporaciones/date-format.service";
import Swal from "sweetalert2";
import * as moment from "moment";
import { PuestosService } from "src/app/core/services/incorporaciones/puestos.service";
import { MatDividerModule } from "@angular/material/divider";
import { Puesto } from "src/app/shared/models/incorporaciones/puesto";

@Component({
  selector: 'app-registro-suspencion',
  templateUrl: './registro-suspencion.component.html',
  styleUrls: ['./registro-suspencion.component.css'],
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
export class RegistroSuspencionComponent implements OnInit {

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
    public dialogRef: MatDialogRef<RegistroSuspencionComponent>,
    private interinatoService: InterinatoService,
    private puestoService: PuestosService,
    private fb: FormBuilder,
    private dateFormatService: DateFormatService
  ) {
    this.formStep1 = this.fb.group({
      puestoNuevoId: ["", Validators.required],
      puestoActualId: [""],
    });

    this.formStep2 = this.fb.group({
      proveidoTramiteInterinatoSuspencion: [""],
      fchProveidoTramiteInterinatoSuspencion: [""],
      citeMemorandumInterinatoSuspencion: [""],
      codigoMemorandumInterinatoSuspencion: [""],
      fchMemorandumInterinatoSuspencion: [""],
    });

    this.formStep3 = this.fb.group({
      fchSuspencion: [""],
      codigoSuspencion: [""],
      fchDesginacionSuspencion: [""],
      sayriInterinato: [""],
      MotivoSuspencion: [""],
      
    }) }

  ngOnInit(): void {
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

  enviarDatos() {
    const formValue = {
      ...this.formStep1.value,
      ...this.formStep2.value,
      ...this.formStep3.value,
    };
    const formattedDates = {
      fchProveidoTramiteInterinatoSuspencion: this.dateFormatService.formatToMySQLDate(
        formValue.fchProveidoTramiteInterinatoSuspencion
      ),
      fchMemorandumInterinatoSuspencion: this.dateFormatService.formatToMySQLDate(
        formValue.fchMemorandumInterinatoSuspencion
      ),
      fchSuspencion: this.dateFormatService.formatToMySQLDate(
        formValue.fchSuspencion
      ),
      fchDesginacionSuspencion: this.dateFormatService.formatToMySQLDate(
        formValue.fchDesginacionSuspencion
      ),
    };

    const interinatoData: Partial<Interinato> = {
      ...formValue,
      ...formattedDates,
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

  closeModal(): void {
    this.dialogRef.close();
  }
}
