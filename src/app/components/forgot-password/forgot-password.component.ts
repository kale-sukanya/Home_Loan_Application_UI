import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { resetPassModel } from 'src/app/model/resetPass.model';
import { PostService } from 'src/app/service/connect/post.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  resetPassDto: resetPassModel = { EmailId: '', Password: '', OTP: '' };
  message: string = '';
  showForgotPassword: boolean = true;
  showResetPassword: boolean = false;

  constructor(private forgotPasswordService: PostService, private router: Router) { }

  submitForm(): void {
    if (this.resetPassDto.EmailId) {
      this.forgotPasswordService.sendOtp(this.resetPassDto.EmailId).subscribe({
        next: (response) => {
          alert('OTP sent successfully!');
              this.showForgotPassword = false;
              this.showResetPassword = true;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error:', error);
          if(error.status === 400){
            alert('User not found');
          }
        }
      });
    }
  }

  

  resetPassword(): void {
    if (this.resetPassDto.OTP && this.resetPassDto.Password) {
      this.forgotPasswordService.resetPassword(this.resetPassDto).subscribe({
        next: (response) => {
          alert(response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          alert(error.error)
          console.error('Error:', error);
        }
      });
    }
  }

  
  
}