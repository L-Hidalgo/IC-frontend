import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncorporacionesRoutingModule } from './incorporaciones-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IncorporacionListComponent } from './incorporacion-list/incorporacion-list.component';
import { RegistroPersonaComponent } from './registro-persona/registro-persona.component';
import { RegistroRequisitosComponent } from './registro-requisitos/registro-requisitos.component';
import { ObservacionDetalleComponent } from './observacion-detalle/observacion-detalle.component';
import { ReporteEvaluacionComponent } from './reporte-evaluacion/reporte-evaluacion.component';
import { ReporteTrimestralComponent } from './reporte-trimestral/reporte-trimestral.component';

@NgModule({
    imports: [
        CommonModule,
        IncorporacionesRoutingModule,
        SharedModule
    ],
    declarations: [
        IncorporacionListComponent,
        RegistroPersonaComponent,
        RegistroRequisitosComponent,
        ObservacionDetalleComponent,
        ReporteEvaluacionComponent,
        ReporteTrimestralComponent
    ]
})
export class IncorporacionesModule { }
