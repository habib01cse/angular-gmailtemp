import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDataService } from '../base-data.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {
  id: any = null;
  fieldName: any = null;
  sidebarToggle = true;
  statusId = null;
  catId = null;
  gmailId:any = null;
  postArr = [];
  postBackupArr = [];
  item: any = {};
  apiUrl = "https://jsonplaceholder.typicode.com/posts";
  constructor(
    private ds: BaseDataService
    , private _router: Router
    , private acRouter: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.acRouter.params.subscribe(params => {
      console.log('params', params);
      if(params){
        if(params.hasOwnProperty('id')){
          this.id = params['id'];
        }
        if(params.hasOwnProperty('fieldName')){
          this.fieldName = params['fieldName'];
        }
        if(this.fieldName &&  this.id){
          this.onClickFilter(this.fieldName, this.id)    
        }
      }
      console.log('this.id ', this.id );
   });
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
      if(!this.fieldName && !this.id ){
        this.onClickFilter('status_id', 1);
      }
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

  getDetails(item:any){
    this.item = item;
    this.gmailId = this.item?.id;
    this._router.navigate(['/email-details', { gmailId: this.gmailId}]);
  }

}
