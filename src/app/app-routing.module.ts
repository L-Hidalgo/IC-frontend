import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsPageComponent } from './admin/buttons-page/buttons-page.component';
import { CardsPageComponent } from './admin/cards-page/cards-page.component';
import { CheckButtonPageComponent } from './admin/check-button-page/check-button-page.component';
import { InputsPageComponent } from './admin/inputs-page/inputs-page.component';
import { LayoutsPageComponent } from './admin/layouts-page/layouts-page.component';
import { OutputsPageComponent } from './admin/outputs-page/outputs-page.component';
import { RadioButtonPageComponent } from './admin/radio-button-page/radio-button-page.component';
import { DemoPageComponent } from './demos/demo-page/demo-page.component';
import { ReadTokenComponent } from './demos/read-token/read-token.component';
import { DetailPageComponent } from './user/detail-page/detail-page.component';
import { FormPageComponent } from './user/form-page/form-page.component';
import { MasterPageComponent } from './user/master-page/master-page.component';
import { WizardPageComponent } from './user/wizard-page/wizard-page.component';
import { ClasificadorPageComponent } from './admin/clasificador-page/clasificador-page.component';
import { MessagePageComponent } from './admin/message-page/message-page.component';
import { TableViewComponent } from './admin/table-view/table-view.component';
import { AlertsPageComponent } from './admin/alerts-page/alerts-page.component';
//administracion
import { AdministracionComponent } from './administracion/administracion/administracion.component';
//incorporacion
import { IncorporacionComponent } from './incorporacion/incorporacion/incorporacion.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: DemoPageComponent },

  //admin
  { path: 'layouts', component: LayoutsPageComponent },
  { path: 'cards', component: CardsPageComponent },
  { path: 'inputs', component: InputsPageComponent },
  { path: 'outputs', component: OutputsPageComponent },
  { path: 'buttons', component: ButtonsPageComponent },
  { path: 'messages', component: MessagePageComponent },
  { path: 'alertas', component: AlertsPageComponent },
  { path: 'tabla', component: TableViewComponent},

  //user
  { path: 'master', component: MasterPageComponent },
  { path: 'detail', component: DetailPageComponent },
  { path: 'form', component: FormPageComponent },
  { path: 'wizard', component: WizardPageComponent },

  //demos
  { path: 'inputs', component: InputsPageComponent },
  { path: 'radioButton', component: RadioButtonPageComponent},
  { path: 'checkButton', component: CheckButtonPageComponent},
  { path: 'clasificadores', component: ClasificadorPageComponent},
  { path: 'read-token', component: ReadTokenComponent},

  //administracion
  { path: 'administracion', component: AdministracionComponent},

  //incorporacion
   { path: 'incorporacion', component: IncorporacionComponent},

  /* { path: '404', component: NotFoundPage },
  { path: '**', component: NotFoundPage }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
