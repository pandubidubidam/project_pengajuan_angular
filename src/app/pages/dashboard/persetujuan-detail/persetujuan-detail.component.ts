import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MainServiceService } from 'src/app/services/main-service.service';

export interface Dokumen {
  radioButton: boolean;
  nomor: string;
  namaDokumen: string;
  notes: string;
  docId: string;
  docCode: string;
  isChecked: boolean;
  radioButtonStatus: string;
}

@Component({
  selector: 'app-persetujuan-detail',
  templateUrl: './persetujuan-detail.component.html',
  styleUrls: ['./persetujuan-detail.component.css']
})
export class PersetujuanDetailComponent implements OnInit {

  noPengajuan: string | null = null;
  dataSource!: MatTableDataSource<Dokumen>;
  displayedColumns: string[] = ['nomor', 'namaDokumen', 'action', 'checklist', 'radioButton', 'notes'];
  parameter = {
    "docId": "",
    "docCode": "",
    "noPengajuan": ""
  }

  // Properti tambahan untuk menyimpan status checkbox dan radio button
  allDokumenBacaChecked: boolean = false;
  allRadioSesuaiSelected: boolean = false;

  // Properti tambahan untuk menyimpan jumlah checkbox yang dicek dan jumlah radio button "Sesuai" yang dipilih
  jumlahCheckboxChecked: number = 0;
  jumlahRadioSesuaiSelected: number = 0;

  constructor(
    private route: ActivatedRoute,
    public services: MainServiceService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Dokumen>([]);

    this.route.paramMap.subscribe(params => {
      const noPengajuan = params.get('noPengajuan');
      if (noPengajuan) {
        this.noPengajuan = noPengajuan;
        this.services.get(`pengajuan/${this.noPengajuan}`).subscribe(result => {
          const documentData = result.body.data.document;
          const length = documentData.length;
          console.log('detail >>>>', documentData);

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
              nomor,
              namaDokumen,
              notes: doc.notes,
              docId: doc.docId,
              docCode: doc.docCode,
              isChecked: false
            };
          });

          this.dataSource = new MatTableDataSource<Dokumen>(data);
        });
      }
    });
  }

  viewDocument(item: Dokumen) {
    const docCode = item.docCode;
    const docId = item.docId;
    const noPengajuan = this.noPengajuan;
  
    this.parameter.docCode = docCode;
    this.parameter.noPengajuan = noPengajuan!;
    this.parameter.docId = docId;
    console.log('parameter view>>>', this.parameter);
  
    this.services.postDocument('pengajuan/getDocument', this.parameter).subscribe(result => {
      console.log("Balikan get getDocument =========> ", result.body.data.docValue);
      const imageDocumentEdit: any = '';
      let uploadDocumentEdit = {
        docId: "",
        docCode: "",
        docValue: imageDocumentEdit,
        filename: "",
        extension: "",
        insertBy: "",
        updateBy: ""
      };
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
  }

  downloadDocument(item: Dokumen) {
    const docCode = item.docCode;
    const docId = item.docId;
    const noPengajuan = this.noPengajuan;
  
    this.parameter.docCode = docCode;
    this.parameter.noPengajuan = noPengajuan!;
    this.parameter.docId = docId;
    console.log('parameter download>>>', this.parameter);
  
    this.services.postDocument('pengajuan/getDocument', this.parameter).subscribe(result => {
      console.log("Balikan get getDocument =========> ", result.body.data.docValue);
      const imageDocumentEdit: any = '';
      let uploadDocumentEdit = {
        docId: "",
        docCode: "",
        docValue: imageDocumentEdit,
        filename: "",
        extension: "",
        insertBy: "",
        updateBy: ""
      };
      uploadDocumentEdit.docValue = result.body.data.docValue;
  
      const balikanbase64 = uploadDocumentEdit.docValue;
  
      const byteCharacters = atob(balikanbase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
  
      const filename = `${item.namaDokumen}.pdf`;
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = filename;
      downloadLink.click();
    });
  }

  // Fungsi untuk mengecek apakah semua checkbox "Dokumen ini telah saya baca" tercentang dan semua radio button "Sesuai" dipilih
  isDokumenBacaCheckedAndRadioButtonSesuai(): boolean {
    return this.dataSource.data.every(dokumen => dokumen.isChecked && dokumen.radioButtonStatus === 'Sesuai');
  }

  // Fungsi untuk mengecek apakah ada radio button "Tidak Sesuai" yang dipilih
  isRadioButtonTidakSesuaiSelected(): boolean {
    return this.dataSource.data.some(dokumen => dokumen.radioButtonStatus === 'Tidak Sesuai');
  }
}
