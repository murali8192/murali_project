import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private Reports = new BehaviorSubject<any>({
    obj: '',
  });
  private HeaderData = new BehaviorSubject<any>({
    obj: '',
  });

  private BackgroundComponentState = new BehaviorSubject<any>({
    obj: '',
  });


  constructor(private http: HttpClient, private router: Router,private Indextitle: Title, private meta: Meta) { }


  postmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.post(`${environment.apiUrl}${endpoint}`, obj)
    .pipe(map(
      (res: any) => {
      return res;
    }));
    }
   
  
    putmethod(endpoint:string,obj:object):Observable<any>{
       return this.http.put(`${environment.apiUrl}${endpoint}`,obj)
   .pipe(map(
    (res:any)=>{
    return res;
    }));
   }

   postmethodOne(endpoint: string, obj: object): Observable<any> {
    return this.http.post(`${environment.axelOneUrl}${endpoint}`, obj)
    .pipe(map(
      (res: any) => {
      return res;
    }));
    }
   directSignIn(userId: any){
    return this.http.request('post', `${environment.apiUrl}xtract/userexists/`+userId);  
  }
    
    SetReports(data: any) {
      this.Reports.next(data);
    }  
    GetReports() {
      return this.Reports.asObservable();
    }


    SetHeaderData(data: any) {
      this.HeaderData.next(data);
    }  
    GetHeaderData() {
      return this.HeaderData.asObservable();
    }

   
    setBackgroundstate(data:any){
      this.BackgroundComponentState.next(data)
    }
    getBackgroundstate(){
      return this.BackgroundComponentState.asObservable();
    }

}
