import { Component, OnDestroy } from '@angular/core';
import { AdministracionService } from '../administracion.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnDestroy {

  uploading: boolean = false;
  fileName!: string;
  fileSize!: string;
  selectedFile: File | null = null;
  private unsubscribe$ = new Subject<void>();

  constructor(private adminService: AdministracionService, private dialog: MatDialog) { }

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
      this.adminService.uploadExcel(this.selectedFile)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          response => {
            this.uploading = false;
            this.showSuccessDialog('Archivo cargado correctamente');
            console.log('Archivo cargado correctamente');
          },
          error => {
            console.error('Error al cargar archivo:', error);
            this.uploading = false;
            this.showErrorDialog('Error al cargar archivo, verifique el formato y columnas del archivo');
          }
        );
    } else {
      console.error('No se ha seleccionado ningún archivo');
      this.showErrorDialog('No se ha seleccionado ningún archivo');
    }
  }

  onCancel(): void {
    this.uploading = false;
    this.selectedFile = null;
    this.unsubscribe$.next(); 
  }

  convertBytes(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (Math.round((bytes / Math.pow(1024, i)) * 100) / 100) + ' ' + sizes[i];
  }

  showSuccessDialog(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message
    });
  }

  showErrorDialog(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  }
}
