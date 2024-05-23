import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanDetails, PersonalDetails } from 'src/app/model/newModel.model';
import { GetService } from 'src/app/service/connect/get.service';

@Component({
  selector: 'app-documents-component',
  templateUrl: './documents-component.component.html',
  styleUrls: ['./documents-component.component.scss']
})
export class DocumentsComponentComponent implements OnInit {
  loanDetails: LoanDetails | undefined;
  personalDetails: PersonalDetails | undefined;
  userIdInput: string = '';

  constructor(
    private route: ActivatedRoute,
    private loanService: GetService,
  ) { }

  ngOnInit(): void {
    // this.getLoanDetails(this.userIdInput);
    //   this.getPersonalDetails(this.userIdInput);
  }

  onSubmit(): void {
    if (this.userIdInput) {
      this.getLoanDetails(this.userIdInput);
      this.getPersonalDetails(this.userIdInput);
    }
  }

  getLoanDetails(id: string): void {
    this.loanService.getLoanDetailsById(id).subscribe({
      next: (data: LoanDetails) => {
        this.loanDetails = data;
      },
      error: (error) => {
        console.log('Error fetching loan details:', error);
      }
    });
  }

  getPersonalDetails(id: string): void {
    this.loanService.getPersonalDetailsById(id).subscribe(
      (data: PersonalDetails) => {
        this.personalDetails = data;
      },
      error => {
        console.log('Error fetching personal details:', error);
      }
    );
  }
}