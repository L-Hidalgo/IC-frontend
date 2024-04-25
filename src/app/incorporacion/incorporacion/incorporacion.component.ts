import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegistroPersonaComponent } from '../registro-persona/registro-persona.component';
import { RegistroResponsableComponent } from '../registro-responsable/registro-responsable.component';
import { RegistroRequisitosComponent } from '../registro-requisitos/registro-requisitos.component';
import { EstadosIncorporacion, Incorporacion } from '../incorporacion';
import { PuestosService } from 'src/app/services/incorporaciones/puestos.service';
import Swal from 'sweetalert2';
import { Formacion } from 'src/app/models/incorporaciones/formacion';
import { Persona } from 'src/app/models/incorporaciones/persona';
import { IncorporacionesService } from 'src/app/services/incorporaciones/incorporaciones.service';
import { NotificationService } from 'src/app/services/incorporaciones/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface ItemForm {
  nombreForm: string;
  callback: (incId: number) => string;
  cambioItem: boolean;
  incorporacion: boolean;
  porEstado: Array<number>;
}

@Component({
  selector: 'app-incorporacion',
  templateUrl: './incorporacion.component.html',
  styleUrls: ['./incorporacion.component.scss'],
})
export class IncorporacionComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'idIncorporacion',
    'estado',
    'itemNuevo',
    'persona',
    'cite',
    'evaluacion',
    'cumpleRequisitos',
    'notaMinuta',
    'informe',
    'memorandum',
    'rap',
    'acciones',
  ];

  dataSource: MatTableDataSource<Incorporacion & { formsDescargar?: Array<ItemForm> }>;

  selectedOption!: string;

  //@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private elementRef: ElementRef,
    private puestosService: PuestosService,
    private incorporacionesService: IncorporacionesService,
    private fb: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource();
    this.getListData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    /*const tdElement = this.elementRef.nativeElement.querySelector(
      '.example-form-persona'
    );*/

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  totalItems: number = 10; // Total de elementos en el servidor
  pageSize = 10; // Número de elementos por página
  pageIndex = 0; // Índice de la página actual

  BuscarPorNombreIncorporacion(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const personaFullName = `${data.persona?.nombrePersona || ''} ${data.persona?.primerApellidoPersona || ''} ${data.persona?.segundoApellidoPersona || ''}`.toLowerCase();
      return personaFullName.includes(filter);
    };

    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getListData() {
    this.incorporacionesService
      .listar('', {
        page: this.pageIndex + 1,
        limit: this.pageSize,
      })
      .subscribe(
        (resp) => {
          if (!!resp.objetosList) {
            const listWithItem = resp.objetosList.map((el) => ({
              ...el,
              puestoNuevoItem: el?.puestoNuevo?.itemPuesto,
            }));
            this.dataSource.data = listWithItem;
            this.dataSource._updateChangeSubscription();
            this.totalItems = resp.total || 0;
            console.log(this.dataSource.data);

          }
        },
        (error) => console.log(error)
      );
  }

  getDepartmentDescription(departmentName: string): string {
    const firstChar = departmentName.charAt(0).toUpperCase();

    if (firstChar === "D") {
      return `del ${departmentName}`;
    } else if (["G", "A", "U", "P"].includes(firstChar)) {
      return `de la ${departmentName}`;
    } else {
      return `de ${departmentName}`;
    }
  }

  createNewIncorporacion(): Incorporacion {
    return {
      idIncorporacion: undefined,
      puestoNuevoId: undefined,
      puestoActualId: undefined,
      estadoIncorporacion: null,
      // cumpleRequisitos: false,
      conRespaldoFormacion: null,
      observacionIncorporacion: null,
      // Nota minuta
      fchIncorporacion: undefined,
      hpIncorporacion: null,
      citeNotaMinutaIncorporacion: null,
      codigoNotaMinutaIncorporacion: null,
      fchNotaMinutaIncorporacion: undefined,
      fchRecepcionNotaIncorporacion: undefined,
      // Informe
      citeInformeIncorporacion: null,
      fchInformeIncorporacion: undefined,
      // Memorandum
      citeMemorandumIncorporacion: null,
      codigoMemorandumIncorporacion: null,
      fchMemorandumIncorporacion: undefined,
      // Rap
      citeRapIncorporacion: null,
      codigoRapIncorporacion: null,
      fchRapIncorporacion: undefined,
    };
  }


  agregarFila() {
    const newIncorporacion = this.createNewIncorporacion();
    this.dataSource.data.unshift(newIncorporacion);
    this.dataSource._updateChangeSubscription();
  }

  eliminarFila(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  /* ----------------------------------------- Pagination ----------------------------------------- */
  onPaginate(ev: any) {
    console.log('Pagination Data:', ev);
  }

  /* ----------------------------------- BUSCAR PUESTO POR ITEM ----------------------------------- */
  /*buscarItemNuevo(rowIndex: number): void {
    const nuevoItemRow = this.dataSource?.data[rowIndex]?.puestoNuevoItem;
    if (nuevoItemRow) {
      this.puestosService.findPuestoByItem(nuevoItemRow).subscribe(
        (resp) => {
          const puesto = resp.objeto;
          if (!puesto) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El puesto no existe!!!',
            });
          } else {
            const estaOcupado = !!puesto.personaActual?.idPersona;
            const message = `Puesto: ${puesto.itemPuesto}, ${
              puesto.denominacionPuesto
            } ${
              estaOcupado
                ? `está ocupado por ${puesto.personaActual?.nombrePersona} ${puesto.personaActual?.primerApellidoPersona} ${puesto.personaActual?.segundoApellidoPersona}`
                : 'está acefalo'
            }`;
            Swal.fire({
              icon: 'info',
              title: 'Información',
              text: message,
            });
            // Agregar el id del puesto al registro para cuando se actualice o se cree
            this.dataSource.data[rowIndex].puestoNuevoId = puesto.idPuesto;
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error buscando puesto: ' + error,
          });
        }
      );
    }
  }*/
  mostrarFormularioCambioItem = false;

  buscarItemNuevo(rowIndex: number): void {
    const nuevoItemRow = this.dataSource?.data[rowIndex]?.puestoNuevoItem;
    if (nuevoItemRow) {
      this.puestosService.findPuestoByItem(nuevoItemRow).subscribe(
        (resp) => {
          const puesto = resp.objeto;
          if (!puesto) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'El puesto no existe!!!',
            });
          } else {
            const estaOcupado = !!puesto.personaActual?.idPersona;
            const message = `Puesto: ${puesto.itemPuesto}, ${puesto.denominacionPuesto
              } ${estaOcupado
                ? `está ocupado por ${puesto.personaActual?.nombrePersona} ${puesto.personaActual?.primerApellidoPersona} ${puesto.personaActual?.segundoApellidoPersona}`
                : 'está acefalo'
              }`;

            // Mostrar el cuadro de diálogo con el mensaje modificado y los botones "Si" y "No"
            Swal.fire({
              icon: 'info',
              title: 'Información',
              text: message + '\n¿Desea realizar un cambio de item?',
              showCancelButton: true,
              confirmButtonText: 'Sí',
              cancelButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                this.mostrarFormularioCambioItem = true;
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                this.mostrarFormularioCambioItem = false;
              }
            });

            // Agregar el id del puesto al registro para cuando se actualice o se cree
            this.dataSource.data[rowIndex].puestoNuevoId = puesto.idPuesto;
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error buscando puesto: ' + error,
          });
        }
      );
    }
  }

  buscarItemActual(rowIndex: number): void {
    const actualItemRow = this.dataSource?.data[rowIndex]?.puestoActualItem;
    if (actualItemRow) {
      this.puestosService.findPuestoByItemActual(actualItemRow).subscribe(
        (resp) => {
          const puesto = resp.objeto;
          if (puesto) {
            // Agregar el id del puesto al registro para cuando se actualice o se cree
            this.dataSource.data[rowIndex].puestoActualId = puesto.idPuesto;
          }
        }
      );
    }
  }

  /* --------------------------------------- BUSCAR PERSONA --------------------------------------- */
  abrirModalRegistroPersona(rowIndex: number): void {
    const personaData = this.dataSource?.data[rowIndex];

    const dialogRef = this.dialog.open(RegistroPersonaComponent, {
      width: '500px',
      height: 'auto',
      data: personaData,
    });

    dialogRef
      .afterClosed()
      .subscribe(async (result: Persona & Formacion & Incorporacion) => {
        this.dataSource.data[rowIndex].persona = {
          idPersona: result.idPersona,
          nombrePersona: result.nombrePersona,
          primerApellidoPersona: result.primerApellidoPersona,
          segundoApellidoPersona: result.segundoApellidoPersona,
        };
        this.dataSource.data[rowIndex].personaId = result.idPersona;
        this.dataSource.data[rowIndex].idIncorporacion = result.idIncorporacion;
        //this.dataSource.data[rowIndex].fchIncorporacion = result.fchIncorporacion;
        //this.dataSource.data[rowIndex].hpIncorporacion = result.hpIncorporacion;
        //this.dataSource.data[rowIndex].observacionIncorporacion =result.observacionIncorporacion;
        await this.dataSource._updateChangeSubscription();
        // Guardar incorporacion
        this.sendDataIncorporacion(rowIndex);
        console.log('El diálogo se cerró', result);
        //this.actualizarVistaOPage();
      });
  }


  actualizarVistaOPage() {
    window.location.reload();
  }

  sendDataIncorporacion(rowIndex: number) {
    const data = this.dataSource.data[rowIndex];
    this.incorporacionesService
      .createUpdateIncorporacion({
        idIncorporacion: data.idIncorporacion,
        puestoNuevoId: data.puestoNuevoId,
        puestoActualId: data.puestoActualId,
        personaId: data.personaId,
        conRespaldoFormacion: data.conRespaldoFormacion,
        observacionIncorporacion: data.observacionIncorporacion,

        fchIncorporacion: data.fchIncorporacion,
        hpIncorporacion: data.hpIncorporacion,
        citeNotaMinutaIncorporacion: data.citeNotaMinutaIncorporacion,
        codigoNotaMinutaIncorporacion: data.codigoNotaMinutaIncorporacion,
        fchNotaMinutaIncorporacion: data.fchNotaMinutaIncorporacion,
        fchRecepcionNotaIncorporacion: data.fchRecepcionNotaIncorporacion,

        citeInformeIncorporacion: data.citeInformeIncorporacion,
        fchInformeIncorporacion: data.fchInformeIncorporacion,

        citeMemorandumIncorporacion: data.citeMemorandumIncorporacion,
        codigoMemorandumIncorporacion: data.codigoMemorandumIncorporacion,
        fchMemorandumIncorporacion: data.fchMemorandumIncorporacion,

        citeRapIncorporacion: data.citeRapIncorporacion,
        codigoRapIncorporacion: data.codigoRapIncorporacion,
        fchRapIncorporacion: data.fchRapIncorporacion,

      })
      .subscribe(
        (resp) => {
          if (!!resp.objeto) {
            console.log('Se actualizo exitosamente la incorporacion');
            this.notificationService.showSuccess('Datos registrados exitosamente!!');
          }
        },
        (error) => {
          console.log('Error al actualizar la incorporación:', error);
          this.notificationService.showError('Error al registrar los datos. Por favor, inténtalo de nuevo.');
        }
      );
  }

  /* ------------------------------------- REGISTRAR REQUISIRO ------------------------------------ */
  abrirModalRegistroRequisitos(rowIndex: number): void {
    const data = this.dataSource.data[rowIndex];
    const dialogRef = this.dialog.open(RegistroRequisitosComponent, {
      width: '800px',
      data: {
        idIncorporacion: data.idIncorporacion,
        puestoNuevoId: data.puestoNuevoId,
        personaId: data.personaId,
        // si cumple los rewquisitos,
        cumpleExpProfesionalIncorporacion: data.cumpleExpProfesionalIncorporacion,
        cumpleExpEspecificaIncorporacion: data.cumpleExpEspecificaIncorporacion,
        cumpleExpMandoIncorporacion: data.cumpleExpMandoIncorporacion,
        cumpleFormacionIncorporacion: data.cumpleFormacionIncorporacion,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe(
        (
          result: Pick<
            Incorporacion,
            | 'cumpleExpProfesionalIncorporacion'
            | 'cumpleExpEspecificaIncorporacion'
            | 'cumpleExpMandoIncorporacion'
            | 'cumpleFormacionIncorporacion'
          >
        ) => {
          this.dataSource.data[rowIndex].cumpleExpProfesionalIncorporacion = result.cumpleExpProfesionalIncorporacion;
          this.dataSource.data[rowIndex].cumpleExpEspecificaIncorporacion = result.cumpleExpEspecificaIncorporacion;
          this.dataSource.data[rowIndex].cumpleExpMandoIncorporacion = result.cumpleExpMandoIncorporacion;
          this.dataSource.data[rowIndex].cumpleFormacionIncorporacion = result.cumpleFormacionIncorporacion;
          this.dataSource._updateChangeSubscription();
        }
      );
  }

  /* ---------------------------------------------------------------------------------------------- */
  /*                                      Descargar Formularios                                     */
  /* ---------------------------------------------------------------------------------------------- */


  listForms: Array<ItemForm> = [
    {
      nombreForm: 'R-0078',
      callback: (incId: number) => this.incorporacionesService.genUrlFormularioEvalR0078(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'R-1401',
      callback: (incId: number) => this.incorporacionesService.genUrlFormularioEvalR1401(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        // EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'Inf.conNota',
      callback: (incId: number) => this.incorporacionesService.genUrlInfNota(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        // EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'Memorandum',
      callback: (incId: number) => this.incorporacionesService.genUrlMemo(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'RAP',
      callback: (incId: number) => this.incorporacionesService.genUrlRAP(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'Act-Entrega',
      callback: (incId: number) => this.incorporacionesService.genUrlActEntrega(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'Act-Posecion',
      callback: (incId: number) => this.incorporacionesService.genUrlActPosecion(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'R-0716',
      callback: (incId: number) => this.incorporacionesService.genUrlR0716(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'R-0921',
      callback: (incId: number) => this.incorporacionesService.genUrlR0921(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'R-0976',
      callback: (incId: number) => this.incorporacionesService.genUrlR0976(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'R-SGC-0033',
      callback: (incId: number) => this.incorporacionesService.genUrlRSGC0033(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
  ];

  filterFormularios(incorporacion: Incorporacion) {
    return this.listForms.filter((form) => {
      return (
        (!!incorporacion.puestoActualId
          ? form.cambioItem
          : form.incorporacion) &&
        form.porEstado.includes(incorporacion.estadoIncorporacion || -1)
      );
    });
  }

  /*onDownloadForms(rowIndex: number) {
    const data = this.dataSource.data[rowIndex];
    if (typeof data.idIncorporacion === 'number') {
      const urls = data?.formsDescargar?.map((form) => {
        const url = form.callback(data.idIncorporacion || -1);
        window.open(url, '_blank');
        return url;
      });
      console.log('Urls to open and downloads forms:', urls);
    }
  }*/
  onDownloadForms(rowIndex: number, formNombres: string[]) {
    const data = this.dataSource.data[rowIndex];
    if (typeof data.idIncorporacion === 'number' || data.idIncorporacion === undefined) {
      formNombres.forEach(formNombre => {
        const form = this.listForms.find(form => form.nombreForm === formNombre);
        if (form) {
          const url = form.callback(data.idIncorporacion ?? -1);
          window.open(url, '_blank');
        }
      });
    }
  }


}
