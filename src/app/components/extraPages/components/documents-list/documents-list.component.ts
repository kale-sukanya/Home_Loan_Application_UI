import { Component, OnInit } from '@angular/core';
import { Documents } from '../../../../model/documents.model';
import { DocumentsService } from 'src/app/service/connect/document.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnInit {
  documents: Documents[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private documentsService: DocumentsService) { }

  ngOnInit(): void {
    this.fetchDocuments();
  }

  fetchDocuments(): void {
    this.loading = true;
    const applicationId = '8429';
    this.documentsService.getDocumentsByApplicationId(applicationId)
      .subscribe({
        next: (response) => {
          this.debug(response); // Add this line to log the response
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

  debug(data: any): void {
    console.log('Debugging data:', data);
  }

  viewDocument(url: string): void {
    window.open(url, '_blank');
  }
  
}
