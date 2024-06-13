import { Component, AfterViewInit, ViewChild, OnDestroy } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "src/app/core/services/incorporaciones/user.service";
import { User } from "src/app/shared/models/incorporaciones/user";
import { MatDialog } from "@angular/material/dialog";
import { EditRolUserComponent } from "../edit-rol-user/edit-rol-user.component";
import { NotificationService } from "src/app/core/services/notification.service";
import { Title } from "@angular/platform-browser";
import { AuthenticationService } from "src/app/core/services/auth.service";
import Swal from "sweetalert2";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AdministracionService } from "src/app/core/services/incorporaciones/administracion.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-administracion-list",
  templateUrl: "./administracion-list.component.html",
  styleUrls: ["./administracion-list.component.css"],
})
export class AdministracionListComponent implements AfterViewInit {
  userName: string = "";
  userCi: string = "";
  rolName: string = "";

  displayedColumns: string[] = ["id", "name", "email", "rol", "accion"];

  dataSource: MatTableDataSource<User>;

  adminList: User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private notificationService: NotificationService,
    private administracionService: AdministracionService,
    public authService: AuthenticationService,
    private userService: UserService,
    public dialog: MatDialog,
    private titleService: Title,
    private sanitizer: DomSanitizer
  ) {
    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit() {
    this.titleService.setTitle("RRHH - DDE - Administracion");
    this.notificationService.openSnackBar(
      "Modulo de Administracion Cargando..."
    );
    this.getListData();
    const user = this.authService.getCurrentUser();
    this.userName = user.fullName;
    this.userCi = user.ci;
    this.rolName = user.role;

    this.getImagenUserPersona();
    this.obtenerDetallesItems();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getListData();
  }

  //filtro que busca por el name del user
  applyFilter(event: any) {
    const name = event.target.value;
    if (name.trim() !== "") {
      this.userService.byNameUser(name).subscribe(
        (resp) => {
          if (!!resp.objetosList) {
            this.dataSource.data = resp.objetosList.map((el: any) => ({
              ...el,
            }));
          }
        },
        (error) => console.log(error)
      );
    } else {
      this.getListData();
    }
  }

  //muestra la lista de usuarios
  getListData(): void {
    this.userService.getAllUser("").subscribe(
      (resp) => {
        if (!!resp.objetosList) {
          this.dataSource.data = resp.objetosList.map((el: any) => ({ ...el }));
        }
      },
      (error) => console.log(error)
    );
  }

  //abre modal de roles
  abrirModalEditRolUser(rowIndex: number): void {
    const userRolData = this.dataSource?.data[rowIndex];
    const dialogRef = this.dialog.open(EditRolUserComponent, {
      width: "500px",
      height: "auto",
      data: {
        userId: userRolData.id,
        nombrePersona: userRolData.name,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getListData(); 
    });
  }

  //imagenes
  //datos de la imagen
  uploading: boolean = false;
  fileName!: string;
  fileSize!: string;
  selectedFile: File | null = null;
  private unsubscribe$ = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];
    this.selectedFile = selectedFile;
    this.fileName = selectedFile.name;
    this.fileSize = this.convertBytes(selectedFile.size);
  }

  onUpload() {
    if (this.selectedFile) {
      this.uploading = true;
      this.administracionService
        .uploadZip(this.selectedFile)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (response) => {
            this.uploading = false;
            Swal.fire({
              icon: "success",
              title: "¡Archivo cargado correctamente!",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.reload();
            });
          },
          (error) => {
            console.error("Error al cargar archivo:", error);
            this.uploading = false;
            Swal.fire({
              icon: "error",
              title: "¡Error!",
              text: "Error al cargar archivo",
            });
          }
        );
    } else {
      console.error("No se ha seleccionado ningún archivo");
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No se ha seleccionado ningún archivo",
      });
    }
  }

  onCancel(): void {
    this.uploading = false;
    this.selectedFile = null;
    this.unsubscribe$.next();
  }

  convertBytes(bytes: number): string {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  }

  // imagenes del administrador
  imagenUrl: any;

  getImagenUserPersona(): void {
    let imagenUrl = "./assets/images/user.png";

    if (this.userCi === undefined || this.userCi === "") {
      imagenUrl = "./assets/images/user.png";
    }

    this.administracionService.imagenUserPersona(this.userCi).subscribe(
      (blob) => {
        const imageUrl = URL.createObjectURL(blob);
        this.imagenUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      },
      (error) => {
        console.error("Error al cargar la imagen:", error);
        this.imagenUrl = "/assets/images/user.png";
      }
    );
  }

  //detalles de puesto e incorporacion q se muesra en el toolbar
  detalles: any = {};

  obtenerDetallesItems() {
    this.administracionService.getPuestoDetalle().subscribe((data: any) => {
      this.detalles = data;
    });
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  cantidadIncorporacionesCreadas: number = 0;

  obtenerDetallesIncorporacion() {
    const gestion = new Date().getFullYear();
    this.administracionService
      .getIncorporacionDetalle(gestion)
      .subscribe((data: any) => {
        this.cantidadIncorporacionesCreadas =
          data.cantidadIncorporacionesCreadas;
      });
  }

  //planilla en excel
  //datos de la imagen
  uploadingExcel: boolean = false;
  fileNameExcel!: string;
  fileSizeExcel!: string;
  selectedFileExcel: File | null = null;
  private unsubscribeExcel$ = new Subject<void>();


  onFileSelectedExcel(event: any): void {
    const selectedFileExcel = event.target.files[0];
    this.selectedFileExcel = selectedFileExcel;
    this.fileName = selectedFileExcel.name;
    this.fileSize = this.convertBytesExcel(selectedFileExcel.size);
  }

  onUploadExcel() {
    if (this.selectedFileExcel) {
      this.uploading = true;
      this.administracionService
        .uploadExcel(this.selectedFileExcel)
        .pipe(takeUntil(this.unsubscribeExcel$))
        .subscribe(
          (response) => {
            this.uploading = false;
            Swal.fire({
              icon: "success",
              title: "¡Planilla cargado correctamente!",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.reload();
            });
          },
          (error) => {
            console.error("Error al cargar la planilla:", error);
            this.uploading = false;
            Swal.fire({
              icon: "error",
              title: "¡Error!",
              text: "Error al cargar la planilla",
            });
          }
        );
    } else {
      console.error("No se ha seleccionado ningún documento");
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No se ha seleccionado ningún documento",
      });
    }
  }

  onCancelExcel(): void {
    this.uploading = false;
    this.selectedFileExcel = null;
    this.unsubscribe$.next();
  }

  convertBytesExcel(bytes: number): string {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  }
}
