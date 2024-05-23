import { Component } from '@angular/core';
import { ApplicationTracking } from 'src/app/model/applicationTracking.model';
import { GetService } from 'src/app/service/connect/get.service';

@Component({
  selector: 'app-track-your-application-status',
  templateUrl: './track-your-application-status.component.html',
  styleUrls: ['./track-your-application-status.component.scss']
})
export class TrackYourApplicationStatusComponent {

  trackerId!: string;
  application!: ApplicationTracking | null;

  constructor(private accountService: GetService) { }

  FindApplicationStatus() {
    this.accountService.getApplicationById(this.trackerId).subscribe(
      (data: ApplicationTracking) => {
        this.application = data;
      },
      (error) => {
        if (error.status === 404) {
          alert('Tracking id not found');
        }
      }
    );
  }

  onTrackerIdChange() {
    if (!this.trackerId) {
      this.application = null;
    }
  }
}