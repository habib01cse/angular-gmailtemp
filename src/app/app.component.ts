import { Component, TemplateRef ,OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BaseDataService } from './base-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'gmail_temp';
  sidebarToggle = true;
  modalRef?: BsModalRef;
  statusId = null;
  catId = null;
  postArr = [];
  postBackupArr = [];
  item: any = {};
  apiUrl = "https://jsonplaceholder.typicode.com/posts";
  constructor(
    private ds: BaseDataService
    , private modalService: BsModalService
    ){

  }
  ngOnInit(): void {
    this.dataGet();
  }

  dataGet(){
    this.ds.getFileData(this.apiUrl).subscribe(res =>{      
      let tempList = res.slice(0, 50);
      let i = 0;
      this.postArr = tempList.map((el: any) =>{        
        el['title'] = this.strTrim(el['title'], 3);
        el['body'] = this.strTrim(el['body'], 11);
        if(i < 10){
          el['status_id'] = 1;
        }else if(i < 20 && i > 10){
          el['status_id'] = 2;
        }else if(i < 30 && i > 20){
          el['status_id'] = 3;
        }else if(i < 40 && i > 30){
          el['status_id'] = 4;
        }else if(i < 50 && i > 40){
          el['status_id'] = 5;
        }

        if(i < 15){
          el['cat_id'] = 1;
        }else if(i < 30 && i > 15){
          el['cat_id'] = 2;
        }      
        i++;
        return el;
      });      
      this.postBackupArr = JSON.parse(JSON.stringify( this.postArr ));
      this.onClickFilter('status_id', 1);
    }); 
  }

  strTrim(str:string, workNumber:number){    
    return str.split(' ').slice(0, workNumber).join(' ');        
  }

  onClickFilter(fieldName:string, id:any){     
    if (fieldName == 'cat_id'){
      this.catId = id
    }else{
      this.statusId = id; 
    }
     
    this.postArr = this.postBackupArr.filter( (el: any) =>{
      return el[fieldName] == id;
    })     
  }

  onClickDetailsDetails(template: TemplateRef<any>) {  
    console.log('template', template);

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg modal-xlg' })
    );
  }

  getDetails(item:any){
    this.item = item;
  }

  onClickNavIcon(){
    this.sidebarToggle = !this.sidebarToggle;
    console.log('this.sidebarToggle', this.sidebarToggle);
  }


}
