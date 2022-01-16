import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enviar-consulta',
  templateUrl: './enviar-consulta.component.html',
  styleUrls: ['./enviar-consulta.component.css']
})
export class EnviarConsultaComponent implements OnInit {

  editorial!: FormGroup;
  nombre: String = "";

  constructor(private _fb: FormBuilder ) { }

  createForm() {
    this.editorial = this._fb.group({
      email: ["", Validators.required, Validators.email],
      mensaje: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.createForm();
  }
  
  public agregarEditorial(){
    Swal.fire('Correo enviado con exito');
  }
}
