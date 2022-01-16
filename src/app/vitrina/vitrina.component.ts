import { Component, OnInit } from '@angular/core';
import { Istock } from '../interfaces/interfaces';
import { commonService } from '../service/common.service';


@Component({
  selector: 'app-vitrina',
  templateUrl: './vitrina.component.html',
  styleUrls: ['./vitrina.component.css']
})
export class VitrinaComponent implements OnInit {

  constructor(private commonService: commonService) { 

  }
  libros?:Istock[];
  ngOnInit(): void {
        //se cargan los libros para la vitrina
        this.commonService.getStock().subscribe((data:Istock[]) =>   
          {
            this.libros=data;
            console.log(this.libros);
          }) 
  }
  
}
