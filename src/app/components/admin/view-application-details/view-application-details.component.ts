import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanDetails, PersonalDetails } from 'src/app/model/newModel.model';
import { DocumentsService } from 'src/app/service/connect/document.service';
import { GetService } from 'src/app/service/connect/get.service';
import { Documents } from '../../../model/documents.model';

@Component({
  selector: 'app-view-application-details',
  templateUrl: './view-application-details.component.html',
  styleUrls: ['./view-application-details.component.scss']
})
export class ViewApplicationDetailsComponent implements OnInit {
  
  applicationId: string|null = null;
  loanDetails: LoanDetails | null = null;
  personalDetails: PersonalDetails | null = null;
  documents: Documents[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private connect: GetService,
    private documentsService: DocumentsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.applicationId = params.get('id');
      if (this.applicationId) {
        this.loadData(this.applicationId);
      }
    });
  }

  loadData(id: string): void {
    this.loading = true;
    this.connect.getLoanDetailsById(id).subscribe({
      next: (data: LoanDetails) => {
        this.loanDetails = data;
      },
      error: (error) => {
        console.error('Error fetching loan details:', error);
        this.errorMessage = 'Error fetching loan details. Please try again later.';
      }
    });

    this.connect.getPersonalDetailsById(id).subscribe({
      next: (data: PersonalDetails) => {
        this.personalDetails = data;
      },
      error: (error) => {
        console.error('Error fetching personal details:', error);
        this.errorMessage = 'Error fetching personal details. Please try again later.';
      }
    });

    this.documentsService.getDocumentsByApplicationId(id).subscribe({
      next: (response: Documents[]) => {
        this.documents = response;
        console.log('Documents fetched:', this.documents);
      },
      error: (error) => {
        console.error('Error fetching documents:', error);
        this.errorMessage = 'Error fetching documents. Please try again later.';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  viewDocument(url: string): void {
    window.open(url, '_blank');
  }
}
