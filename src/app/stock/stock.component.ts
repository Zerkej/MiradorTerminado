import { Component, OnInit } from '@angular/core';
import {Ilibro} from '../interfaces/interfaces';
import { commonService } from '../service/common.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  constructor(private commonService: commonService) {
   }

   libros?:Ilibro[];
  ngOnInit(): void {

    this.commonService.getLibros().subscribe((data:Ilibro[]) =>   
    {
      this.libros=data;
      console.log(data);
    }) 
  
  
   }
}
