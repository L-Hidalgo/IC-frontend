import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NGXLogger } from "ngx-logger";
import { Title } from "@angular/platform-browser";
import { NotificationService } from "src/app/core/services/notification.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder } from "@angular/forms";
import { PuestosService } from "src/app/core/services/incorporaciones/puestos.service";
import { IncorporacionesService } from "src/app/core/services/incorporaciones/incorporaciones.service";
import { RegistroPersonaComponent } from "../registro-persona/registro-persona.component";
import { RegistroRequisitosComponent } from "../registro-requisitos/registro-requisitos.component";
import {
  EstadosIncorporacion,
  Incorporacion,
} from "src/app/shared/models/incorporaciones/incorporacion";
import { Formacion } from "src/app/shared/models/incorporaciones/formacion";
import { Persona } from "src/app/shared/models/incorporaciones/persona";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { UserService } from "src/app/core/services/incorporaciones/user.service";
import { User } from "src/app/shared/models/incorporaciones/user";
import { RespuestaLista } from "src/app/shared/models/respuesta";
import { MatSelect } from "@angular/material/select";
import { MatDateRangeInput } from "@angular/material/datepicker";
import { FormGroup, FormControl } from "@angular/forms";
import Swal from "sweetalert2";

export interface ItemForm {
  nombreForm: string;
  callback: (incId: number) => string;
  cambioItem: boolean;
  incorporacion: boolean;
  porEstado: Array<number>;
}
@Component({
  selector: "app-incorporacion-list",
  templateUrl: "./incorporacion-list.component.html",
  styleUrls: ["./incorporacion-list.component.css"],
})
export class IncorporacionListComponent implements OnInit, AfterViewInit {
  userId!: number;

  displayedColumns: string[] = [
    "idIncorporacion",
    "estado",
    "itemNuevo",
    "persona",
    "cite",
    "evaluacion",
    "cumpleRequisitos",
    "incorporacion",
    "informe",
    "notaMinuta",
    "rap",
    "memorandum",
    "acciones",
  ];

  dataSource: MatTableDataSource<
    Incorporacion & { formsDescargar?: Array<ItemForm> }
  >;

  selectedOption!: string;
  currentUser: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listUsers: Array<User> = [];

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private elementRef: ElementRef,
    private puestosService: PuestosService,
    private incorporacionesService: IncorporacionesService,
    private fb: FormBuilder,

