import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MainServiceService } from 'src/app/services/main-service.service';
import { HttpStatusCode } from '@angular/common/http';
import { GlobalHelper } from 'src/app/helpers/global-helper';
import { credential } from 'src/app/lib/security';
import { Router } from '@angular/router';
import { DocumentElement } from 'src/app/models/document';
import Swal from 'sweetalert2';

export interface Dokumen {
  namaDokumen: string;
  notes: string;
  docId: string;
  docCode: string;
  status: boolean;
  jenisPengajuan: string;
}

@Component({
  selector: 'app-revisi',
  templateUrl: './revisi.component.html',
  styleUrls: ['./revisi.component.css']
})
export class RevisiComponent implements OnInit {

  selectedItem: Dokumen | null = null;
  selectedFiles: any = undefined;
  noPengajuan: string | null = null;
  dataSource!: MatTableDataSource<Dokumen>;
  displayedColumns: string[] = ['namaDokumen', 'action', 'notes'];
  parameter = {
    "docId": "",
    "docCode": "",
    "noPengajuan": ""
  }
  user: any;
  documentParam = new DocumentElement();

  constructor(
    private route: ActivatedRoute,
    public services: MainServiceService,
    private globalHelper: GlobalHelper,
    private router: Router
  ) {this.user = JSON.parse(credential.storage.get('user'));}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Dokumen>([]);
    this.route.paramMap.subscribe(params => {
      const noPengajuan = params.get('noPengajuan');
      if (noPengajuan) {
        this.noPengajuan = noPengajuan;
        this.services.get(`pengajuan/${this.noPengajuan}`).subscribe(result => {
          const jenisPengajuan = result.body.data.jenisPengajuan;
          const documentData = result.body.data.document;
          const length = documentData.length;
          console.log('detail >>>>', documentData);
          console.log('jenisPengajuan >>>>', jenisPengajuan);
          // Ubah data dokumen menjadi objek Dokumen
          const data: Dokumen[] = documentData.map((doc: any, index: number) => {
            const nomor = (index + 1).toString();
            let namaDokumen = '';
            switch (doc.docCode) {
              case '1':
                namaDokumen = 'SPM';
                break;
              case '2':
                namaDokumen = 'Surat Permintaan Pembayaran';
                break;
              case '3':
                namaDokumen = 'Rincian SPP';
                break;
              case '4':
                namaDokumen = 'Surat Pernyataan Pertanggungjawaban Mutlak';
                break;
              case '5':
                namaDokumen = 'Surat Pernyataan Verifikasi Oleh PPK SKPD/PPK Unit SKPD';
                break;
              case '6':
                namaDokumen = 'Salinan SPD';
                break;
              case '7':
                namaDokumen = 'Salinan/DPA/DPPA Atas Kegiatan Terkait';
                break;
              case '8':
                namaDokumen = 'Laporan Pertanggujawaban (LPJ) UP';
                break;
              case '9':
                namaDokumen = 'Checklist Kelengkapan Dokumen dari SKPD';
                break;
              case '10':
                namaDokumen = 'Salinan Referensi Bank';
                break;
              case '11':
                namaDokumen = 'Rincian Kebutuhan Belanja atau Dokumen lain yg Dipersamakan';
                break;
              case '12':
                namaDokumen = 'Surat Pernyataan Kelengkapan Dokumen dari Dinas Teknis Terkait';
                break;
              case '13':
                namaDokumen = 'Surat Rekomendasi dari Camat yang Membawahi Desa Terkait';
                break;
              case '14':
                namaDokumen = 'Persetujuan PPKD Atas Rincian Belanja TU';
                break;
              case '15':
                namaDokumen = 'Surat Pernyataan Verifikasi';
                break;
              case '16':
                namaDokumen = 'Lampiran yang Disesuaikan';
                break;
              case '17':
                namaDokumen = 'Ringkasan Kontrak atau Dokumen Lain yang Dipersamakan';
                break;
              case '18':
                namaDokumen = 'SPP Potongan Pajak KASDA/Cetakan E-Billing';
                break;
              case '19':
                namaDokumen = 'Salinan Referensi Bank Tahun Berjalan';
                break;
              case '20':
                namaDokumen = 'Salinan NPWP';
                break;
              case '21':
                namaDokumen = 'Berita Acara Serah Terima Barang/Jasa Dari Penyedia';
                break;
              case '22':
                namaDokumen = 'Berita Acara Pembayaran';
                break;
              case '23':
                namaDokumen = 'Jaminan Uang Muka/Jaminan Pelaksanaan/Jaminan Pemeliharaan 100%';
                break;
              default:
                namaDokumen = '';
                break;
            }
            return {
              namaDokumen,
              notes: doc.notes,
              docId: doc.docId,
              docCode: doc.docCode,
              status: doc.status,
              jenisPengajuan: jenisPengajuan
            };
          });

          this.dataSource = new MatTableDataSource<Dokumen>(data);
        });
      }
    });
  }

  async viewDocument(item: Dokumen) {
    this.selectedItem = item;
    if (item.status === true) {
      const docCode = item.docCode;
      const docId = item.docId;
      const noPengajuan = this.noPengajuan;
  
      this.parameter.docCode = docCode;
      this.parameter.noPengajuan = noPengajuan!;
      this.parameter.docId = docId;
      console.log('parameter view>>>', this.parameter);
  
      this.services.postDocument('pengajuan/getDocument', this.parameter).subscribe(result => {
        console.log("Balikan get getDocument =========> ", result.body.data.docValue);
  
        let uploadDocumentEdit = this.getDocumentUploadObject(docCode);
        uploadDocumentEdit.docValue = result.body.data.docValue;
  
        const balikanbase64 = uploadDocumentEdit.docValue;
        const byteCharacters = atob(balikanbase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
  
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      });
    } else {
      let uploadDocumentEdit = this.getDocumentUploadObject(item.docCode);
      const balikanbase64 = uploadDocumentEdit.docValue;
      const byteCharacters = atob(balikanbase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
  
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank');
    }
  }

  async uploadDocument(event: any, item: Dokumen) {
    this.selectedItem = item;
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
  
          const convertedDocument = await this.globalHelper.toBase64(this.selectedFiles);
          console.log("convertedDocument =========> ", convertedDocument);
  
          const uploadDocument = this.getDocumentUploadObject(item.docCode);
          uploadDocument.filename = this.selectedFiles.name;
          uploadDocument.extension = `.${this.selectedFiles.name.replace(/^.*\./, '').toUpperCase()}`;
          uploadDocument.insertBy = this.user?.userId ? this.user.userId : '';
          uploadDocument.updateBy = this.user?.userId ? this.user.userId : '';
          uploadDocument.docValue = convertedDocument;
          uploadDocument.docCode = item.docCode;
  
          this.services.postDocument('pengajuan/uploadDocument', uploadDocument).subscribe(result => {
            console.log("Hasil Upload =========> ", result.body.data);
            if (result.status == HttpStatusCode.Ok) {
              Swal.fire({
                icon: 'success',
                text: result.body.msg_desc
              });
              this.updateDocumentUploadObject(item.docCode, result.body.data);
              console.log(`set Hasil Upload =========> `, this.services.uploadDocumentRevisi);
            } else if (result.status == HttpStatusCode.GatewayTimeout) {
              Swal.fire({
                icon: 'error',
                text: `Gagal upload dokumen, silahkan upload kembali`
              });
            } else {
              Swal.fire({
                icon: 'error',
                text: `Gagal upload dokumen, silahkan upload kembali`
              });
            }
          });
        } else {
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
  
  getDocumentUploadObject(docCode: string): any {
    const documentUploadObject = this.services.uploadDocumentRevisi;
  
    switch (docCode) {
      case '1':
        return this.services.uploadDocumentEditSPM;
      case '2':
        return this.services.uploadDocumentEditSPP;
      case '3':
        return this.services.uploadDocumentEditRSPP;
      case '4':
        return this.services.uploadDocumentEditSPPM;
      case '5':
        return this.services.uploadDocumentEditSPVOP;
      case '6':
        return this.services.uploadDocumentEditSSPD;
      case '7':
        return this.services.uploadDocumentEditSDDAKT;
      case '8':
        return this.services.uploadDocumentEditLPJUP;
      case '9':
        return this.services.uploadDocumentEditCKDDS;
      case '10':
        return this.services.uploadDocumentEditSRB;
      case '11':
        return this.services.uploadDocumentEditRKBAD;
      case '12':
        return this.services.uploadDocumentEditSPKDDDT;
      case '13':
        return this.services.uploadDocumentEditSRDC;
      case '14':
        return this.services.uploadDocumentEditPPARBT;
      case '15':
        return this.services.uploadDocumentEditSPVER;
      case '16':
        return this.services.uploadDocumentEditLYDS;
      case '17':
        return this.services.uploadDocumentEditRKAD;
      case '18':
        return this.services.uploadDocumentEditSPPKCE;
      case '19':
        return this.services.uploadDocumentEditSRBTB;
      case '20':
        return this.services.uploadDocumentEditSNPWP;
      case '21':
        return this.services.uploadDocumentEditBASTB;
      case '22':
        return this.services.uploadDocumentEditBAPEM;
      case '23':
        return this.services.uploadDocumentEditJUMJM;
      default:
        return documentUploadObject;
    }
  }

  updateDocumentUploadObject(docCode: string, data: any) {
    switch (docCode) {
      case '1':
        this.services.uploadDocumentEditSPM = data;
        break;
      case '2':
        this.services.uploadDocumentEditSPP = data;
        break;
      case '3':
        this.services.uploadDocumentEditRSPP = data;
        break;
      case '4':
        this.services.uploadDocumentEditSPPM = data;
        break;
      case '5':
        this.services.uploadDocumentEditSPVOP = data;
        break;
      case '6':
        this.services.uploadDocumentEditSSPD = data;
        break;
      case '7':
        this.services.uploadDocumentEditSDDAKT = data;
        break;
      case '8':
        this.services.uploadDocumentEditLPJUP = data;
        break;
      case '9':
        this.services.uploadDocumentEditCKDDS = data;
        break;
      case '10':
        this.services.uploadDocumentEditSRB = data;
        break;
      case '11':
        this.services.uploadDocumentEditRKBAD = data;
        break;
      case '12':
        this.services.uploadDocumentEditSPKDDDT = data;
        break;
      case '13':
        this.services.uploadDocumentEditSRDC = data;
        break;
      case '14':
        this.services.uploadDocumentEditPPARBT = data;
        break;
      case '15':
        this.services.uploadDocumentEditSPVER = data;
        break;
      case '16':
        this.services.uploadDocumentEditLYDS = data;
        break;
      case '17':
        this.services.uploadDocumentEditRKAD = data;
        break;
      case '18':
        this.services.uploadDocumentEditSPPKCE = data;
        break;
      case '19':
        this.services.uploadDocumentEditSRBTB = data;
        break;
      case '20':
        this.services.uploadDocumentEditSNPWP = data;
        break;
      case '21':
        this.services.uploadDocumentEditBASTB = data;
        break;
      case '22':
        this.services.uploadDocumentEditBAPEM = data;
        break;
      case '23':
        this.services.uploadDocumentEditJUMJM = data;
        break;
      default:
        break;
    }
  }
  
  submit() {
    // Ambil item dengan status false dari dataSource
  const itemsWithStatusFalse = this.dataSource.data.filter(item => item.status === false);
  console.log('Item dengan status false:', itemsWithStatusFalse);

  // Ambil array docCode dari itemsWithStatusFalse
  const docCodesWithStatusFalse = itemsWithStatusFalse.map(item => item.docCode);
  console.log('DocCode dari items dengan status false:', docCodesWithStatusFalse);

  // Loop melalui setiap docCode dan dapatkan uploadDocument untuk setiap docCode
  const uploadedDocuments: any[] = [];
  for (const docCode of docCodesWithStatusFalse) {
    const uploadedDocument = this.getDocumentUploadObject(docCode);
    uploadedDocuments.push(uploadedDocument);
  }
  console.log('Uploaded Documents dengan status false:', uploadedDocuments);
  for (const docCode of docCodesWithStatusFalse) {
    const uploadedDocument = this.getDocumentUploadObject(docCode);
    if (!uploadedDocument || uploadedDocument.docValue.length < 1) {
      let dokumenText = '';
        switch (docCode) {
          case '1':
            dokumenText = 'SPM';
            break;
          case '2':
            dokumenText = 'Surat Permintaan Pembayaran';
            break;
          case '3':
            dokumenText = 'Rincian SPP';
            break;
          case '4':
            dokumenText = 'Surat Pernyataan Pertanggungjawaban Mutlak';
            break;
          case '5':
            dokumenText = 'Surat Pernyataan Verifikasi Oleh PPK SKPD/PPK Unit SKPD';
            break;
          case '6':
            dokumenText = 'Salinan SPD';
            break;
          case '7':
            dokumenText = 'Salinan/DPA/DPPA Atas Kegiatan Terkait';
            break;
          case '8':
            dokumenText = 'Laporan Pertanggujawaban (LPJ) UP';
            break;
          case '9':
            dokumenText = 'Checklist Kelengkapan Dokumen dari SKPD';
            break;
          case '10':
            dokumenText = 'Salinan Referensi Bank';
            break;
          case '11':
            dokumenText = 'Rincian Kebutuhan Belanja atau Dokumen lain yg Dipersamakan';
            break;
          case '12':
            dokumenText = 'Surat Pernyataan Kelengkapan Dokumen dari Dinas Teknis Terkait';
            break;
          case '13':
            dokumenText = 'Surat Rekomendasi dari Camat yang Membawahi Desa Terkait';
            break;
          case '14':
            dokumenText  = 'Persetujuan PPKD Atas Rincian Belanja TU';
            break;
          case '15':
            dokumenText = 'Surat Pernyataan Verifikasi';
            break;
          case '16':
            dokumenText = 'Lampiran yang Disesuaikan';
            break;
          case '17':
            dokumenText = 'Ringkasan Kontrak atau Dokumen Lain yang Dipersamakan';
            break;
          case '18':
            dokumenText = 'SPP Potongan Pajak KASDA/Cetakan E-Billing';
            break;
          case '19':
            dokumenText = 'Salinan Referensi Bank Tahun Berjalan';
            break;
          case '20':
            dokumenText = 'Salinan NPWP';
            break;
          case '21':
            dokumenText = 'Berita Acara Serah Terima Barang/Jasa Dari Penyedia';
            break;
          case '22':
            dokumenText = 'Berita Acara Pembayaran';
            break;
          case '23':
            dokumenText = 'Jaminan Uang Muka/Jaminan Pelaksanaan/Jaminan Pemeliharaan 100%';
            break;
          default:
            dokumenText = 'Dokumen dengan docCode ' + docCode;
            break;
        }        
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: dokumenText + ' Harus Di Upload!',
        });
        return; // Jika dokumen belum di-upload, hentikan proses dan tampilkan pesan error
    }
  }
  // Tampilkan konfirmasi sebelum melakukan submit jika semua dokumen telah di-upload
    Swal.fire({
      title: 'Apakah Anda yakin ingin update data?',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      allowOutsideClick: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("upload dokumen =====> ", uploadedDocuments)
        console.log('submit')
        this.revisi(uploadedDocuments);
      }
    });
  }
  

  revisi(uploadedDocuments: any[]) {
    console.log(uploadedDocuments);
  
    // Ambil array jenisPengajuan dari dataSource
    const jenisPengajuan = this.dataSource.data.map(item => item.jenisPengajuan);
    console.log('Jenis Pengajuan:', jenisPengajuan);
  
    // Mengatur jenisPengajuan dan noPengajuan dari service revisi
    this.services.revisi.jenisPengajuan = jenisPengajuan[0];
    this.services.revisi.noPengajuan = this.noPengajuan!;
  
    // Mengatur insertBy dari service ajukan
    this.services.revisi.insertBy = this.user?.userId ? this.user.userId : '';
  
    // Mengambil array docId dari uploadedDocuments
    const docIds = uploadedDocuments.map(doc => ({ docId: doc.docId }));
  
    // Mengatur array document dari service ajukan
    this.services.revisi.document = docIds;
  
    console.log("body service revisi =====> ", this.services.revisi)
    this.services.postDocument('pengajuan/updatePengajuan', this.services.revisi).subscribe(result => {
      console.log("Hasil Revisi =========> ", result.body.data);
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
          text: `Revisi Gagal, Connection problem, try again`
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: `Revisi Gagal, Connection problem, try again`
        });
      }
    });
  }

}
