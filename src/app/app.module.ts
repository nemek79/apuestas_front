import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';


// Peticiones HTTP
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

// Rutas
import {RouterModule, Routes} from '@angular/router';

// Formularios
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatNativeDateModule} from '@angular/material';

// Datepicker
import { MatDatepickerModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

// AWESOME
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// COMPONENTES

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ApuestasComponent } from './components/apuestas/apuestas.component';
import { ApuestaComponent } from './components/apuestas/apuesta.component';
import { TipstersComponent } from './components/tipsters/tipsters.component';
import { TipsterComponent } from './components/tipsters/tipster.component';
import { CasasComponent } from './components/casas/casas.component';
import { DeportesComponent } from './components/deportes/deportes.component';
import { VirtualComponent } from './components/apuestas/virtual/virtual.component';

// SERVICIOS

import { ApuestasService } from './servicios/apuestas.service';
import { TipstersService } from './servicios/tipsters.service';
import { CasasService } from './servicios/casas.service';
import { EstadosService } from './servicios/estados.service';
import { DeportesService } from './servicios/deportes.service';
import { TiposService } from './servicios/tipos.service';

import {registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeES, 'es');

const routes: Routes = [
  {
    path: '',
    redirectTo: '/apuestas',
    pathMatch: 'full'
  }, {
    path: 'apuestas',
    component: ApuestasComponent
  }, {
    path: 'virtuales',
    component: VirtualComponent
  },  {
    path: 'apuestas/:fechaIni',
    component: ApuestasComponent
  }, {
    path: 'tipsters',
    component: TipstersComponent
  }, {
    path: 'tipsters/:tipsterId',
    component: TipsterComponent
  }, {
    path: 'casas',
    component: CasasComponent
  }, {
    path: 'deportes',
    component: DeportesComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ApuestasComponent,
    ApuestaComponent,
    TipstersComponent,
    TipsterComponent,
    CasasComponent,
    DeportesComponent,
    VirtualComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule, MatOptionModule, MatSelectModule, MatIconModule,
    MatNativeDateModule,
    FontAwesomeModule
  ],
  providers: [
    ApuestasService,
    TipstersService,
    CasasService,
    EstadosService,
    DeportesService,
    TiposService,
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
