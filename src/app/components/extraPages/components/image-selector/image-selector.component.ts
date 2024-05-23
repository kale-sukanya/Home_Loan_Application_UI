// import { Component } from '@angular/core';
// import { DocumentsService } from 'src/app/service/connect/document.service';
// import { Observable } from 'rxjs';
// import { Documents } from '../documents.model';

// @Component({
//   selector: 'app-image-selector',
//   templateUrl: './image-selector.component.html',
//   styleUrls: ['./image-selector.component.scss']
// })
// export class ImageSelectorComponent {
//   private files: File[] = [];
//   fileName: string[] = [];
//   ApplicationId: string = "1203";
//   images$?: Observable<Documents[]>;

//   constructor(private imageService: DocumentsService) {}

//   ngOnInit(): void {
//     this.images$ = this.imageService.getAll();
//   }

//   onFileUploadChange(event: any, index: number): void {
//     const fileList: FileList = event.target.files;
//     if (fileList.length > 0) {
//       this.files[index] = fileList[0];
//     }
//   }

//   uploadImage(index: number): void {
//     if (this.files[index] && this.fileName[index] !== "" && this.ApplicationId !== "") {
//       // Upload logic
//       this.imageService.uploadFile(this.files[index], this.fileName[index], this.ApplicationId).subscribe({
//         next: (res) => {
//           console.log(res);
//           alert("Done");
//         }
//       });
//     }
//   }
// }


import { Component } from '@angular/core';
import { DocumentsService } from 'src/app/service/connect/document.service';
import { Observable } from 'rxjs';
import { Documents } from '../../../../model/documents.model';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent {
  private files: { [key: string]: File } = {};
  fileName: { [key: string]: string } = {};
  ApplicationId: string = "1203";
  images$?: Observable<Documents[]>;

  constructor(private imageService: DocumentsService) {}

  ngOnInit(): void {
    this.images$ = this.imageService.getAll();
  }

  onFileUploadChange(event: any, docType: string): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const fileName = `${docType}${this.ApplicationId}`;
      this.files[fileName] = file;
      this.fileName[fileName] = fileName;
    }
  }

  uploadImage(docType: string): void {
    const fileName = `${docType}${this.ApplicationId}`;
    if (this.files[fileName] && this.fileName[fileName] !== "" && this.ApplicationId !== "") {
      // Upload logic
      this.imageService.uploadFile(this.files[fileName], this.fileName[fileName], this.ApplicationId).subscribe({
        next: (res) => {
          console.log(res);
          alert("Done");
        }
      });
    }
  }
}
