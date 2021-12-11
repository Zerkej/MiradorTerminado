import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-autor',
  templateUrl: './agregar-autor.component.html',
  styleUrls: ['./agregar-autor.component.css']
})
export class AgregarAutorComponent implements OnInit {

  autor!: FormGroup;

  constructor(private _fb: FormBuilder ) { }

  createForm() {
    this.autor = this._fb.group({
      nombre: ["", Validators.required],
      apellidos: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.createForm();
  }
  public agregarAutor(){
    Swal.fire('se ha guardado el autor','el autor ha sido registrada con exito');

  }

}
