import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RolesService } from "src/app/core/services/incorporaciones/roles.service";
import { Rol } from "src/app/shared/models/incorporaciones/rol";
import { RespuestaLista } from "src/app/shared/models/respuesta";

@Component({
  selector: 'app-edit-rol-user',
  templateUrl: './edit-rol-user.component.html',
  styleUrls: ['./edit-rol-user.component.css']
})
export class EditRolUserComponent implements OnInit {

  nombrePersona: string;
  listRoles: Rol[] = [];
  tuFormGroup: FormGroup;

  constructor(
    private rolesService: RolesService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditRolUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.nombrePersona = data.nombrePersona;
    this.tuFormGroup = this.fb.group({
      institucion: [''] // aquí puedes definir un valor por defecto si lo necesitas
    });
    this.loadRoles();
  }

  ngOnInit(): void {
  }

  loadRoles() {
    this.rolesService.getAll().subscribe((response: RespuestaLista<Rol>) => {
      this.listRoles = response.objetosList || [];
    });
  }

  async onSubmit(): Promise<void> {
    // Aquí puedes agregar la lógica para guardar el rol seleccionado
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
