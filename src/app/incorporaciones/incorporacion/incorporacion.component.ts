import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RegistroPersonaComponent } from '../registro-persona/registro-persona.component';
import { HostListener } from '@angular/core';

interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
  informe: {
    cite: string;
    fecha: Date;
  };
  memorandum: {
    cite: string;
    codigo: string;
    fecha: Date;
  };
  rap: {
    cite: string;
    codigo: string;
    fecha: Date;
  };
  cambioItem: string;
  eliminar: any; 
}


export interface NotaMinuta {
  hp: string;
  cite: string;
  codigo: string;
  fechaInicio: Date;
  fechaFin: Date;
}

const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-incorporacion',
  templateUrl: './incorporacion.component.html',
  styleUrls: ['./incorporacion.component.scss']
})

export class IncorporacionComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'acciones', 'name', 'progress', 'fruit', 'cumpleRequisitos', 
                                'informe', 'memorandum', 'rap', 'cambioItem', 'eliminar'];

  dataSource: MatTableDataSource<UserData>;
  userName: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) {
    const users = Array.from({length: 100}, (_, k) => this.createNewUser(k + 1, this.userName));
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  accionSeleccionada(event: Event) {
    const target = event.target as HTMLSelectElement;
    const accionSeleccionada = target.value;
    console.log('Acción seleccionada:', accionSeleccionada);
  }

  createNewUser(id: number, userName: string): UserData {
    return {
      id: id.toString(),
      name: userName || 'Nombre No Especificado',
      progress: Math.round(Math.random() * 100).toString(),
      fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
      informe: { cite: '', fecha: new Date() },
      memorandum: { cite: '', codigo: '', fecha: new Date() },
      rap: { cite: '', codigo: '', fecha: new Date() },
      cambioItem: '',
      eliminar: null 
    };
  }

  agregarFila() {
    const newUser = this.createNewUser(this.dataSource.data.length + 1, this.userName);
    this.dataSource.data.push(newUser);
    this.dataSource._updateChangeSubscription();
  }

  eliminarFila(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
  }

  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'TH' && target.textContent?.trim() === 'PERSONA') {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistroPersonaComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró', result);
    });
  }
}
