import { Component, OnInit , ViewChild } from "@angular/core";
import { UserService } from "src/app/core/services/incorporaciones/user.service";
import { User } from "src/app/shared/models/incorporaciones/user";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDateRangeInput } from "@angular/material/datepicker";
import { MatSelect } from "@angular/material/select";
import { MatDialogRef } from "@angular/material/dialog";
import { IncorporacionesService } from "src/app/core/services/incorporaciones/incorporaciones.service";
import { NgForm } from "@angular/forms";
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-reporte-trimestral',
  templateUrl: './reporte-trimestral.component.html',
  styleUrls: ['./reporte-trimestral.component.css']
})
export class ReporteTrimestralComponent  implements OnInit {
  listUsers: Array<User> = [];
  range: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private userService: UserService,
    private incorporacionesService: IncorporacionesService,
    public dialogRef: MatDialogRef<ReporteTrimestralComponent>
  ) {
    this.loadUser();
  }

  ngOnInit(): void {}

  loadUser() {
    this.userService.getAll().subscribe((resp: any) => {
      this.listUsers = resp.objetosList || [];
    });
  }

  @ViewChild("usuarioSelect") usuarioSelect!: MatSelect;
  @ViewChild("fechaInicio", { static: true })
  fechaInicio!: MatDateRangeInput<any>;
  @ViewChild("fechaFin", { static: true }) fechaFin!: MatDateRangeInput<any>;

  onSubmit(formReporte: NgForm) {
    if (formReporte.valid) {
      const name = formReporte.value.usuarioSelect;
      const fechaInicio = formReporte.value.startDate;
      const fechaFin = formReporte.value.endDate;

      this.incorporacionesService
        .generarReportTrimestral(name, fechaInicio, fechaFin)
        .subscribe(
          (data: Blob) => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const filename = `Reporte Trimestal de ${name}.xlsx`;
            FileSaver.saveAs(blob, filename);  
          },
          (error) => {
            console.error("Error en el servicio:", error);
            // Manejo de errores
          }
        );
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

