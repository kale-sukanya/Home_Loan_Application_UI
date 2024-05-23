import { Component, OnInit } from '@angular/core';
import { ApplicationData } from '../../../../model/ApplicationDetails.model';
import { GetService } from 'src/app/service/connect/get.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {
  applicationData: ApplicationData | null = null; // Assuming ApplicationData is your response data model

  constructor(private loanAppService: GetService, 
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    const userRole = this.auth.getUser();
    const userEmail = userRole?.email; // Replace with the actual user's email
    this.loadApplicationData(userEmail!);
  }

  loadApplicationData(email: string) {
    this.loanAppService.getApplicationsByEmail(email).subscribe(data => {
      this.applicationData = data;
      console.log(data);
    });
  }

  viewApplicationDetails(applicationId: string) {
    // Navigate to the application details page with the applicationId
    this.router.navigate(['/user/view-your-application-details/', applicationId]);
  }
}