import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "src/app/core/services/incorporaciones/user.service";
import { User } from "src/app/shared/models/incorporaciones/user";
import { MatDialog } from "@angular/material/dialog";
import { EditRolUserComponent } from "../edit-rol-user/edit-rol-user.component";
import { NotificationService } from "src/app/core/services/notification.service";
import { Title } from "@angular/platform-browser";
import { Subscription } from "rxjs";
import { interval } from "rxjs";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements AfterViewInit {

  displayedColumns: string[] = [
    "id",
    "name",
    "email",
    "cargo",
    "rol",
    "accion",
  ];

  dataSource: MatTableDataSource<User>;

  adminList: User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    public dialog: MatDialog,
    private titleService: Title
  ) {
    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit() {
    this.titleService.setTitle("RRHH - DDE - Administracion");
    this.notificationService.openSnackBar("Modulo Incorporaciones Cargando...");
    this.getListData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getListData();
  }

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

  abrirModalEditRolUser(rowIndex: number): void {
    const userRolData = this.dataSource?.data[rowIndex];
    const dialogRef = this.dialog.open(EditRolUserComponent, {
      width: "500px",
      height: "auto",
      data: {
        nombrePersona: userRolData.name,
        userId: userRolData.id,
      },
    });
  }
  
}
