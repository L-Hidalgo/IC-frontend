import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RegistroPersonaComponent } from '../registro-persona/registro-persona.component';
import { FormControl, Validators } from '@angular/forms';
import { RegistroRequisitosComponent } from '../registro-requisitos/registro-requisitos.component';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-incorporacion',
  templateUrl: './incorporacion.component.html',
  styleUrls: ['./incorporacion.component.scss']
})
export class IncorporacionComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'acciones', 'itemNuevo', 'itemActual', 'persona', 'responsable', 'estado', 'cumpleRequisitos', 'notaMinuta', 'informe', 'memorandum', 'rap', 'eliminar'];

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  itemNuevoFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^(20000|[1-9]\\d{0,4})$')
  ]);

  itemActualFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^(20000|[1-9]\\d{0,4})$')
  ]);

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private elementRef: ElementRef) {
    const users = Array.from({ length: 100 }, (_, k) => this.createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const tdElement = this.elementRef.nativeElement.querySelector('.example-form-persona');
    tdElement.addEventListener('mouseover', (event: MouseEvent) => {
      this.openDialog();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createNewUser(id: number): any {
    return {
      id: id.toString(),
      informe: { cite: '', fecha: new Date() },
      memorandum: { cite: '', codigo: '', fecha: new Date() },
      rap: { cite: '', codigo: '', fecha: new Date() },
      eliminar: null
    };
  }

  agregarFila() {
    const newUser = this.createNewUser(this.dataSource.data.length + 1);
    this.dataSource.data.push(newUser);
    this.dataSource._updateChangeSubscription();
  }

  eliminarFila(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistroPersonaComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró', result);
    });
  }

  abrirModalRegistroRequisitos(): void {
    const dialogRef = this.dialog.open(RegistroRequisitosComponent, {
      width: '800px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de registro de requisitos se cerró', result);
    });
  }
}
