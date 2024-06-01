import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "src/app/core/services/incorporaciones/user.service";
import { User } from "src/app/shared/models/incorporaciones/user";
import { MatDialog } from '@angular/material/dialog';
import { EditRolUserComponent } from "../edit-rol-user/edit-rol-user.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements AfterViewInit {
  displayedColumns: string[] = ["id", "name", "email", "cargo", "gerencia", "accion"];
  dataSource: MatTableDataSource<User>;
  adminList: User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<User>();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getListData();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getListData(): void {
    this.userService.getAllAdmin("").subscribe(
      (resp) => {
        if (!!resp.objetosList) {
          this.dataSource.data = resp.objetosList.map((el: any) => ({ ...el }));
        }
      },
      (error) => console.log(error)
    );
  }

  abrirModalEditRolUser(rowIndex: number): void {
    const userRolData = this.dataSource?.data[rowIndex];

    const dialogRef = this.dialog.open(EditRolUserComponent, {
      width: "500px",
      height: "auto",
      data: {
        nombrePersona: userRolData.name,
      },
    });

    dialogRef
      .afterClosed().subscribe(result => {
        // Aquí puedes manejar cualquier lógica después de cerrar el modal
      });
     /* .subscribe(async (result: Persona & Formacion & Incorporacion) => {
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
      });*/
  }
}
