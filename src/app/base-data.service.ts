import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseDataService {

  constructor(private http: HttpClient) { }
  // get data from file
  public getFileData(filePath: any): Observable<any> {
    return this.http.get(filePath);
  }
  
}
