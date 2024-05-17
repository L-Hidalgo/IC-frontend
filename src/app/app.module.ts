import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreLibModule, Image64Service } from 'core-lib';
import { CommonModule } from '@angular/common';
// import { AdminServicesModule } from './services/services.module';
import { FormsModule } from '@angular/forms';
import { StrAuthLibModule } from 'str-auth-lib';
import { DatosAuthLocalService } from './services/datos-auth-local.service';
import { UseCaseContextService } from './services/usecase-context.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Mis links
import { HttpClientModule } from '@angular/common/http';
import { AdministracionComponent} from './administracion/administracion/administracion.component';
import { IncorporacionComponent } from './incorporacion/incorporacion/incorporacion.component';
import { RegistroPersonaComponent } from './incorporacion/registro-persona/registro-persona.component';
import { RegistroRequisitosComponent } from './incorporacion/registro-requisitos/registro-requisitos.component'
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroResponsableComponent } from './incorporacion/registro-responsable/registro-responsable.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdministracionComponent,
    IncorporacionComponent,
    RegistroPersonaComponent,
    RegistroRequisitosComponent,
    RegistroResponsableComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Adionar este import para la version: 1.2.48
    AppRoutingModule,
    FormsModule,
    CommonModule,
    CoreLibModule,
    // AdminServicesModule,
    FormsModule, // Agrega FormsModule aquí
    HttpClientModule,
    ReactiveFormsModule
    // StrAuthLibModule //Esta linea se debe comentar para iniciar la aplicacion en modo PRODUCCION
  ],
  providers: [
    Image64Service,
    DatosAuthLocalService,
    UseCaseContextService
  ],
  exports: [
    //RadioButtonComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
