import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resetPassModel } from 'src/app/model/resetPass.model';
import { UpdateStatusDTO } from 'src/app/model/updateStatus.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class PostService {

  constructor(private http:HttpClient) { }

  private baseUrl: string = environment.apiBaseUrl;

  signUp (userObj: any){
    return this.http.post<any>(`${this.baseUrl}/register`,userObj);
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}/Login`,loginObj)
  }

  personalDetails (personalDetailsFormObj: any){
    return this.http.post<any>(`${this.baseUrl}/PersonalDetails/PostPersonalDetails`,personalDetailsFormObj);
  }

  LoanDetails (LoanDetailsFormObj: any){
    return this.http.post<any>(`${this.baseUrl}/userPostLoanDetails`,LoanDetailsFormObj);
  }

  updateStatus(id: string, UpdateStatusRequest: UpdateStatusDTO, email:string):Observable<string>{
    return this.http.put<string>(`${this.baseUrl}/ApplicationTracking/UpdateStatus/${id}?email=${email}`,UpdateStatusRequest);
  }
  
  sendOtp(email: string){
    return this.http.post<any>(`${this.baseUrl}/ForgotPassword/${email}`, null,{ responseType: 'text' as 'json' });
  }

  resetPassword(resetPassObj: resetPassModel){
    return this.http.post<any>(`${this.baseUrl}/Resetpassword`,resetPassObj,{ responseType: 'text' as 'json' });
  }
}
