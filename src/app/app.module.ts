import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule,DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';


import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioComponent } from './Inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { VitrinaComponent } from './vitrina/vitrina.component';
import { StockComponent } from './stock/stock.component';
import { AgregarAutorComponent } from './agregar-autor/agregar-autor.component';
import { AgregarEditorialComponent } from './agregar-editorial/agregar-editorial.component';
import { AutoresComponent } from './autores/autores.component';
import { EditorialesComponent } from './editoriales/editoriales.component';
import { AgregarLibroComponent } from './agregar-libro/agregar-libro.component';
import { EnviarConsultaComponent } from './enviar-consulta/enviar-consulta.component';
import { HistorialComponent } from './historial/historial.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LogoutComponent } from './logout/logout.component';
import { VigilanteGuard } from './vigilante.guard';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    PageNotFoundComponent,
    NavbarComponent,
    VitrinaComponent,
    StockComponent,
    AgregarAutorComponent,
    AgregarEditorialComponent,
    AutoresComponent,
    EditorialesComponent,
    AgregarLibroComponent,
    EnviarConsultaComponent,
    HistorialComponent,
    LogoutComponent,

  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    
    RouterModule.forRoot(
      [{path:'inicio', component: InicioComponent},
      {path: 'login', component: LoginComponent},
      {path: 'logout', component: LogoutComponent, canActivate: [VigilanteGuard]},
      {path: 'vitrina', component: VitrinaComponent},
      {path: 'stock', component: StockComponent,canActivate: [VigilanteGuard]},
      {path: 'stock/agregarLibro', component: AgregarLibroComponent,canActivate: [VigilanteGuard]},
      {path: 'autores', component: AutoresComponent,canActivate: [VigilanteGuard]},
      {path: 'autores/agregarAutor', component: AgregarAutorComponent,canActivate: [VigilanteGuard]},
      {path: 'editoriales',component: EditorialesComponent,canActivate: [VigilanteGuard]},
      {path: 'editoriales/agregarEditorial', component: AgregarEditorialComponent,canActivate: [VigilanteGuard]},
      {path: 'historial',component: HistorialComponent,canActivate: [VigilanteGuard]},
      {path: 'enviarConsulta',component:EnviarConsultaComponent},
      {path: '',redirectTo:'welcome', pathMatch:'full'},
      {path: '**', component:PageNotFoundComponent}]
    )
  ],
  providers: [DatePipe, CookieService,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule { }
