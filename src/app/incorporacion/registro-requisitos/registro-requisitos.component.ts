import { IncorporacionesService } from 'src/app/services/incorporaciones/incorporaciones.service';
import { PuestosService } from 'src/app/services/incorporaciones/puestos.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Incorporacion } from '../incorporacion';
import { Requisito } from 'src/app/models/incorporaciones/requisito';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-registro-requisitos',
  templateUrl: './registro-requisitos.component.html',
  styleUrls: ['./registro-requisitos.component.scss']
})
export class RegistroRequisitosComponent implements OnInit {
  requisitosForm: FormGroup;
  requisitoPuesto: Requisito | undefined;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegistroRequisitosComponent>,
    private puestosService: PuestosService,
    private incorporacionesService: IncorporacionesService,
    @Inject(MAT_DIALOG_DATA) private dataInc: Pick<Incorporacion,
    'idIncorporacion'|
    'puestoNuevoId'|
    'cumpleExpProfesionalIncorporacion'|
    'cumpleExpEspecificaIncorporacion'|
    'cumpleExpMandoIncorporacion'|
    'cumpleFormacionIncorporacion'>
  ) { 
    console.log('data Enviada a requisitos: ', dataInc);
    this.requisitosForm = this.formBuilder.group({
        cumpleExpProfesionalIncorporacion: [dataInc.cumpleExpProfesionalIncorporacion, Validators.required],
        cumpleExpEspecificaIncorporacion: [dataInc.cumpleExpEspecificaIncorporacion, Validators.required],
        cumpleExpMandoIncorporacion: [dataInc.cumpleExpMandoIncorporacion, Validators.required],
        cumpleFormacionIncorporacion: [dataInc.cumpleFormacionIncorporacion, Validators.required],
    });

    this.getRequisitoData();

  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    if (this.requisitosForm.valid) {
      const resp = await firstValueFrom(this.incorporacionesService.createUpdateIncorporacion({
        idIncorporacion: this.dataInc.idIncorporacion,
        ...this.requisitosForm.value,
      })).catch(error => console.log(error));
      if(resp?.objeto){
        console.log('Guardado exitosamente!!!');
      }
      this.dialogRef.close(this.requisitosForm.value);
    }
  }

  async getRequisitoData() {
    if(this.dataInc.puestoNuevoId) {
      const respReqs = await firstValueFrom(this.puestosService.getPuestoRequisito(this.dataInc.puestoNuevoId)).catch(error => console.log(error));
      if(respReqs?.objeto){
        this.requisitoPuesto = respReqs.objeto;
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
