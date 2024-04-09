import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-requisitos',
  templateUrl: './registro-requisitos.component.html',
  styleUrls: ['./registro-requisitos.component.scss']
})
export class RegistroRequisitosComponent implements OnInit {
  requisitosForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegistroRequisitosComponent>
    ) { 
      this.requisitosForm = this.formBuilder.group({
        expProfesional: ['', Validators.required],
        expEspecifica: ['', Validators.required],
        expMando: ['', Validators.required],
        formacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.requisitosForm.valid) {
      console.log('Formulario válido', this.requisitosForm.value);
      this.dialogRef.close(this.requisitosForm.value);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
