import { AfterViewInit, Component, ViewChild, ElementRef } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Interinato } from "src/app/shared/models/incorporaciones/interinato";
import { InterinatoService } from "src/app/core/services/incorporaciones/interinato.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { Title } from "@angular/platform-browser";
import { RegistroDialogInterinatoComponent } from "../registro-dialog-interinato/registro-dialog-interinato.component";
import { MatDialog } from "@angular/material/dialog";
import { EditarInterinatoComponent } from "../editar-interinato/editar-interinato.component";
import Swal from 'sweetalert2';

@Component({
  selector: "app-interinatos",
  templateUrl: "./interinatos.component.html",
  styleUrls: ["./interinatos.component.css"],
})
export class InterinatosComponent implements AfterViewInit {
  displayedColumns: string[] = [
    "id",
    "persona",
    "puestoDestino",
    "puestoActual",
    "fchInicioInterinato",
    "fchFinInterinato",
    "acciones",
  ];

  dataSource: MatTableDataSource<Interinato>;
  pageSizeOptions = [5, 10, 25, 100];
  pageSize = 5;
  pageIndex = 0;
  length = 0;
  rangeLabel = "";

  mostrarFiltros: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild("puestoPersona", { static: false }) puestoPersona!: ElementRef;

  constructor(
    private interinatoService: InterinatoService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Interinato>();
  }

  ngAfterViewInit() {
    this.getListDataInterinatos();
  }

  getListDataInterinatos(): void {
    const paginationOptions = {
      page: this.pageIndex + 1,
      limit: this.pageSize,
    };
    this.interinatoService.listarInterinatos("", paginationOptions).subscribe(
      (resp: any) => {
        if (resp.objetosList) {
          this.dataSource.data = resp.objetosList;
          this.length = resp.total || 0;
          this.updateRangeLabel();

          setTimeout(() => {
            if (this.paginator) {
              this.paginator.firstPage();
            }
          }, 0);
        }
      },
      (error: any) => {
        console.error("Error al obtener la lista de interinatos:", error);
      }
    );
  }

  updateRangeLabel() {
    const startIndex = this.pageIndex * this.pageSize + 1;
    const endIndex = Math.min(
      (this.pageIndex + 1) * this.pageSize,
      this.length
    );
    this.rangeLabel = `${startIndex} - ${endIndex} de ${this.length}`;
  }

  onPreviousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.getListDataInterinatos();
      this.byFiltrosInterinato();
    }
  }

  onNextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.length) {
      this.pageIndex++;
      this.getListDataInterinatos();
      this.byFiltrosInterinato();
    }
  }

  onPageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.pageIndex = 0;
    this.getListDataInterinatos();
    this.byFiltrosInterinato();
  }

  byFiltrosInterinato() {
    const puestoPersona = this.puestoPersona.nativeElement.value;
    const paginationOptions = {
      page: this.pageIndex + 1,
      limit: this.pageSize,
    };
    if (this.interinatoService) {
      this.interinatoService
        .byFiltrosInterinato(puestoPersona, paginationOptions)
        .subscribe(
          (resp: any) => {
            if (resp.objetosList) {
              this.dataSource.data = resp.objetosList;
              this.length = resp.total || 0;
              this.updateRangeLabel();

              setTimeout(() => {
                if (this.paginator) {
                  this.paginator.firstPage();
                }
              }, 0);
            }
          },
          (error) => {
            console.error(
              "Error al obtener la lista de puestos y personas:",
              error
            );
          }
        );
    } else {
      console.error("interinatoService no está inyectado correctamente.");
    }
  }

  transformarFecha(fecha: string): string {
    if (!fecha) return "";

    const dateParts = fecha.split("-");
    if (dateParts.length !== 3) return fecha;

    const year = dateParts[0];
    const month = this.getMonthName(parseInt(dateParts[1], 10));
    const day = parseInt(dateParts[2], 10);

    return `${day} de ${month} de ${year}`;
  }

  private getMonthName(month: number): string {
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    return months[month - 1] || "";
  }

  obtenerValorInput(): string {
    if (this.puestoPersona && this.puestoPersona.nativeElement) {
      return this.puestoPersona.nativeElement.value;
    }
    return "";
  }

  openDialogInterinato(): void {
    const dialogRef = this.dialog.open(RegistroDialogInterinatoComponent, {
      width: '400px',
      data: {},
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Modal cerrado', result);
    });
  }

  openModalEditarInterinato(idInterinato: number): void {
    this.interinatoService.getInterinato(idInterinato).subscribe((interinato) => {
      const dialogRef = this.dialog.open(EditarInterinatoComponent, {
        width: "600px",
        data: { interinato },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log("El modal ha sido cerrado");
      });
    });
  }
}
