import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import Swal from 'sweetalert2';
import { Ieditorial } from '../interfaces/interfaces';

@Component({
  selector: 'app-agregar-editorial',
  templateUrl: './agregar-editorial.component.html',
  styleUrls: ['./agregar-editorial.component.css']
})
export class AgregarEditorialComponent implements OnInit {
  editorialAgregar!:Ieditorial;
  editorial!: FormGroup;
  nombre: String = "";

  constructor(private _fb: FormBuilder ) { }

  createForm() {
    this.editorial = this._fb.group({
      nombreEditorial: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }
  
  public agregarEditorial(){
    Swal.fire('se ha guardado la editorial','la editorial a sido registrada con exito');

  }
}

