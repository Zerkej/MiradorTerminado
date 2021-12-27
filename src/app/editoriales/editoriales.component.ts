import { Component, OnInit } from '@angular/core';
import { Ieditorial} from '../interfaces/interfaces';
import { commonService } from '../service/common.service';

@Component({
  selector: 'app-editoriales',
  templateUrl: './editoriales.component.html',
  styleUrls: ['./editoriales.component.css']
})
export class EditorialesComponent implements OnInit {

  constructor(private commonService: commonService) { }


  editoriales?:Ieditorial[];

  ngOnInit(): void {
        
      this.commonService.getEditoriales().subscribe((data:Ieditorial[]) =>   
      {
        this.editoriales=data;
      })     
      ; 

  }
  
    
}