import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanDetails, PersonalDetails } from 'src/app/model/newModel.model';
import { GetService } from 'src/app/service/connect/get.service';
import { Documents } from '../../../model/documents.model';
import { DocumentsService } from 'src/app/service/connect/document.service';

@Component({
  selector: 'app-view-your-application',
  templateUrl: './view-your-application.component.html',
  styleUrls: ['./view-your-application.component.scss']
})
export class ViewYourApplicationComponent implements OnInit {
  
  applicationId: string|null = null;
  loanDetails: LoanDetails | undefined;
  personalDetails: PersonalDetails | undefined;
  documents: Documents[] = [];
  loading: boolean = false;
  errorMessage: string = '';


  constructor(private route:ActivatedRoute,
    private connect: GetService,
    private documentsService: DocumentsService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        this.applicationId = params.get('id');
        if(this.applicationId){
          this.getLoanDetails(this.applicationId);
          this.getPersonalDetails(this.applicationId);
          this.fetchDocuments(this.applicationId);
        }
      }
    })
    
  }

  getLoanDetails(id: string): void {
    this.connect.getLoanDetailsById(id).subscribe({
      next: (data: LoanDetails) => {
        this.loanDetails = data;
      },
      error: (error) => {
        console.error('Error fetching loan details:', error);
      },
    });
  }

  getPersonalDetails(id: string): void {
    this.connect.getPersonalDetailsById(id).subscribe({
      next: (data: PersonalDetails) => {
        this.personalDetails = data;
      },
      error: (error) => {
        console.error('Error fetching personal details:', error);
      },
    });
  }

  fetchDocuments(id:string): void {
    this.loading = true;
    // const applicationId = '8429';
    this.documentsService.getDocumentsByApplicationId(id)
      .subscribe({
        next: (response) => {
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