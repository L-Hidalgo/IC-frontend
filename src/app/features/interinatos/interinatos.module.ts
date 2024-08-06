import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterinatosRoutingModule } from './interinatos-routing.module';
import { InterinatosComponent } from './interinatos/interinatos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditarInterinatoComponent } from './editar-interinato/editar-interinato.component';
import { RegistroDialogInterinatoComponent } from './registro-dialog-interinato/registro-dialog-interinato.component';

@NgModule({
  declarations: [
    InterinatosComponent,
    RegistroDialogInterinatoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InterinatosRoutingModule
  ],
  exports: [
    InterinatosComponent
  ],
  entryComponents: [
    EditarInterinatoComponent  
  ]
})
export class InterinatosModule { }
