import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Interinato } from "src/app/shared/models/incorporaciones/interinato";
import { InterinatoService } from "src/app/core/services/incorporaciones/interinato.service";
import { FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import * as moment from "moment";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { DateFormatServiceService } from "src/app/core/services/incorporaciones/date-format.service";
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatIconModule} from '@angular/material/icon';
import { MatDatepickerModule } from "@angular/material/datepicker";

@Component({
  selector: "app-editar-interinato",
  templateUrl: "./editar-interinato.component.html",
  styleUrls: ["./editar-interinato.component.css"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
  ],
})
export class EditarInterinatoComponent implements OnInit {

  interinato: Interinato;

  formStep1!: FormGroup;
  formStep2!: FormGroup;
  formStep3!: FormGroup;

  firstFormGroup = this.fb.group({
    firstCtrl: ["", Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ["", Validators.required],
  });
  isLinear = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarInterinatoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { interinato: Interinato },
    private interinatoService: InterinatoService, 
    private dateFormatService: DateFormatServiceService
  ) {
    this.interinato = { ...data.interinato };

    this.formStep1 = this.fb.group({
      puestoNuevoId: [this.interinato.puestoNuevoId, Validators.required],
      puestoActualId: [this.interinato.puestoActualId, Validators.required]
    });

    this.formStep2 = this.fb.group({
      proveidoTramiteInterinato: [this.interinato.proveidoTramiteInterinato],
      citeNotaInformeMinutaInterinato: [this.interinato.citeNotaInformeMinutaInterinato],
      fchCiteNotaInfMinutaInterinato: [this.interinato.fchCiteNotaInfMinutaInterinato],
      fchMemorandumRapInterinato: [this.interinato.fchMemorandumRapInterinato],
      citeInformeInterinato: [this.interinato.citeInformeInterinato],
      fojasInformeInterinato: [this.interinato.fojasInformeInterinato],
      citeMemorandumInterinato: [this.interinato.citeMemorandumInterinato],
      codigoMemorandumInterinato: [this.interinato.codigoMemorandumInterinato],
      citeRapInterinato: [this.interinato.citeRapInterinato],
      codigoRapInterinato: [this.interinato.codigoRapInterinato],
    });

    this.formStep3 = this.fb.group({
      fchInicioInterinato: [this.interinato.fchInicioInterinato],
      fchFinInterinato: [this.interinato.fchFinInterinato],
      periodoInterinato: [this.interinato.periodoInterinato],
      totalDiasInterinato: [this.interinato.totalDiasInterinato],
      tipoNotaInformeMinutaInterinato: [this.interinato.tipoNotaInformeMinutaInterinato],
      sayriInterinato: [this.interinato.sayriInterinato],
      observacionesInterinato: [this.interinato.observacionesInterinato],
    });
  }

  ngOnInit(): void {}

  guardarCambios(): void {
    this.interinatoService.actualizarInterinato(this.interinato).subscribe(
      (interinatoActualizado) => {
        this.dialogRef.close(interinatoActualizado); 
      },
      error => {
        console.error('Error al actualizar interinato:', error);
      }
    );
  }

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
  
  closeModal(): void {
    this.dialogRef.close();
  }
}
