import { Component, ViewChild, TemplateRef ,OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { fromEvent, Observable, Subscription, throwError } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from "rxjs/operators";
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
  gmailId:any = null;
  postArr = [];
  postArrAll = [];
  postBackupArr = [];
  item: any = {};
  isActiveSearch = true;
  isShowSearchContent = false;
  apiUrl = "https://jsonplaceholder.typicode.com/posts";
  keyPressEvnSubscription!: Subscription;
  @ViewChild('itemSearchInput', { static: true }) itemSearchInput: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  constructor(
    private ds: BaseDataService
    , private modalService: BsModalService
    , private _router: Router
    ,private renderer: Renderer2
    ){
      this.gmailId = null;
      console.log('const', this.itemSearchInput);  

       /**
       * This events get called by all clicks on the page
       */
        this.renderer.listen('window', 'click',(e:Event)=>{
          /**
           * Only run when itemSearchInput is not clicked
           * If we don't check this, all clicks (even on the toggle button) gets into this
           * section which in the result we might never see the menu open!
           * And the menu itself is checked here, and it's where we check just outside of
           * the menu and button the condition abbove must close the menu
           */
          if(e.target !== this.itemSearchInput?.nativeElement && e.target!==this.menu?.nativeElement){
              this.isShowSearchContent=false;
          }
        });

    } 

  ngOnInit(): void {
    console.log('init', this.itemSearchInput);
    this.keyPressEvnSubscription = fromEvent(this.itemSearchInput?.nativeElement, 'keyup').pipe(     
      // get value
      map((event: any) => {       
        return event.target.value;
      })
      // if character length greater then 2
      //, filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(300)

      // If previous query is diffent from current   
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((searchTerm: string) => {          
      this.search(searchTerm)
    });
    this.dataGet();
  }

  search(term:any){    
    if(term){      
      this.postArr = this.postArrAll.filter((el:any) => 
        el.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        );     
    }else{
      this.dataGet();
    }   
  }
  

  dataGet(){
    this.ds.getFileData(this.apiUrl).subscribe(res =>{      
      this.postArr = res.slice(0, 5);
      this.postArrAll = res;
      // let i = 0;
      // this.postArr = tempList.map((el: any) =>{        
      //   el['title'] = this.strTrim(el['title'], 3);
      //   el['body'] = this.strTrim(el['body'], 11);
      //   if(i < 10){
      //     el['status_id'] = 1;
      //   }else if(i < 20 && i > 10){
      //     el['status_id'] = 2;
      //   }else if(i < 30 && i > 20){
      //     el['status_id'] = 3;
      //   }else if(i < 40 && i > 30){
      //     el['status_id'] = 4;
      //   }else if(i < 50 && i > 40){
      //     el['status_id'] = 5;
      //   }

      //   if(i < 15){
      //     el['cat_id'] = 1;
      //   }else if(i < 30 && i > 15){
      //     el['cat_id'] = 2;
      //   }      
      //   i++;
      //   return el;
      // });      
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

    this._router.navigate(['/list', { id: id, fieldName: fieldName }]);
     
    // this.postArr = this.postBackupArr.filter( (el: any) =>{
    //   return el[fieldName] == id;
    // })     
  }

  onClickDetailsDetails(template: TemplateRef<any>) {  
    console.log('template', template);

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg modal-xlg' })
    );
  }

  // getDetails(item:any){
  //   this.item = item;
  // }

  onClickNavIcon(){
    this.sidebarToggle = !this.sidebarToggle;
    console.log('this.sidebarToggle', this.sidebarToggle);
  }

  getDetails(item:any){   
    this.item = item;
    this.gmailId = this.item?.id;
    this._router.navigate(['/email-details', { gmailId: this.gmailId}]);
    this.isShowSearchContent = false;
  }

  onClickSearchBox(){
    this.isActiveSearch = false;
    this.isShowSearchContent = true;
  }

  focusOutSearchBox(e: any){
    this.isActiveSearch = true;
    //this.isShowSearchContent = false;
  }

}
