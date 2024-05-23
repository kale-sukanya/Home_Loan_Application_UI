import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Documents } from 'src/app/model/documents.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http: HttpClient) { }

  uploadFile(file: File, fileName: string, ApplicationId: string): Observable<Documents> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('ApplicationId', ApplicationId);

    return this.http.post<Documents>(`https://localhost:7014/api/Documents`, formData);
  }

  getDocumentsByApplicationId(applicationId: string): Observable<Documents[]> {
    const url = `https://localhost:7014/api/Documents/${applicationId}`;
    return this.http.get<Documents[]>(url);
  }

  // used in extra pages component
  getAll():Observable<Documents[]>{
    return this.http.get<Documents[]>(`https://localhost:7014/api/Documents`);
  }
}
 