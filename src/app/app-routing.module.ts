import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion/administracion/administracion.component';
import { IncorporacionComponent } from './incorporacion/incorporacion/incorporacion.component';

const routes: Routes = [
  { path: '', redirectTo: '/incorporacion', pathMatch: 'full' },

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
