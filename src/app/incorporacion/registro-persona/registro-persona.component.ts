import { InstitucionesService } from './../../services/incorporaciones/instituciones.service';
import { Institucion } from './../../models/incorporaciones/institucion';
import { AreaFormacion } from 'src/app/models/incorporaciones/area-formacion';
import { GradoAcademico } from 'src/app/models/incorporaciones/grado-academico';
import { IncorporacionesService } from 'src/app/services/incorporaciones/incorporaciones.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from 'src/app/services/incorporaciones/personas.service';
import { Incorporacion } from '../incorporacion';
import { GradosAcademicoService } from 'src/app/services/incorporaciones/grados-academico.service';
import { AreasFormacionService } from 'src/app/services/incorporaciones/areas-formacion.service';
import { RespuestaLista } from 'src/app/models/respuesta';
import { FormacionesService } from 'src/app/services/incorporaciones/formaciones.service';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from 'src/app/services/incorporaciones/notification.service';


@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.scss']
})
export class RegistroPersonaComponent implements OnInit {
  personaForm: FormGroup;

  listAreasFormacion: Array<AreaFormacion> = [];
  listGradosAcademico: Array<GradoAcademico> = [];
  listInstituciones: Array<Institucion> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataIncorporacion: Incorporacion,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private personasService: PersonasService,
    private gradosAcademicoService: GradosAcademicoService,
    private areasFormacionService: AreasFormacionService,
    private institucionesService: InstitucionesService,
    private formacionesService: FormacionesService,
    private incorporacionesService: IncorporacionesService,
    public dialogRef: MatDialogRef<RegistroPersonaComponent>
  ) {

    // inicializar forms
    this.personaForm = this.formBuilder.group({
      idPersona: [undefined],
      generoPersona: ['', Validators.required],
      nombrePersona: [dataIncorporacion?.persona?.nombrePersona, Validators.required],
      primerApellidoPersona: [dataIncorporacion?.persona?.primerApellidoPersona, Validators.required],
      segundoApellidoPersona: [dataIncorporacion?.persona?.segundoApellidoPersona, Validators.required],
      ciPersona: ['', Validators.required],
      expPersona: ['', Validators.required],
      idFormacion: [undefined],
      gradoAcademicoId: [undefined],
      gradoAcademico: [''],
      areaFormacionId: [undefined],
      areaFormacion: [''],
      institucionId: [undefined],
      institucion: [''],
      gestionFormacion: [undefined],
      //conRespaldoFormacion: [undefined],
    });

    // se obtiene todos los datos de la persona
    if (dataIncorporacion?.persona?.idPersona) {
      this.getDataPersonaById(dataIncorporacion?.persona?.idPersona);
    }
    this.loadAreasFormacion();//aqui
  }

  ngOnInit(): void {
    this.loadGradosAcademico(); //esto poner arriba
    this.loadInstituciones();
  }

  /* --------------------------------------- AREA FORMACION --------------------------------------- */
  loadAreasFormacion() {
    this.areasFormacionService.getAll().subscribe((resp: RespuestaLista<AreaFormacion>) => {
      this.listAreasFormacion = resp.objetosList || [];
    })
  }

  /* --------------------------------------- GRADO ACADEMICO --------------------------------------- */
  loadGradosAcademico() {
    this.gradosAcademicoService.getAll().subscribe((resp: RespuestaLista<GradoAcademico>) => {
      this.listGradosAcademico = resp.objetosList || [];
    })
  }

  /* --------------------------------------- GRADO ACADEMICO --------------------------------------- */
  loadInstituciones() {
    this.institucionesService.getAll().subscribe((resp: RespuestaLista<Institucion>) => {
      this.listInstituciones = resp.objetosList || [];
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
      if (resp?.objeto) {
        console.log('Se registro exitosamente a la persona!!');
        this.notificationService.showSuccess('Se registro exitosamente a la persona!!!');
        console.log('datos de la persona: ', resp.objeto);
        await this.personaForm.patchValue(resp.objeto);
      } else {
        console.log('Hubo un error al registrar a a persona!!');
      }
      // guardar datos de formacion
      if (this.personaForm.get('idPersona')?.value)
        await this.saveDataFormacion();
      // guardar datos de incorporacon
      if ((this.personaForm.get('idPersona')?.value && this.dataIncorporacion.puestoNuevoId) || this.personaForm.get('idIncorporacion')?.value)
        await this.saveDataIncorporacion();

      this.dialogRef.close(this.personaForm.value);
    }
  }

  async saveDataFormacion(): Promise<void> {
    // buscar id de areaFormacion
    let areaFormacionId: number | undefined = undefined;
    let gradoAcademicoId: number | undefined = undefined;
    let institucionId: number | undefined = undefined;

    if (this.personaForm.get('areaFormacion')?.value) {
      const respAreaFormacion = await firstValueFrom(this.areasFormacionService.getByName(this.personaForm.get('areaFormacion')?.value)).catch(error => console.log(error));
      if (!!respAreaFormacion?.objeto?.idAreaFormacion) {
        console.log('asignando areaFormacionId a valores:', respAreaFormacion?.objeto?.idAreaFormacion);
        this.personaForm.patchValue({
          areaFormacionId: respAreaFormacion.objeto.idAreaFormacion,
        });
        areaFormacionId = respAreaFormacion.objeto.idAreaFormacion;
      }
    }

    if (this.personaForm.get('gradoAcademico')?.value) {
      const respGradoAcademico = await firstValueFrom(this.gradosAcademicoService.getByName(this.personaForm.get('gradoAcademico')?.value)).catch(error => console.log(error));
      if (!!respGradoAcademico?.objeto?.idGradoAcademico) {
        console.log('asignando gradoAcademicoId a valores:', respGradoAcademico?.objeto?.idGradoAcademico);
        this.personaForm.patchValue({
          gradoAcademicoId: respGradoAcademico.objeto.idGradoAcademico,
        });
        gradoAcademicoId = respGradoAcademico.objeto.idGradoAcademico;
      }
    }

    if (this.personaForm.get('institucion')?.value) {
      const respInstitucion = await firstValueFrom(this.institucionesService.getByName(this.personaForm.get('institucion')?.value)).catch(error => console.log(error));
      if (!!respInstitucion?.objeto?.idInstitucion) {
        console.log('asignando institucionId a valores:', respInstitucion?.objeto?.idInstitucion);
        this.personaForm.patchValue({
          institucionId: respInstitucion.objeto.idInstitucion,
        });
        institucionId = respInstitucion.objeto.idInstitucion;
      }
    }

    const respFormacion = await firstValueFrom(this.formacionesService.createUpdateFormacion({
      idFormacion: this.personaForm.get('idFormacion')?.value,
      personaId: this.personaForm.get('idPersona')?.value,
      institucionId: this.personaForm.get('institucionId')?.value,
      gradoAcademicoId: this.personaForm.get('gradoAcademicoId')?.value,
      areaFormacionId: areaFormacionId,
      gestionFormacion: this.personaForm.get('gestionFormacion')?.value,
    })).catch(err => console.log(err));
    if (respFormacion?.objeto) {
      console.log('se registro exitosamente');
      this.notificationService.showSuccess('Se registro exitosamente la formacion!!');
      this.personaForm.patchValue(respFormacion.objeto);
    } else {
    }
  }

  async saveDataIncorporacion(): Promise<void> {
    const respIncorporacion = await firstValueFrom(this.incorporacionesService.createUpdateIncorporacion({
      idIncorporacion: this.dataIncorporacion.idIncorporacion,
      personaId: this.personaForm.get('idPersona')?.value || this.dataIncorporacion.personaId,
      puestoNuevoId: this.dataIncorporacion.puestoNuevoId,
    })).catch(err => console.log(err));
    if (respIncorporacion?.objeto) {
      // madar mensaje exitoso
      await this.personaForm.patchValue({
        idIncorporacion: respIncorporacion.objeto.idIncorporacion,
        idPersona: respIncorporacion.objeto.personaId,
      });
      await setTimeout(() => { return true; }, 300);
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
      if (!!resp.objeto) {
        this.personaForm.patchValue(resp.objeto);
        this.getDataFormacionByPersonaId(resp.objeto.idPersona);
      }
    }, error => console.log(error));
  }

  getDataPersonaByCi(): void {
    const ci = this.personaForm.get('ciPersona')?.value;
    this.personasService.fingByCi(ci).subscribe(resp => {
      if (!!resp.objeto) {
        this.personaForm.patchValue(resp.objeto);
        this.getDataFormacionByPersonaId(resp.objeto.idPersona);
      }
    }, error => {
      console.log('Error en la suscripción:', error);
      this.notificationService.showError("No se encontro la persona");
    });
  }

  /* ------------------------------------ Datos de su formacion ----------------------------------- */
  getDataFormacionByPersonaId(idPersona: number): void {
    this.formacionesService.buscarPorPersonaId(idPersona).subscribe(resp => {
      console.log('Resp formacion para persona:', resp);
      if (!!resp.objeto)
        this.personaForm.patchValue({
          idFormacion: resp.objeto.idFormacion,
          gradoAcademicoId: resp.objeto.gradoAcademicoId,
          areaFormacionId: resp.objeto.areaFormacionId,
          institucionId: resp.objeto.institucionId,
          areaFormacion: resp.objeto.areaFormacion?.nombreAreaFormacion,
          gradoAcademico: resp.objeto.gradoAcademico?.nombreGradoAcademico,
          institucion: resp.objeto.institucion?.nombreInstitucion,
          gestionFormacion: resp.objeto.gestionFormacion,
        });
    }, error => console.log(error));
  }

}
