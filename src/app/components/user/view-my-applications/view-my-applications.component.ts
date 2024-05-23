import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationData } from 'src/app/model/ApplicationDetails.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { GetService } from 'src/app/service/connect/get.service';

@Component({
  selector: 'app-view-my-applications',
  templateUrl: './view-my-applications.component.html',
  styleUrls: ['./view-my-applications.component.scss']
})
export class ViewMyApplicationsComponent implements OnInit {
  applicationData: ApplicationData | null = null; 
  applicationsLoaded: boolean = false; 

  constructor(private loanAppService: GetService, 
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    const userRole = this.auth.getUser();
    const userEmail = userRole?.email; 
    this.loadApplicationData(userEmail!);
  }

  loadApplicationData(email: string) {
    this.loanAppService.getApplicationsByEmail(email).subscribe(data => {
      this.applicationData = data;
      this.applicationsLoaded = true; 
      console.log(data);
    });
  }

  viewApplicationDetails(applicationId: string) {
    if (this.applicationData) {
      this.router.navigate(['/user/view-your-application-details/', applicationId]);
    } else {
      console.log('Application data is undefined');
    }
  }
}