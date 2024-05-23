import { Component } from '@angular/core';
import { Documents } from '../../../model/documents.model';
import { Observable } from 'rxjs';
import { DocumentsService } from 'src/app/service/connect/document.service';
import { FormDataService } from 'src/app/service/data/form-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent {
  private files: { [key: string]: File } = {};
  fileName: { [key: string]: string } = {};
  ApplicationId!: string;
  selectedFilesCount = 0;
  selectedFiles: { [key: string]: File } = {};
  fileRequired: string[] = ['Pancard', 'SalarySlip', 'NOC', 'LOA', 'AgreementToSale', 'AadharCard'];

  constructor(private imageService: DocumentsService, 
    private formDataService: FormDataService,
    private router: Router) {}

  ngOnInit(): void {
    this.formDataService.getApplicationId().subscribe({
      next:(res)=>{
        this.ApplicationId = res;
      }
    })
  }

  onFileUploadChange(event: any, docType: string): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const fileSizeInKB: number = file.size / 1024;
      const fileName = `${docType}${this.ApplicationId}`;
  
      if (fileSizeInKB > 500) {
        alert("File size exceeds 500KB. Please select a smaller file.");
        event.target.value = '';
        return; 
        
      }
      this.files[fileName] = file;
      this.fileName[fileName] = fileName;
  
      if (event.target.files && event.target.files.length > 0) {
        this.selectedFilesCount++;
      }
    }
  }

  uploadDocument(docType: string): void {
    const fileName = `${docType}${this.ApplicationId}`;
    if (this.files[fileName] && this.fileName[fileName] !== "" && this.ApplicationId !== "") {
      this.imageService.uploadFile(this.files[fileName], this.fileName[fileName], this.ApplicationId).subscribe({
        next: (res) => {
          console.log(res);
          alert("Document uploaded successfully");
        },
        error: (err) => {
          console.log(err);
          alert("Error uploading document");
        }
      });
    }
  }

  onSubmit(){
    if(this.allFilesSelected()){
      alert("All files uploaded successfully");
      this.router.navigate(['/user/dashboard']);
    } else {
      alert("Please upload all required files");
    }
  }

  allFilesSelected() {
    const requiredFiles = 6;
    return this.selectedFilesCount === requiredFiles;
  }

  getRemainingFiles(): string[] {
    return this.fileRequired.filter(file => !this.selectedFiles[file]);
  }
}



