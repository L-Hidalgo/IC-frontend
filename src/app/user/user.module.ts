import { NgModule } from '@angular/core';
import { ComponentsModule, MaterialModule } from 'core-lib';
import { MasterPageComponent } from './master-page/master-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { WizardPageComponent } from './wizard-page/wizard-page.component';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    MasterPageComponent,
    DetailPageComponent,
    FormPageComponent,
    WizardPageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    AppRoutingModule,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class UserModule { }