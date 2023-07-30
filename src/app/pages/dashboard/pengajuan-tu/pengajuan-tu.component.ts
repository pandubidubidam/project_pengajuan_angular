import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalHelper } from 'src/app/helpers/global-helper';
import { credential } from 'src/app/lib/security';
import { DocumentElement } from 'src/app/models/document';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pengajuan-tu',
  templateUrl: './pengajuan-tu.component.html',
  styleUrls: ['./pengajuan-tu.component.css']
})
export class PengajuanTuComponent implements OnInit {

  selectedFiles: any = undefined;
  documentParam = new DocumentElement();
  user: any;

  constructor(
    public services: MainServiceService,
    private globalHelper: GlobalHelper,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.user = JSON.parse(credential.storage.get('user'));
  }

  ngOnInit(): void {
  }

  async viewDocument(documentName: string) {
    const uploadDocument = this.services[`uploadDocumentEdit${documentName}` as keyof MainServiceService];
    console.log(`View ${documentName} document`);
  
    const base64str = uploadDocument.docValue;
    const byteCharacters = atob(base64str);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, '_blank');
  }

  async uploadDocument(event: any, documentName: string) {
    const fileInput = event.target;
  
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      console.log('file ===========>', file);
  
      const extension = file.name.replace(/^.*\./, '').toLowerCase();
  
      if (file.size > 5242880) { // Size in bytes (5MB)
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Size dokumen melebihi size maksimal. Mohon upload dokumen maksimum size 5MB!',
        });
        fileInput.value = '';
        this.selectedFiles = undefined;
      } else {
        if (extension === 'pdf') {
          this.selectedFiles = file;
          const base = await this.globalHelper.toBase64(file);
          console.log('base ========>', base);
  
          this.documentParam = new DocumentElement();
          const convertedDocument = await this.globalHelper.toBase64(this.selectedFiles);
          console.log("convertedDocument =========> ", convertedDocument);
  
          const uploadDocument = this.services[`uploadDocumentEdit${documentName}` as keyof MainServiceService];
          
          uploadDocument.filename = this.selectedFiles.name;
          uploadDocument.extension = `.${this.selectedFiles.name.replace(/^.*\./, '').toUpperCase()}`;
          uploadDocument.insertBy = this.user?.userId ? this.user.userId : '';
          uploadDocument.updateBy = this.user?.userId ? this.user.userId : '';
          uploadDocument.docValue = convertedDocument;

          if (documentName === 'SPM') {
            uploadDocument.docCode = '1';
          } else if (documentName === 'SPP') {
            uploadDocument.docCode = '2';
          } else if (documentName === 'RSPP') {
            uploadDocument.docCode = '3';
          } else if (documentName === 'SPPM') {
            uploadDocument.docCode = '4';
          } else if (documentName === 'SPVOP') {
            uploadDocument.docCode = '5';
          } else if (documentName === 'SSPD') {
            uploadDocument.docCode = '6';
          } else if (documentName === 'SDDAKT') {
            uploadDocument.docCode = '7';
          } else if (documentName === 'PPARBT') {
            uploadDocument.docCode = '14';
          }
          this.spinner.show();
          this.services.postDocument('pengajuan/uploadDocument', uploadDocument).subscribe(result => {
            console.log("Hasil Upload =========> ", result.body.data);
            if (result.status == HttpStatusCode.Ok) {
              this.spinner.hide();
              Swal.fire({
                icon: 'success',
                text: result.body.msg_desc
              });
              this.services[`uploadDocumentEdit${documentName}` as keyof MainServiceService] = result.body.data;
              console.log(`set Hasil Upload =========> `, this.services[`uploadDocumentEdit${documentName}` as keyof MainServiceService]);
            } else if (result.status == HttpStatusCode.GatewayTimeout) {
              this.spinner.hide();
              Swal.fire({
                icon: 'error',
                text: `Gagal upload dokumen, silahkan upload kembali`
              });
            } else {
              this.spinner.hide();
              Swal.fire({
                icon: 'error',
                text: `Gagal upload dokumen, silahkan upload kembali`
              });
            }
          });
        } else {
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Silahkan upload file jenis PDF',
          });
          fileInput.value = '';
          this.selectedFiles = undefined;
        }
      }
    }
  }

  submit(){
    if (this.services.uploadDocumentEditSPM.docValue.length < 1) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Dokumen SPM Harus Di Upload!',
        })
    } else if (this.services.uploadDocumentEditSPP.docValue.length < 1) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Dokumen Surat Permintaan Pembayaran Harus Di Upload!',
        })
    } else if (this.services.uploadDocumentEditRSPP.docValue.length < 1) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Dokumen Rincian SPP Harus Di Upload!',
        })
    } else if (this.services.uploadDocumentEditSPPM.docValue.length < 1) {
      Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Dokumen Surat Pernyataan Pertanggungjawaban Mutlak Harus Di Upload!',
      })
    } else if (this.services.uploadDocumentEditSPVOP.docValue.length < 1) {
      Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Dokumen Surat Pernyataan Verifikasi Oleh PPK SKPD/ PPK Unit SKPD Harus Di Upload!',
      })
    } else if (this.services.uploadDocumentEditSSPD.docValue.length < 1) {
      Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Dokumen Salinan SPD Harus Di Upload!',
      })
    } else if (this.services.uploadDocumentEditSDDAKT.docValue.length < 1) {
      Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Dokumen Salinan / DPA / DPPA Atas Kegiatan Terkait Harus Di Upload!',
      })
    } else if (this.services.uploadDocumentEditPPARBT.docValue.length < 1) {
      Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Dokumen Persetujuan PPKD Atas Rincian Belanja TU Harus Di Upload!',
      })
    } else {
        Swal.fire({
            title: 'Apakah Anda yakin ingin melakukan pengajuan Ganti Uang?',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: `Tidak`,
            allowOutsideClick: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log("this.services.uploadDocumentEditSPM =====> ", this.services.uploadDocumentEditSPM)
                console.log("this.services.uploadDocumentEditSPP =====> ", this.services.uploadDocumentEditSPP)
                console.log("this.services.uploadDocumentEditRSPP =====> ", this.services.uploadDocumentEditRSPP)
                console.log("this.services.uploadDocumentEditSPPM =====> ", this.services.uploadDocumentEditSPPM)
                console.log("this.services.uploadDocumentEditSPVOP =====> ", this.services.uploadDocumentEditSPVOP)
                console.log("this.services.uploadDocumentEditSSPD =====> ", this.services.uploadDocumentEditSSPD)
                console.log("this.services.uploadDocumentEditSDDAKT =====> ", this.services.uploadDocumentEditSDDAKT)
                console.log("this.services.uploadDocumentEditPPARBT =====> ", this.services.uploadDocumentEditPPARBT)
                console.log('submit')
                this.ajukan()
            }
        })
    }
  }

  ajukan(){
    this.services.ajukan.jenisPengajuan = 'TU';
    this.services.ajukan.insertBy = this.user?.userId ? this.user.userId : '';
    this.services.ajukan.document = [
      { docId: this.services.uploadDocumentEditSPM.docId },
      { docId: this.services.uploadDocumentEditSPP.docId },
      { docId: this.services.uploadDocumentEditRSPP.docId },
      { docId: this.services.uploadDocumentEditSPPM.docId },
      { docId: this.services.uploadDocumentEditSPVOP.docId },
      { docId: this.services.uploadDocumentEditSSPD.docId },
      { docId: this.services.uploadDocumentEditSDDAKT.docId },
      { docId: this.services.uploadDocumentEditPPARBT.docId }
    ];
    console.log("body service add pengajuan =====> ", this.services.ajukan)
    this.services.postDocument('pengajuan/addPengajuan', this.services.ajukan).subscribe(result => {
      console.log("Hasil Pengajuan =========> ", result.body.data);
      if (result.status == HttpStatusCode.Ok) {
        Swal.fire({
          icon: 'success',
          text: result.body.message,
          showCancelButton: false,
          confirmButtonText: 'Ok',
          showCloseButton: false,
        }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/external/590010000']);
            } 
        })
      } else if (result.status == HttpStatusCode.GatewayTimeout) {
        Swal.fire({
          icon: 'error',
          text: `Pengajuan Gagal, Connection problem, try again`
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: `Pengajuan Gagal, Connection problem, try again`
        });
      }
    });
  }

}