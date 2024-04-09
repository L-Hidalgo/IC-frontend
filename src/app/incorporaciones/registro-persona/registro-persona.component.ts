import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-persona',
  templateUrl: './registro-persona.component.html',
  styleUrls: ['./registro-persona.component.scss']
})
export class RegistroPersonaComponent implements OnInit {
  personaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegistroPersonaComponent>
  ) {
    this.personaForm = this.formBuilder.group({
      genero: ['', Validators.required],
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      ci: ['', Validators.required],
      exp: ['', Validators.required],
      areaProfesion: ['', Validators.required],
      gradoAcademico: ['', Validators.required],
      institucionEstudios: ['', Validators.required],
      fechaIncorporacion: ['', Validators.required],
      hp: ['', Validators.required],
      respaldo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.personaForm.valid) {
      // Aquí puedes manejar la lógica de envío del formulario
      console.log('Formulario válido', this.personaForm.value);
      this.dialogRef.close(this.personaForm.value);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
