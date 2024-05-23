import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/LoginUser.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { PostService } from 'src/app/service/connect/post.service';
import { FormDataService } from 'src/app/service/data/form-data.service';

@Component({
  selector: 'app-post-personal-details',
  templateUrl: './post-personal-details.component.html',
  styleUrls: ['./post-personal-details.component.scss']
})
export class PostPersonalDetailsComponent {
  personalDetailsForm!: FormGroup;
  user?: LoginUser;

  constructor(private fb: FormBuilder, private dbconnect: PostService,
    private formDataService: FormDataService, private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    console.log(this.user?.email);
    this.formDataService.getApplicationId().subscribe(applicationId => {
      this.personalDetailsForm = this.fb.group({
        EmailId: new FormControl(this.user?.email, Validators.required), 
        PhoneNumber: ['', [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ]],
        FirstName: ['', Validators.required],
        MiddleName: ['', Validators.required],
        LastName: ['', Validators.required],
        DOB: ['', [
          Validators.required,
          Validators.pattern(/^((19[3-9]\d|200[0-9]|201[0-9]|202[0-1])-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/)
        ]],
        Gender: ['', Validators.required],
        Nationality: ['', Validators.required],
        AadharNo: ['', [
          Validators.required,
          Validators.pattern(/^\d{12}$/)
        ]],
        PanNo: ['', [
          Validators.required,
          Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
        ]],
        ApplicationId: new FormControl(applicationId), 
      });
    });
  }
  

  onSubmit(): void {
    if (this.personalDetailsForm.valid) {
      console.log(this.personalDetailsForm.value);
      this.dbconnect.personalDetails(this.personalDetailsForm.value)
        .subscribe({
          next: (res) => {
            console.log(res); 
            alert('Success!');
            this.router.navigate(['application/upload']);
            this.personalDetailsForm.reset();
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            if (err.status !== 200) {
              alert(err.error);
            } else {
              alert('Success!');
              this.router.navigate(['user/dashboard']);
            }
          }
        });
    } else {
      this.validateAllFormFields(this.personalDetailsForm);
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
}
