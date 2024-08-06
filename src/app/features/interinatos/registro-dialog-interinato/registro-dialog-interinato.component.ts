import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";
import { RegistroDesignacionComponent } from "../registro-designacion/registro-designacion.component";
import { RegistroSuspencionComponent } from "../registro-suspencion/registro-suspencion.component";

@Component({
  selector: "app-registro-dialog-interinato",
  templateUrl: "./registro-dialog-interinato.component.html",
  styleUrls: ["./registro-dialog-interinato.component.css"],
})
export class RegistroDialogInterinatoComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<RegistroDialogInterinatoComponent>
  ) {}

  ngOnInit(): void {}

  openRegistroDesignacionModal(): void {
    this.dialogRef.close("suspension");
    const dialogRef = this.dialog.open(RegistroDesignacionComponent, {
      width: "600px",
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Modal cerrado", result);
    });
  }

  openRegistroSuspencionModal(): void {
    this.dialogRef.close("suspension");
    const dialogRef = this.dialog.open(RegistroSuspencionComponent, {
      width: "600px",
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Modal cerrado", result);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
