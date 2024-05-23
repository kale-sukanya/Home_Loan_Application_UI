import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationData } from 'src/app/model/ApplicationDetails.model';
import { Account } from 'src/app/model/account.model';
import { ApplicationTracking } from 'src/app/model/applicationTracking.model';
import { CommonPersonalDetails } from 'src/app/model/getApplicationmodel.model';
import { loanDetails } from 'src/app/model/loandetails.model';
import { personalDetails } from 'src/app/model/personaldetails.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  
  constructor(private http:HttpClient) { }

  private baseUrl: string = environment.apiBaseUrl;

  getAllApplicationStatus(): Observable<ApplicationTracking[]>{
    return this.http.get<ApplicationTracking[]>(`${this.baseUrl}/AdminGetAllApplicationStatus`);
  }

  getApplicationById(id:string):Observable<ApplicationTracking>{
    return this.http.get<ApplicationTracking>(`${this.baseUrl}/ApplicationTracking/${id}`);
  }

  getLoanDetailsById(id: string): Observable<loanDetails> {
    return this.http.get<loanDetails>(`${this.baseUrl}/userGetLoanDetails/${id}`);
  }

  getPersonalDetailsById(id:string):Observable<personalDetails>{
    return this.http.get<personalDetails>(`${this.baseUrl}/PersonalDetails/GetDetailsById/${id}`);
  }

  getAccountByAccountNo(id:string):Observable<Account>{
    return this.http.get<Account>(`${this.baseUrl}/api/Account/GetAccountBalance/${id}`);
  }

  checkEligibility(netMonthlySalary: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/calculator/Eligibility?netMonthlySalary=${netMonthlySalary}`,{ responseType: 'text' as 'json' });
  }

  calculateEMI(loanAmount: number, loanTenureInMonths: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/calculator/EMI?loanAmount=${loanAmount}&loanTenureInMonths=${loanTenureInMonths}`,{ responseType: 'text' as 'json' });
  }

  getApplicationsByEmail(email: string): Observable<ApplicationData> {
    const url = `${this.baseUrl}/Loan/applications/${email}`;
    return this.http.get<ApplicationData>(url);
  }

}
