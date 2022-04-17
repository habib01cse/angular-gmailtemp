import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDataService } from '../base-data.service';

@Component({
  selector: 'app-email-details',
  templateUrl: './email-details.component.html',
  styleUrls: ['./email-details.component.css']
})
export class EmailDetailsComponent implements OnInit {
  id = null;
  baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  dtlObj: any = {};
  constructor( 
    private ds: BaseDataService
    , private acRouter: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.acRouter.params.subscribe(params => {
      console.log('params', params);
      if(params){
        if(params.hasOwnProperty('gmailId')){
          this.id = params['gmailId'];
          console.log('this.id......', this.id);
          this.dataGet();
        }
        
      }     
   });
    
  }

  dataGet(){
    this.ds.getFileData(this.baseUrl+'/'+this.id).subscribe(res =>{ 
      console.log('res', res);

      this.dtlObj = res;
    }); 
  }

}
