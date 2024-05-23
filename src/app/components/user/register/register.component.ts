import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/connect/post.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signUpForm!: FormGroup;
  type: 'password' | 'text' = 'password';
  eyeIcon: 'fa-eye' | 'fa-eye-slash' = 'fa-eye-slash';
  

  constructor(private fb: FormBuilder, private apiconnect: PostService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      EmailId: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]],
      Password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
      ]],
      ConfirmPass: ['', Validators.required],
      Role: ['User', Validators.required]
    },
    { validator: this.passwordMatchValidator });
  }

  togglePasswordVisibility(): void {
    this.type = this.type === 'password' ? 'text' : 'password';
    this.eyeIcon = this.type === 'password' ? 'fa-eye-slash' : 'fa-eye';
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.apiconnect.signUp(this.signUpForm.value)
        .subscribe({
          next: (res) => {
            console.log(res); 
            alert("User Registered successfully!!");
            this.router.navigate(['/login']);
            this.signUpForm.reset();
          },
          error: (err) => {
            if (err.status === 409) {
              alert("User already exists. Please choose a different email.");
            }
          }
        });
    }
    else {
      this.validateAllFormFields(this.signUpForm);
      alert("All the fields are required");
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

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('Password');
    const confirmPasswordControl = formGroup.get('ConfirmPass');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

}
