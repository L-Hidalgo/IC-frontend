import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegistroPersonaComponent } from '../registro-persona/registro-persona.component';
import { RegistroRequisitosComponent } from '../registro-requisitos/registro-requisitos.component';
import { EstadosIncorporacion, Incorporacion } from '../incorporacion';
import { PuestosService } from 'src/app/services/incorporaciones/puestos.service';
import Swal from 'sweetalert2';
import { Formacion } from 'src/app/models/incorporaciones/formacion';
import { Persona } from 'src/app/models/incorporaciones/persona';
import { IncorporacionesService } from 'src/app/services/incorporaciones/incorporaciones.service';

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
    'acciones',
    'itemNuevo',
    'itemActual',
    'persona',
    'responsable',
    'estado',
    'cumpleRequisitos',
    'notaMinuta',
    'informe',
    'memorandum',
    'rap',
    'eliminar',
  ];

  selectedOption!: string;

  itemNuevoFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^(20000|[1-9]\\d{0,4})$'),
  ]);

  itemActualFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^(20000|[1-9]\\d{0,4})$'),
  ]);

  dataSource: MatTableDataSource<
    Incorporacion & { formsDescargar?: Array<ItemForm> }
  >;
  totalItems: number = 10; // Total de elementos en el servidor
  pageSize = 10; // Número de elementos por página
  pageIndex = 0; // Índice de la página actual

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; // Obtener la referencia al paginador
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    // this.paginator.pa
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(
    private dialog: MatDialog,
    private elementRef: ElementRef,
    private puestosService: PuestosService,
    private incorporacionesService: IncorporacionesService,
    private fb: FormBuilder
  ) {
    // const incorporacionesData: Incorporacion[] = Array.from({ length: 10 }, (_, k) => this.createNewIncorporacion());
    this.dataSource = new MatTableDataSource();
    this.getListData();
    // this.incorporacionesFormArray = incorporacionesData.map(incorporacion => this.createIncorporacionFormGroup(incorporacion));
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
          }
        },
        (error) => console.log(error)
      );
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const tdElement = this.elementRef.nativeElement.querySelector(
      '.example-form-persona'
    );
  }

  createNewIncorporacion(): Incorporacion {
    return {
      idIncorporacion: undefined,
      puestoNuevoId: undefined,
      estadoIncorporacion: null,
      // cumpleRequisitos: false,
      // Nota minuta
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
    // const newFormGroup = this.createIncorporacionFormGroup(newIncorporacion);
    this.dataSource.data.unshift(newIncorporacion);
    // this.incorporacionesFormArray.push(newFormGroup);
    this.dataSource._updateChangeSubscription();
  }

  eliminarFila(index: number) {
    this.dataSource.data.splice(index, 1);
    // recuperar el dato y si ya estaba en la db dar de baja
    // this.incorporacionesFormArray.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  /* ----------------------------------------- Pagination ----------------------------------------- */
  onPaginate(ev: any) {
    console.log('Pagination Data:', ev);
  }

  /* ----------------------------------- BUSCAR PUESTO POR ITEM ----------------------------------- */
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
  }

  buscarItemCambio(rowIndex: number): void {}

  /* --------------------------------------- BUSCAR PERSONA --------------------------------------- */
  abrirModalRegistroPersona(rowIndex: number): void {
    const personaData = this.dataSource?.data[rowIndex];

    const dialogRef = this.dialog.open(RegistroPersonaComponent, {
      width: '1000px',
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
        this.dataSource.data[rowIndex].fchIncorporacion =
          result.fchIncorporacion;
        this.dataSource.data[rowIndex].hpIncorporacion = result.hpIncorporacion;
        this.dataSource.data[rowIndex].observacionIncorporacion =
          result.observacionIncorporacion;
        await this.dataSource._updateChangeSubscription();
        // Guardar incorporacion
        this.sendDataIncorporacion(rowIndex);
        console.log('El diálogo se cerró', result);
      });
  }

  sendDataIncorporacion(rowIndex: number) {
    const data = this.dataSource.data[rowIndex];
    this.incorporacionesService
      .createUpdateIncorporacion({
        idIncorporacion: data.idIncorporacion,
        puestoNuevoId: data.puestoNuevoId,
        personaId: data.personaId,
        // estadoIncorporacion: data.estadoIncorporacion,
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
            // actualizado correctamente
            console.log('creado o actualizado exitosamente');
          }
        },
        (error) => console.log(error)
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
        // si cumple los rewquisitos,
        cumpleExpProfesionalIncorporacion:
          data.cumpleExpProfesionalIncorporacion,
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
          this.dataSource.data[rowIndex].cumpleExpProfesionalIncorporacion =
            result.cumpleExpProfesionalIncorporacion;
          this.dataSource.data[rowIndex].cumpleExpEspecificaIncorporacion =
            result.cumpleExpEspecificaIncorporacion;
          this.dataSource.data[rowIndex].cumpleExpMandoIncorporacion =
            result.cumpleExpMandoIncorporacion;
          this.dataSource.data[rowIndex].cumpleFormacionIncorporacion =
            result.cumpleFormacionIncorporacion;
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
      nombreForm: 'Inf. con Nota',
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
        // EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'Act. Entrega',
      callback: (incId: number) => this.incorporacionesService.genUrlActEntrega(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        // EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'Act. Posecion',
      callback: (incId: number) => this.incorporacionesService.genUrlActPosecion(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        // EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'R-0716',
      callback: (incId: number) => this.incorporacionesService.genUrlR0716(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        // EstadosIncorporacion.SIN_REGISTRO,
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
        // EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: 'R-SGC-0033',
      callback: (incId: number) => this.incorporacionesService.genUrlRSGC0033(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        // EstadosIncorporacion.SIN_REGISTRO,
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

  onDownloadForms(rowIndex: number) {
    const data = this.dataSource.data[rowIndex];
    if (typeof data.idIncorporacion === 'number') {
      const urls = data?.formsDescargar?.map((form) => {
        const url = form.callback(data.idIncorporacion || -1);
        window.open(url, '_blank');
        return url;
      });
      console.log('Urls to open and downloads forms:', urls);
    }

  }
}
