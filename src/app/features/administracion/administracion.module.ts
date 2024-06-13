import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionListComponent } from './administracion-list/administracion-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditRolUserComponent } from './edit-rol-user/edit-rol-user.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdministracionRoutingModule
  ],
  declarations: [AdministracionListComponent, EditRolUserComponent]
})
export class AdministracionModule { }
