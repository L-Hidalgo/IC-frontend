import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RolesService } from "src/app/core/services/incorporaciones/roles.service";
import { UserService } from "src/app/core/services/incorporaciones/user.service";
import { Rol } from "src/app/shared/models/incorporaciones/rol";
import { RespuestaLista } from "src/app/shared/models/respuesta";

@Component({
  selector: "app-edit-rol-user",
  templateUrl: "./edit-rol-user.component.html",
  styleUrls: ["./edit-rol-user.component.css"],
})
export class EditRolUserComponent implements OnInit {
  userId!: number;
  nombrePersona: string;
  listRoles: Array<Rol> = [];

  constructor(
    private rolesService: RolesService,
    private userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditRolUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nombrePersona = data.nombrePersona;
    this.userId = data.userId;
    this.loadRoles();
  }

  ngOnInit(): void {}

  loadRoles() {
    this.rolesService.getAll().subscribe((response: RespuestaLista<Rol>) => {
      this.listRoles = response.objetosList || [];
    });
  }

  guardarRoles() {
    const rolesIds = this.listRoles
      .filter((rol) => rol.selected)
      .map((rol) => rol.id);

    console.log('Roles IDs a enviar:', rolesIds); // Para verificar si los roles se están recopilando correctamente

    this.userService.AsignarRol(this.userId, rolesIds).subscribe(
      (respuesta) => {
        console.log(respuesta);
      },
      (error) => {
        console.error(error);
      }
    );
  }



  onClose(): void {
    this.dialogRef.close();
  }
}
