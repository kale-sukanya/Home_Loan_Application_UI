import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { PostService } from 'src/app/service/connect/post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;


  constructor(private fb: FormBuilder, private connect: PostService,
    private router: Router, private auth: AuthService,
    private cookieService: CookieService) {

  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      const userRole = this.auth.getUser();
      if (userRole?.role === 'Admin') {
        this.router.navigate(['/admin/getAllApplications']);
      } else {
        this.router.navigate(['/user/dashboard']);
      }
    }

    this.loginForm = this.fb.group({
      EmailId: ['', Validators.required],
      Password: ['', Validators.required],
      Role: ['', Validators.required],
      
    })
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.connect.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            this.auth.setUser({
              email: res.email,
              role: res.role,
              token: res.token
            });
            this.cookieService.set('Authorization', `Bearer ${res.token}`,
              undefined, '/', undefined, true, 'Strict');

            console.log(res);
            alert("Login SuccessFull!");

            if (res.role === 'Admin') {
              this.router.navigate(['/admin/getAllApplications']);
            }else{
              this.router.navigate(['/user/dashboard']);
            }
            
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            if (err.status === 404) {
              alert('Invalid Credentials. Please check and login again');
            } else {
              alert('Done');
              this.router.navigate(['/user/dashboard']);

            }
          }
        });
    } else {
      this.validateAllFormsFields(this.loginForm);
      alert("All the fields are required");
    }

  }



  private validateAllFormsFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormsFields(control)
      }
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

}



