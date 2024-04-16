import { IncorporacionesService } from 'src/app/services/incorporaciones/incorporaciones.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/models/incorporaciones/persona';
import { PersonasService } from 'src/app/services/incorporaciones/personas.service';
import { Incorporacion } from '../incorporacion';
import { AreasFormacionService } from 'src/app/services/incorporaciones/areas-formacion.service';
import { AreaFormacion } from 'src/app/models/incorporaciones/area-formacion';
import { RespuestaLista } from 'src/app/models/respuesta';
import { FormacionesService } from 'src/app/services/incorporaciones/formaciones.service';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.scss']
})
export class RegistroPersonaComponent implements OnInit {
  personaForm: FormGroup;
  listAreasFormacion: Array<AreaFormacion> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataIncorporacion: Incorporacion,
    private formBuilder: FormBuilder,
    private personasService: PersonasService,
    private areasFormacionService: AreasFormacionService,
    private formacionesService: FormacionesService,
    private incorporacionesService: IncorporacionesService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegistroPersonaComponent>
  ) {

    // inicializar forms
    this.personaForm = this.formBuilder.group({
      // Datos persona
      idPersona: [undefined],
      generoPersona: ['', Validators.required],
      nombrePersona: [dataIncorporacion?.persona?.nombrePersona, Validators.required],
      primerApellidoPersona: [dataIncorporacion?.persona?.primerApellidoPersona, Validators.required],
      segundoApellidoPersona: [dataIncorporacion?.persona?.segundoApellidoPersona, Validators.required],
      ciPersona: ['', Validators.required],
      expPersona: ['', Validators.required],
      // Datos Formacion
      idFormacion: [undefined],
      areaFormacionId: [undefined],
      areaFormacion: [''],
      institucionId: [undefined], 
      gradoAcademicoId: [undefined],
      gestionFormacion: [undefined],
      conRespaldoFormacion: [undefined],
      // Datos Incorporacion
      idIncorporacion: [dataIncorporacion.idIncorporacion],
      fchIncorporacion: [dataIncorporacion.fchIncorporacion],
      hpIncorporacion: [dataIncorporacion.hpIncorporacion],
      observacionIncorporacion: [dataIncorporacion.observacionIncorporacion]
    });

    // se obtiene todos los datos de la persona
    if(dataIncorporacion?.persona?.idPersona) {
      this.getDataPersonaById(dataIncorporacion?.persona?.idPersona);
    }
    this.loadAreasFormacion();
  }

  ngOnInit(): void {
  }

  /* --------------------------------------- AREA FORMACION --------------------------------------- */
  loadAreasFormacion() {
    this.areasFormacionService.getAll().subscribe((resp: RespuestaLista<AreaFormacion>) => {
      this.listAreasFormacion = resp.objetosList || [];
    })
  }

  /* ------------------------------------------ REGISTRO ------------------------------------------ */
 async onSubmit(): Promise<void> {
    if (this.personaForm.valid) {
      // guardar datos de persona
      const resp = await firstValueFrom(this.personasService.createUpdatePersona({
        idPersona: this.personaForm.get('idPersona')?.value,
        generoPersona: this.personaForm.get('generoPersona')?.value,
        nombrePersona: this.personaForm.get('nombrePersona')?.value,
        primerApellidoPersona: this.personaForm.get('primerApellidoPersona')?.value,
        segundoApellidoPersona: this.personaForm.get('segundoApellidoPersona')?.value,
        ciPersona: this.personaForm.get('ciPersona')?.value,
        expPersona: this.personaForm.get('expPersona')?.value,
      })).catch(error => console.log(error));
      if(resp?.objeto){
        // madar mensaje exitoso
        await this.personaForm.patchValue(resp.objeto);
      } else {
        // mandar mensaje error 
      }
      // guardar datos de formacion
      if(this.personaForm.get('idPersona')?.value)
        await this.saveDataFormacion();
      // guardar datos de incorporacon
      if((this.personaForm.get('idPersona')?.value && this.dataIncorporacion.puestoNuevoId)|| this.personaForm.get('idIncorporacion')?.value)
        await this.saveDataIncorporacion();

      this.dialogRef.close(this.personaForm.value);
    }
  }

  async saveDataFormacion(): Promise<void> {
    // buscar id de areaFormacion
    let areaFormacionId: number|undefined = undefined; 
    if(this.personaForm.get('areaFormacion')?.value) {
      const respAreaFormacion = await firstValueFrom(this.areasFormacionService.getByName(this.personaForm.get('areaFormacion')?.value)).catch(error => console.log(error));
      if(!!respAreaFormacion?.objeto?.idAreaFormacion) {
        console.log('asignando areaFormacionId a valores:', respAreaFormacion?.objeto?.idAreaFormacion);
        this.personaForm.patchValue({
          areaFormacionId: respAreaFormacion.objeto.idAreaFormacion,
        });
        areaFormacionId = respAreaFormacion.objeto.idAreaFormacion;
      }
    }

    const respFormacion = await firstValueFrom(this.formacionesService.createUpdateFormacion({
      idFormacion: this.personaForm.get('idFormacion')?.value,
      personaId: this.personaForm.get('idPersona')?.value,
      institucionId: this.personaForm.get('institucionId')?.value,
      gradoAcademicoId: this.personaForm.get('gradoAcademicoId')?.value,
      areaFormacionId: areaFormacionId,
      gestionFormacion: this.personaForm.get('gestionFormacion')?.value,
      conRespaldoFormacion: this.personaForm.get('conRespaldoFormacion')?.value,
    })).catch(err => console.log(err));
    if(respFormacion?.objeto){
      // madar mensaje exitoso
      this.personaForm.patchValue(respFormacion.objeto);
    } else {
      // mandar mensaje error 
    }
  }

  async saveDataIncorporacion(): Promise<void> {
    const respIncorporacion = await firstValueFrom(this.incorporacionesService.createUpdateIncorporacion({
      idIncorporacion: this.personaForm.get('idIncorporacion')?.value || this.dataIncorporacion.idIncorporacion,
      personaId: this.personaForm.get('idPersona')?.value || this.dataIncorporacion.personaId,
      puestoNuevoId: this.dataIncorporacion.puestoNuevoId,
      fchIncorporacion: this.personaForm.get('fchIncorporacion')?.value,
      hpIncorporacion: this.personaForm.get('hpIncorporacion')?.value,
      observacionIncorporacion: this.personaForm.get('observacionIncorporacion')?.value,
    })).catch(err => console.log(err));
    if(respIncorporacion?.objeto){
      // madar mensaje exitoso
      await this.personaForm.patchValue({
        idIncorporacion: respIncorporacion.objeto.idIncorporacion,
        fchIncorporacion: respIncorporacion.objeto.fchIncorporacion,
        hpIncorporacion: respIncorporacion.objeto.hpIncorporacion,
        observacionIncorporacion: respIncorporacion.objeto.observacionIncorporacion,
        idPersona: respIncorporacion.objeto.personaId,
      });
      await setTimeout(() => {return true;}, 300);
    } else {
      // mandar mensaje error 
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  /* ------------------------------------- Datos de la persona ------------------------------------ */
  getDataPersonaById(idPersona: number): void {
    this.personasService.fingById(idPersona).subscribe(resp => {
      if(!!resp.objeto){
        this.personaForm.patchValue(resp.objeto);
        this.getDataFormacionByPersonaId(resp.objeto.idPersona);
      }
    }, error => console.log(error));
  }

  getDataPersonaByCi(): void {
    const ci = this.personaForm.get('ciPersona')?.value;
    this.personasService.fingByCi(ci).subscribe(resp => {
      if(!!resp.objeto){
        this.personaForm.patchValue(resp.objeto);
        this.getDataFormacionByPersonaId(resp.objeto.idPersona);
      }
    }, error => console.log(error));
  }

  /* ------------------------------------ Datos de su formacion ----------------------------------- */
  getDataFormacionByPersonaId(idPersona: number): void {
    this.formacionesService.buscarPorPersonaId(idPersona).subscribe(resp => {
      console.log('Resp formacion para persona:', resp);
      if(!!resp.objeto)
        this.personaForm.patchValue({
          idFormacion: resp.objeto.idFormacion,
          institucionId: resp.objeto.institucionId,
          gradoAcademicoId: resp.objeto.gradoAcademicoId,
          areaFormacionId: resp.objeto.areaFormacionId,
          areaFormacion: resp.objeto.areaFormacion?.nombreAreaFormacion,
          gestionFormacion: resp.objeto.gestionFormacion,
          conRespaldoFormacion: resp.objeto.conRespaldoFormacion,
        });
    }, error => console.log(error));
  }

}
