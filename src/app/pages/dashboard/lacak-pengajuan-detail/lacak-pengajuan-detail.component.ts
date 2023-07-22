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
  selector: 'app-lacak-pengajuan-detail',
  templateUrl: './lacak-pengajuan-detail.component.html',
  styleUrls: ['./lacak-pengajuan-detail.component.css']
})
export class LacakPengajuanDetailComponent implements OnInit {

  orderStatus: string | null = null;
  noPengajuan: string | null = null;

  steps: string[] = [
    '0', // Pengajuan Baru
    '1', // Approval 1
    '2', // Approval 2
    '3', // Approval 3
    '4', // Approval 4
    '5', // Approval 5
    '6', // Approval 6
    '7', // Approval 7
    '8', // Approved
  ];

  constructor(
    private route: ActivatedRoute,
    public services: MainServiceService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const noPengajuan = params.get('noPengajuan');
      if (noPengajuan) {
        this.noPengajuan = noPengajuan;
        this.services.get(`pengajuan/${this.noPengajuan}`).subscribe(result => {
          const documentData = result.body.data;
          const length = documentData.length;
          console.log('detail >>>>', documentData);
          this.orderStatus = documentData.currentProcess;
        });
      }
    });
  }

  // Fungsi untuk mendapatkan indeks langkah berdasarkan orderStatus
  getStepIndex(orderStatus: string | null): number {
    return this.steps.indexOf(orderStatus || '0');
  }
}

