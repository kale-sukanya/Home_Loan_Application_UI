import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationTracking } from 'src/app/model/applicationTracking.model';
import { PersonalDetails } from 'src/app/model/newModel.model';
import { UpdateStatusDTO } from 'src/app/model/updateStatus.model';
import { GetService } from 'src/app/service/connect/get.service';
import { PostService } from 'src/app/service/connect/post.service';

@Component({
  selector: 'app-update-application-status',
  templateUrl: './update-application-status.component.html',
  styleUrls: ['./update-application-status.component.scss']
})
export class UpdateApplicationStatusComponent {

  id: string | null = null;
  application?: ApplicationTracking;
  aadharNo: string = '';
  applId!: string;
  personalDetails: PersonalDetails | undefined;
  email!: string;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private dbconnect: GetService,
    private postconnect: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.dbconnect.getApplicationById(this.id).subscribe({
            next: (response) => {
              this.application = response;
              this.applId = this.application.ApplicationID;
              this.getPersonalDetails(this.applId);
              console.log(this.application);
              console.log("appId from OnInitMethod " + this.applId);
            },
            error: (error: HttpErrorResponse) => {
              if (error.status === 404) {
                this.errorMessage = 'Application not found. Please check the ID.';
              } else {
                this.errorMessage = 'An unexpected error occurred. Please try again.';
              }
            }
          });
        }
      }
    });
  }

  onFormSubmit(): void {
    const updateStatusRequest: UpdateStatusDTO = {
      Status: this.application?.Status ?? '',
      AadharNo: this.application?.AadharNo || '',
      ApplicationID: this.application?.ApplicationID ?? ''
    };

    if (this.id) {
      this.postconnect.updateStatus(this.id, updateStatusRequest, this.email).subscribe({
        next: (response) => {
          console.log(response);
          alert("Status updated successfully!!");
          this.router.navigate(['/admin/getAllApplications']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          if (err.status === 200) {
            alert("Status updated successfully!!");
            this.router.navigate(['/admin/getAllApplications']);
          } else if (err.status === 500) {
            alert("An internal server error occurred. Please try again later.");
          } else {
            alert("An unexpected error occurred. Please try again.");
          }
        }
      });
    }
  }

  getPersonalDetails(appId: string): void {
    this.dbconnect.getPersonalDetailsById(appId).subscribe(
      (data: PersonalDetails) => {
        this.personalDetails = data;
        this.email = this.personalDetails.EmailId;
        console.log("Personal details from get personalDetails " + this.personalDetails);
        console.log("Email from personal details " + this.email);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching personal details:', error);
        if (error.status === 404) {
          this.errorMessage = 'Personal details not found. Please check the ID.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    );
  }
}
