import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VitrinaComponent } from './vitrina/vitrina.component';
import { StockComponent } from './stock/stock.component';
import { AgregarAutorComponent } from './agregar-autor/agregar-autor.component';
import { AgregarEditorialComponent } from './agregar-editorial/agregar-editorial.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { CambiarStockComponent } from './cambiar-stock/cambiar-stock.component';
import { AutoresComponent } from './autores/autores.component';
import { EditorialesComponent } from './editoriales/editoriales.component';
import { AgregarLibroComponent } from './agregar-libro/agregar-libro.component';
import { EnviarConsultaComponent } from './enviar-consulta/enviar-consulta.component';


@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    NavbarComponent,
    VitrinaComponent,
    StockComponent,
    AgregarAutorComponent,
    AgregarEditorialComponent,
    CerrarSesionComponent,
    CambiarStockComponent,
    AutoresComponent,
    EditorialesComponent,
    AgregarLibroComponent,
    EnviarConsultaComponent,

  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(
      [{path: 'welcome', component: CarouselComponent},
      {path: 'login', component: LoginComponent},
      {path: 'vitrina', component: VitrinaComponent},
      {path: 'stock', component: StockComponent},
      {path: 'cambiarStock', component: CambiarStockComponent},
      {path: 'agregarLibro', component: AgregarLibroComponent},
      {path: 'autores', component: AutoresComponent},
      {path: 'autores/agregarAutor', component: AgregarAutorComponent},
      {path: 'editoriales',component: EditorialesComponent},
      {path: 'editoriales/agregarEditorial', component: AgregarEditorialComponent},
      {path: 'enviarConsulta',component:EnviarConsultaComponent},
      {path: '',redirectTo:'welcome', pathMatch:'full'},
      {path: '**', component:PageNotFoundComponent}]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
