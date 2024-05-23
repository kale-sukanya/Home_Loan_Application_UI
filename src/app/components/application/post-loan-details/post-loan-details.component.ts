import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/connect/post.service';
import { FormDataService } from 'src/app/service/data/form-data.service';

@Component({
  selector: 'app-post-loan-details',
  templateUrl: './post-loan-details.component.html',
  styleUrls: ['./post-loan-details.component.scss']
})
export class PostLoanDetailsComponent {
  loanDetailsForm!: FormGroup;
  randomId: string = this.generateRandomId();
  fixedInterest: number = 8.5;
  maxLoanAmount!: number;
  DateTime: Date = new Date();

  constructor(private fb: FormBuilder, private dbconnect: PostService, private router: Router, private formDataService: FormDataService) { }

  ngOnInit(): void {  

    this.loanDetailsForm = this.fb.group({
      ApplicationId: new FormControl(this.randomId, Validators.required),
      PropertyLocation: ['', Validators.required],
      PropertyName: ['', Validators.required],
      EstimateAmount: ['', [
        Validators.required,
        Validators.pattern(/^(?!0+(\.0+)?$)([1-9]\d{4,}|[1-9]\d{3,}\.\d{2})$/)
      ]],
      TypeOfEmployment: ['', Validators.required],
      RetirementAge: ['', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        this.validateRetirementAge 
      ]],
      OrganizationType: ['', Validators.required],
      EmployerName: ['', Validators.required],
      NetSalary: ['', [
        Validators.required,
        Validators.pattern(/^(?!0+(\.0+)?$)([1-9]\d{4,}|[1-9]\d{3,}\.\d{2})$/)
      ]],
      MaxLoanAmountGrantable: new FormControl(this.maxLoanAmount),
      InterestRate: new FormControl(this.fixedInterest, Validators.required),
      LoanAmount: ['', [
        Validators.required,
        Validators.pattern(/^(?!0+(\.0+)?$)([1-9]\d{4,}|[1-9]\d{3,}\.\d{2})$/),
        this.validateLoanAmount.bind(this)
      ]],
      Tenure: ['', [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/)
      ]],
      AppliedOn: new FormControl(this.DateTime, Validators.required)
    });
    this.loanDetailsForm.get('NetSalary')?.valueChanges.subscribe((value) => {
      this.maxLoanAmount = this.calculateMaxLoanAmountGeantable(value); 
      console.log('MaxLoanAmountGrantable updated:', this.maxLoanAmount);
    });
  }


  onSubmit(): void {
    if (this.loanDetailsForm.valid) {

      const formData = this.loanDetailsForm.value;
      formData.MaxLoanAmountGrantable = this.maxLoanAmount; 

      console.log('MaxLoanAmountGrantable:', this.maxLoanAmount);
      console.log(this.loanDetailsForm.value);
      console.log('Form AppliedOn:', this.DateTime);
      this.dbconnect.LoanDetails(this.loanDetailsForm.value)
        .subscribe({
          next: (res) => {
            console.log(res); 
            alert('LoanDetails Submitted successfully');
            const applicationId = this.loanDetailsForm.value.ApplicationId;
            this.formDataService.setApplicationId(applicationId);
            this.router.navigate(['/application/personaldetails']);
            this.loanDetailsForm.reset();
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            if (err.status !== 200) {
              alert('Not Ok');
            } else {
              alert('LoanDetails Submitted successfully');
              const applicationId = this.loanDetailsForm.value.ApplicationId;
              this.formDataService.setApplicationId(applicationId);
              this.router.navigate(['/application/personaldetails']);
            }
          }
        });
    } else {
      this.validateAllFormFields(this.loanDetailsForm);
      alert("All fields are required");
    }
  }

  private validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  private generateRandomId(): string {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    return randomId.toString();
  }

  private calculateMaxLoanAmountGeantable(netSalary: number): number {
    const netMonthlySalary = netSalary / 12; 
    const eligibleLoanAmount = 60 * (0.6 * netMonthlySalary);
    return +eligibleLoanAmount.toFixed(2);
  }

  private validateLoanAmount(control: any) {
    const loanAmount = parseFloat(control.value);
    if (loanAmount > this.maxLoanAmount) {
      return { maxLoanExceeded: true };
    }
    return null;
  }

  private validateRetirementAge(control: FormControl) {
    const retirementAge = parseInt(control.value, 10);
    if (retirementAge < 60) {
      return { minRetirementAge: true };
    }
    return null;
  }
}
