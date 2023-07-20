import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { docIdElement } from '../models/ajukan.model';
import { TodolistApprovalElement } from '../models/todolistApproval.model';
import { environment } from 'src/environments/environment';

const httpOptions : Object = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  observe: 'response',
  responseType: 'json'
}

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  imageDocumentEdit: any = ''
  uploadDocumentEditSPM = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditSPP = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditRSPP = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditSPPM = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditSPVOP = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditSSPD = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditSDDAKT = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditLPJUP = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditCKDDS = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditSRB = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditRKBAD = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditSPKDDDT = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditSRDC = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditPPARBT = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditSPVER = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditLYDS = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditRKAD = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditSPPKCE = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditSRBTB = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditSNPWP = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditBASTB = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditBAPEM = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }
  uploadDocumentEditJUMJM = {
    docId: "",
    docCode: "",
    docValue: this.imageDocumentEdit,
    filename: "",
    extension: "",
    insertBy: "",
    updateBy: ""
  }

  docId: docIdElement[] = [];
  ajukan = {
    jenisPengajuan : "",
    notes : "",
    insertBy : "",
    document : this.docId
  }

  todolistApproval: TodolistApprovalElement[] = [];

  constructor(private http: HttpClient) { }

  public getDetailUserLogin(endPoint: any,  parameter: any, catchError: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.service_api + endPoint, parameter, httpOptions).pipe(catchError);
  }

  postDocument(endPoint: any, parameter: any) {
    return this.http.post<any>(environment.service_api + endPoint, parameter, httpOptions).pipe();
  }

  get(endPoint: any) {
    return this.http.get<any>(environment.service_api + endPoint, httpOptions).pipe();
  }

}
