import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RolesService } from "src/app/core/services/incorporaciones/roles.service";
import { UserService } from "src/app/core/services/incorporaciones/user.service";
import { NotificationService } from "src/app/core/services/notification.service";
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
  selectedRoles: number[] = [];

  constructor(
    private rolesService: RolesService,
    private userService: UserService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditRolUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nombrePersona = data.nombrePersona;
    this.userId = data.userId;
    this.loadRoles();
    this.loadUserRoles(); // Cargar los roles del usuario al abrir el diálogo
  }

  ngOnInit(): void {}

  loadRoles() {
    this.rolesService.getAll().subscribe((response: RespuestaLista<Rol>) => {
      this.listRoles = response.objetosList || [];
    });
  }

  loadUserRoles() {
    this.rolesService.getUserRoles(this.userId).subscribe((response: any) => {
      this.selectedRoles = response.roles.map((role: any) => role.id) || [];
    });
  }

  toggleRoleSelection(roleId: number) {
    if (this.selectedRoles.includes(roleId)) {
      this.selectedRoles = this.selectedRoles.filter(id => id !== roleId);
    } else {
      this.selectedRoles.push(roleId);
    }
  }

  guardarRoles() {
    this.userService.asignarRol(this.userId, this.selectedRoles)
      .subscribe(
        response => {
          this.notificationService.showSuccess("Roles actualizados exitosamente!!");
          this.dialogRef.close();
        },
        error => {
          this.notificationService.showError("Error al actualizar roles!!");
          this.dialogRef.close();
        }
      );
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