    private logger: NGXLogger,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.dataSource = new MatTableDataSource();
    this.getListData();
    this.loadUser();
  }

  ngOnInit() {
    this.titleService.setTitle("RRHH - DDE - Incorporaciones");
    //this.logger.log('Customers loaded');
    this.notificationService.openSnackBar("Modulo Incorporaciones Cargando...");
    this.currentUser = this.authenticationService.getCurrentUser();
  }

  loadUser() {
    this.userService.getAll().subscribe((resp: RespuestaLista<User>) => {
      this.listUsers = resp.objetosList || [];
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sort({
      id: "idIncorporacion",
      start: "desc",
      disableClear: true,
    });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Filtros de incorporacion
  @ViewChild("usuarioSelect") usuarioSelect!: MatSelect;
  @ViewChild("nombrePersonaInput", { static: true })
  nombrePersonaInput!: ElementRef;
  @ViewChild("tipoIncorporacionSelect") tipoIncorporacionSelect!: MatSelect;
  @ViewChild("fechaInicio", { static: true })
  fechaInicio!: MatDateRangeInput<any>;
  @ViewChild("fechaFin", { static: true }) fechaFin!: MatDateRangeInput<any>;

  range: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  onSelectionChange() {
    const nombreCompletoPersona = this.nombrePersonaInput.nativeElement.value;
    const fechaInicioString = this.fechaInicio.value
      ? this.fechaInicio.value.start.toString()
      : null;
    const fechaFinString = this.fechaFin.value
      ? this.fechaFin.value.end.toString()
      : null;

    this.filtrosIncorporacion(
      this.usuarioSelect.value,
      nombreCompletoPersona,
      this.tipoIncorporacionSelect.value,
      fechaInicioString,
      fechaFinString
    );
  }

  onInputChange() {
    const nombreCompletoPersona = this.nombrePersonaInput.nativeElement.value;
    const fechaInicioString = this.fechaInicio.value
      ? this.fechaInicio.value.start.toString()
      : null;
    const fechaFinString = this.fechaFin.value
      ? this.fechaFin.value.end.toString()
      : null;
    this.filtrosIncorporacion(
      this.usuarioSelect.value,
      nombreCompletoPersona,
      this.tipoIncorporacionSelect.value,
      fechaInicioString,
      fechaFinString
    );
  }

  onDateChange() {
    const fechaInicioValue = this.range.get("start")?.value;
    const fechaFinValue = this.range.get("end")?.value;

    const fechaInicioString = this.range.value.start
      ? this.range.value.start.format("YYYY-MM-DD")
      : null;
    const fechaFinString = this.range.value.end
      ? this.range.value.end.format("YYYY-MM-DD")
      : null;

    if (fechaInicioString !== null && fechaFinString !== null) {
      this.filtrosIncorporacion(
        this.usuarioSelect.value,
        this.nombrePersonaInput.nativeElement.value,
        this.tipoIncorporacionSelect.value,
        fechaInicioString,
        fechaFinString
      );
    } else {
      console.error("Una de las fechas es nula.");
    }
  }

  filtrosIncorporacion(
    name: string | null,
    nombreCompletoPersona: string | null,
    tipo: string | null,
    fechaInicio: string | null,
    fechaFin: string | null
  ) {
    const filtro: {
      name: string;
      nombreCompletoPersona: string;
      tipo: string;
      fechaInicio?: string;
      fechaFin?: string;
    } = {
      name: name || "",
      nombreCompletoPersona: nombreCompletoPersona || "",
      tipo: tipo || "",
    };

    if (fechaInicio !== undefined && fechaInicio !== null) {
      filtro.fechaInicio = fechaInicio;
    }
    if (fechaFin !== undefined && fechaFin !== null) {
      filtro.fechaFin = fechaFin;
    }

    this.incorporacionesService
      .byFiltrosIncorporacion(
        filtro.name,
        filtro.nombreCompletoPersona,
        filtro.tipo,
        filtro.fechaInicio || "",
        filtro.fechaFin || ""
      )
      .subscribe(
        (resp) => {
          if (!!resp.objetosList) {
            const listWithItem = resp.objetosList.map((el) => ({
              ...el,
              puestoNuevoItem: el?.puestoNuevo?.itemPuesto,
              puestoActualItem: el?.puestoActual?.itemPuesto,
            }));

            listWithItem.sort(
              (a, b) => (b.idIncorporacion ?? 0) - (a.idIncorporacion ?? 0)
            );

            this.dataSource.data = listWithItem;
            this.dataSource._updateChangeSubscription();
            this.totalItems = resp.total || 0;
            console.log(this.dataSource.data);
          }
        },
        (error) => console.log(error)
      );
  }

  totalItems: number = 1000;
  pageSize = 10;
  pageIndex = 0;
  getListData() {
    this.incorporacionesService
      .listar("", { page: this.pageIndex + 1, limit: this.pageSize })
      .subscribe(
        (resp) => {
          if (!!resp.objetosList) {
            const listWithItem = resp.objetosList.map((el) => ({
              ...el,
              puestoNuevoItem: el?.puestoNuevo?.itemPuesto,
              puestoActualItem: el?.puestoActual?.itemPuesto,
            }));

            const filteredList = listWithItem.filter(
              (el) => el.estadoIncorporacion !== 3
            );

            this.dataSource.data = filteredList;
            this.dataSource._updateChangeSubscription();
            this.totalItems = resp.total || 0;
            console.log(this.dataSource.data);
          }
        },
        (error) => console.log(error)
      );
  }

  getDepartamentoConector(departamentoNombre: string | null): string {
    if (!departamentoNombre) {
      return "";
    }

    const firstChar = departamentoNombre.charAt(0).toUpperCase();

    if (firstChar === "D") {
      return `del ${departamentoNombre}`;
    } else if (["G", "U"].includes(firstChar)) {
      return `de la ${departamentoNombre}`;
    } else {
      return `de ${departamentoNombre}`;
    }
  }

  getGerenciaConector(gerenciaNombre: string | null): string {
    if (!gerenciaNombre) {
      return "";
    }

    const firstChar = gerenciaNombre.charAt(0).toUpperCase();

    if (firstChar === "P") {
      return `de ${gerenciaNombre}`;
    } else {
      return `de la ${gerenciaNombre}`;
    }
  }

  createNewIncorporacion(): Incorporacion {
    return {
      userId: this.currentUser.id,
      idIncorporacion: undefined,
      puestoNuevoId: undefined,
      puestoActualId: undefined,
      estadoIncorporacion: null,
      conRespaldoFormacion: null,
      observacionIncorporacion: null,
      experienciaIncorporacion: undefined,
      fchIncorporacion: undefined,
      hpIncorporacion: null,
      citeNotaMinutaIncorporacion: null,
      codigoNotaMinutaIncorporacion: null,
      fchNotaMinutaIncorporacion: undefined,
      fchRecepcionNotaIncorporacion: undefined,
      citeInformeIncorporacion: null,
      fchInformeIncorporacion: undefined,
      citeMemorandumIncorporacion: null,
      codigoMemorandumIncorporacion: null,
      fchMemorandumIncorporacion: undefined,
      citeRapIncorporacion: null,
      codigoRapIncorporacion: null,
      fchRapIncorporacion: undefined,
      user: {
        id: 0,
        name: null,
        username: null,
      },
      puestoNuevo: {
        idPuesto: 0,
        itemPuesto: undefined,
        denominacionPuesto: undefined,
        departamento: {
          idDepartamento: 0,
          nombreDepartamento: undefined,
          gerencia: {
            idGerencia: 0,
            nombreGerencia: undefined,
          },
        },
      },
      puestoActual: {
        idPuesto: 0,
        itemPuesto: undefined,
        denominacionPuesto: undefined,
        departamento: {
          idDepartamento: 0,
          nombreDepartamento: undefined,
          gerencia: {
            idGerencia: 0,
            nombreGerencia: undefined,
          },
        },
      },
      persona: {
        idPersona: 0,
        nombrePersona: undefined,
        primerApellidoPersona: undefined,
        segundoApellidoPersona: undefined,
        generoPersona: undefined,
      },
    };
  }

  agregarFila() {
    const newIncorporacion = this.createNewIncorporacion();
    this.dataSource.data.unshift(newIncorporacion);
    this.dataSource._updateChangeSubscription();
  }
  
  /* ----------------------------------------- Pagination ----------------------------------------- */
  onPaginate(ev: any) {
    console.log("Pagination Data:", ev);
  }

  /* ----------------------------------- BUSCAR PUESTO POR ITEM ----------------------------------- */
  mostrarFormularioCambioItem = false;

  buscarItemNuevo(rowIndex: number): void {
    const nuevoItemRow = this.dataSource?.data[rowIndex]?.puestoNuevoItem;
    if (nuevoItemRow) {
      this.puestosService.findPuestoByItem(nuevoItemRow).subscribe(
        (resp) => {
          if (!resp) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "El puesto no existe!!!",
            });
            return;
          }

          const puesto = resp.objeto;
          if (!puesto) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "El puesto no existe!!!",
            });
            return;
          }

          const estaOcupado = puesto.estadoId === 2 && puesto.personaActualId;
          let message: string;

          if (estaOcupado) {
            message = `Puesto: ${puesto.itemPuesto}, ${puesto.denominacionPuesto} está ocupado por ${puesto.personaActual?.nombrePersona} ${puesto.personaActual?.primerApellidoPersona} ${puesto.personaActual?.segundoApellidoPersona}`;
          } else {
            message = `Puesto: ${puesto.itemPuesto}, ${puesto.denominacionPuesto} está acéfalo`;
          }

          Swal.fire({
            icon: "info",
            title: "Información",
            text: `${message}\n¿Desea realizar un cambio de item?`,
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              this.mostrarFormularioCambioItem = true;
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              this.mostrarFormularioCambioItem = false;
            }
          });

          this.dataSource.data[rowIndex].puestoNuevoId = puesto.idPuesto;
          const incorporacion = this.dataSource.data[rowIndex];
          if (incorporacion.puestoNuevo) {
            incorporacion.puestoNuevo.itemPuesto = puesto.itemPuesto;
            incorporacion.puestoNuevo.denominacionPuesto =
              puesto.denominacionPuesto;

            if (incorporacion.puestoNuevo.departamento) {
              incorporacion.puestoNuevo.departamento.nombreDepartamento =
                puesto.departamento?.nombreDepartamento;

              if (incorporacion.puestoNuevo.departamento.gerencia) {
                incorporacion.puestoNuevo.departamento.gerencia.nombreGerencia =
                  puesto.departamento?.gerencia?.nombreGerencia;
              }
            }
          }
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error buscando puesto: " + error.message,
          });
        }
      );
    }
  }

  buscarItemActual(rowIndex: number): void {
    const actualItemRow = this.dataSource?.data[rowIndex]?.puestoActualItem;
    if (actualItemRow) {
      this.puestosService
        .findPuestoByItemActual(actualItemRow)
        .subscribe((resp) => {
          const puesto = resp.objeto;
          if (puesto) {
            console.log("puesto a cambiar:", puesto);
            // Agregar el id del puesto al registro para cuando se actualice o se cree
            this.dataSource.data[rowIndex].puestoActualId = puesto.idPuesto;
            this.dataSource.data[rowIndex].personaId = puesto.personaActualId;

            if (puesto.personaActual) {
              const personaActual = puesto.personaActual;
              this.dataSource.data[rowIndex].persona = {
                idPersona: personaActual.idPersona,
                ciPersona: personaActual.ciPersona,
                generoPersona: personaActual.generoPersona,
                nombrePersona: personaActual.nombrePersona,
                primerApellidoPersona: personaActual.primerApellidoPersona,
                segundoApellidoPersona: personaActual.segundoApellidoPersona,
              };
              this.dataSource.data[rowIndex].personaId =
                personaActual.idPersona;
            }

            const incorporacion = this.dataSource.data[rowIndex];
            if (incorporacion.puestoActual) {
              incorporacion.puestoActual.itemPuesto = puesto.itemPuesto;
              incorporacion.puestoActual.denominacionPuesto =
                puesto.denominacionPuesto;
              if (incorporacion.puestoActual.departamento) {
                incorporacion.puestoActual.departamento.nombreDepartamento =
                  puesto.departamento?.nombreDepartamento;

                if (incorporacion.puestoActual.departamento.gerencia) {
                  incorporacion.puestoActual.departamento.gerencia.nombreGerencia =
                    puesto.departamento?.gerencia?.nombreGerencia;
                }
              }
            }
            // Guardar datos
            this.sendDataIncorporacion(rowIndex);
          }
        });
    }
  }

  /* --------------------------------------- BUSCAR PERSONA --------------------------------------- */
  abrirModalRegistroPersona(rowIndex: number): void {
    const personaData = this.dataSource?.data[rowIndex];

    const dialogRef = this.dialog.open(RegistroPersonaComponent, {
      width: "550px",
      height: "auto",
      data: personaData,
    });

    dialogRef
      .afterClosed()
      .subscribe(async (result: Persona & Formacion & Incorporacion) => {
        this.dataSource.data[rowIndex].persona = {
          idPersona: result.idPersona,
          ciPersona: result.ciPersona,
          generoPersona: result.generoPersona,
          nombrePersona: result.nombrePersona,
          primerApellidoPersona: result.primerApellidoPersona,
          segundoApellidoPersona: result.segundoApellidoPersona,
        };
        this.dataSource.data[rowIndex].personaId = result.idPersona;
        this.dataSource.data[rowIndex].idIncorporacion = result.idIncorporacion;
        const incorporacion = this.dataSource.data[rowIndex];
        if (incorporacion.persona) {
          incorporacion.persona.generoPersona = result.generoPersona;
          incorporacion.persona.nombrePersona = result.nombrePersona;
          incorporacion.persona.primerApellidoPersona =
            result.primerApellidoPersona;
          incorporacion.persona.segundoApellidoPersona =
            result.segundoApellidoPersona;
        }

        await this.dataSource._updateChangeSubscription();
        // Guardar incorporacion
        this.sendDataIncorporacion(rowIndex);
        console.log("El diálogo se cerró", result);
        //this.actualizarVistaOPage();
      });
  }

  sendDataIncorporacion(rowIndex: number) {
    const data = this.dataSource.data[rowIndex];
    setTimeout(() => {
      this.incorporacionesService
        .createUpdateIncorporacion({
          userId: this.currentUser.id,
          idIncorporacion: data.idIncorporacion,
          puestoNuevoId: data.puestoNuevoId,
          puestoActualId: data.puestoActualId,
          personaId: data.personaId,
          estadoIncorporacion: data.estadoIncorporacion,
          conRespaldoFormacion: data.conRespaldoFormacion,
          observacionIncorporacion: data.observacionIncorporacion,
          experienciaIncorporacion: data.experienciaIncorporacion,

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
              this.dataSource.data[rowIndex].idIncorporacion =
                resp.objeto.idIncorporacion;
              this.dataSource.data[rowIndex].estadoIncorporacion =
                resp.objeto.estadoIncorporacion;
              this.dataSource.data[rowIndex].observacionIncorporacion =
                resp.objeto.observacionIncorporacion;
              this.dataSource.data[rowIndex].puestoNuevoId =
                resp.objeto.puestoNuevoId;
              this.dataSource.data[rowIndex].puestoActualId =
                resp.objeto.puestoActualId;
              this.dataSource.data[rowIndex].codigoNotaMinutaIncorporacion =
                resp.objeto.codigoNotaMinutaIncorporacion;
              this.dataSource.data[rowIndex].codigoMemorandumIncorporacion =
                resp.objeto.codigoMemorandumIncorporacion;
              this.dataSource.data[rowIndex].codigoRapIncorporacion =
                resp.objeto.codigoRapIncorporacion;
              this.dataSource.data[rowIndex].estadoIncorporacion =
                resp.objeto.estadoIncorporacion;

              if (
                !!resp.objeto &&
                !!resp.objeto.user &&
                !!resp.objeto.user.username
              ) {
                this.dataSource.data[rowIndex].user!.username =
                  resp.objeto.user.username;
              }

              this.notificationService.showSuccess(
                "Datos registrados exitosamente!!"
              );
            }
          },
          (error) => {
            console.log("Error al actualizar la incorporación:", error);
            this.notificationService.showError(
              "Error al registrar los datos. Por favor, inténtalo de nuevo."
            );
          }
        );
    }, 300);
  }

  /* ------------------------------------- REGISTRAR REQUISIRO ------------------------------------ */
  abrirModalRegistroRequisitos(rowIndex: number): void {
    const data = this.dataSource.data[rowIndex];
    const dialogRef = this.dialog.open(RegistroRequisitosComponent, {
      width: "800px",
      data: {
        idIncorporacion: data.idIncorporacion,
        puestoNuevoId: data.puestoNuevoId,
        personaId: data.personaId,
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
            | "cumpleExpProfesionalIncorporacion"
            | "cumpleExpEspecificaIncorporacion"
            | "cumpleExpMandoIncorporacion"
            | "cumpleFormacionIncorporacion"
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
  eliminarFila(rowIndex: number): void {
    const idIncorporacion = this.dataSource.data[rowIndex]?.idIncorporacion;
    if (idIncorporacion) {
      this.incorporacionesService
        .darBajaIncorporacion(idIncorporacion)
        .subscribe(
          (respuesta) => {
            this.notificationService.showSuccess(
              "Se eliminó el registro correctamente."
            );
            this.dataSource.data.splice(rowIndex, 1);
            this.dataSource._updateChangeSubscription();
          },
          (error) => {
            this.notificationService.showError(
              "Error al eliminar el registro. Por favor, inténtalo de nuevo."
            );
          }
        );
    } else {
      console.error(
        "No se pudo obtener el id de incorporación para la fila especificada."
      );
    }
  }
  /*                                      Descargar Formularios                                     */
  /* ---------------------------------------------------------------------------------------------- */
  listForms: Array<ItemForm> = [
    {
      nombreForm: "R-0078",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlFormularioEvalR0078(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: "R-1401",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlFormularioEvalR1401(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        // EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: "R-0980",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlR0980(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [EstadosIncorporacion.CON_REGISTRO],
    },
    {
      nombreForm: "Inf.conNota",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlInfNota(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        // EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: "Inf.conMinuta",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlInfMinuta(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        // EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: "Memorandum",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlMemo(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: "RAP",
      callback: (incId: number) => this.incorporacionesService.genUrlRAP(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: "Act-Entrega",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlActEntrega(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: "Act-Posecion",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlActPosecion(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: "R-0716",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlR0716(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: "R-0921",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlR0921(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [
        EstadosIncorporacion.SIN_REGISTRO,
        EstadosIncorporacion.CON_REGISTRO,
      ],
    },
    {
      nombreForm: "R-0976",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlR0976(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [EstadosIncorporacion.CON_REGISTRO],
    },
    {
      nombreForm: "R-SGC-0033",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlRSGC0033(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [EstadosIncorporacion.CON_REGISTRO],
    },
    {
      nombreForm: "R-0980",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlR0980(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [EstadosIncorporacion.CON_REGISTRO],
    },
    {
      nombreForm: "R-1023",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlR1023(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [EstadosIncorporacion.CON_REGISTRO],
    },
    {
      nombreForm: "R-1129",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlR1129(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [EstadosIncorporacion.CON_REGISTRO],
    },
    {
      nombreForm: "R-1401",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlR1401(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [EstadosIncorporacion.CON_REGISTRO],
    },
    //Form cambio item
    {
      nombreForm: "R-1023",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlR1023(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [EstadosIncorporacion.CON_REGISTRO],
    },
    {
      nombreForm: "R-1129",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlR1129(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [EstadosIncorporacion.CON_REGISTRO],
    },
    {
      nombreForm: "R-1401",
      callback: (incId: number) =>
        this.incorporacionesService.genUrlR1401(incId),
      cambioItem: false,
      incorporacion: true,
      porEstado: [EstadosIncorporacion.CON_REGISTRO],
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

  onDownloadForms(rowIndex: number, formNombres: string[]) {
    const data = this.dataSource.data[rowIndex];
    if (
      typeof data.idIncorporacion === "number" ||
      data.idIncorporacion === undefined
    ) {
      formNombres.forEach((formNombre) => {
        const form = this.listForms.find(
          (form) => form.nombreForm === formNombre
        );
        if (form) {
          const url = form.callback(data.idIncorporacion ?? -1);
          window.open(url, "_blank");
        }
      });
    }
  }
}
