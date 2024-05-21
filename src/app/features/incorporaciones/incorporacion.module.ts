import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './incorporacion-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IncorporacionListComponent } from './incorporacion-list/incorporacion-list.component';
import { RegistroPersonaComponent } from './registro-persona/registro-persona.component';
import { RegistroRequisitosComponent } from './registro-requisitos/registro-requisitos.component';

@NgModule({
    imports: [
        CommonModule,
        CustomersRoutingModule,
        SharedModule
    ],
    declarations: [
        IncorporacionListComponent,
        RegistroPersonaComponent,
        RegistroRequisitosComponent
    ]
})
export class CustomersModule { }
