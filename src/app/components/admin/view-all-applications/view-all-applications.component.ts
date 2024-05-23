import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationTracking } from 'src/app/model/applicationTracking.model';
import { GetService } from 'src/app/service/connect/get.service';

@Component({
  selector: 'app-view-all-applications',
  templateUrl: './view-all-applications.component.html',
  styleUrls: ['./view-all-applications.component.scss']
})
export class ViewAllApplicationsComponent {
  statusArray!: ApplicationTracking[];
  filteredStatusArray!: any[]; 

  constructor(private dbconnect: GetService, private router: Router){}

  ngOnInit(): void {
    this.dbconnect.getAllApplicationStatus()
      .subscribe({
        next: (response) => {
          this.statusArray = response;
          this.statusArray.sort((a, b) => (b.ApplicationID < a.ApplicationID) ? -1 : 1);
          this.filteredStatusArray = this.statusArray;
        },
        error(err: HttpErrorResponse) {
          console.log(err);
        },
      })
  }

  filterApplications() {
    const checkbox = document.querySelector('#showPendingOnly') as HTMLInputElement;
    const isChecked = checkbox.checked;
    this.filteredStatusArray = isChecked ? this.statusArray.filter(status => status.Status === 'pending') : this.statusArray;
  }
}
