import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MainServiceService } from 'src/app/services/main-service.service';
import { credential } from 'src/app/lib/security';
import { ActivatedRoute, Router } from '@angular/router';

export interface Pengajuan {
  requestor: string;
  jenisPengajuan: string;
  noPengajuan: string;
  insertDate: string;
  currentProcess: string;
  status:string;
}

@Component({
  selector: 'app-lacak-pengajuan',
  templateUrl: './lacak-pengajuan.component.html',
  styleUrls: ['./lacak-pengajuan.component.css']
})
export class LacakPengajuanComponent implements OnInit {

  parameter = {
    "username": "",
    "level": ""
  }

  user: any;

  constructor(
    public services: MainServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = JSON.parse(credential.storage.get('user')); 
  }

  displayedColumns: string[] = ['requestor', 'jenisPengajuan', 'noPengajuan', 'insertDate', 'currentProcess', 'action'];
  dataSource!: MatTableDataSource<Pengajuan>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngOnInit(): void {
    console.log(this.user);
    this.parameter.username = this.user.userId;
    this.parameter.level = this.user.level;
    this.services.postDocument('pengajuan/todolist', this.parameter).subscribe(result => {
      const data: Pengajuan[] = result?.body?.data || []; // Ambil data dari respons

      // Ubah nilai kolom jenisPengajuan menjadi "Ganti Uang"
      data.forEach((pengajuan: Pengajuan) => {
        if (pengajuan.jenisPengajuan === 'GU') {
          pengajuan.jenisPengajuan = 'Pengajuan Ganti Uang';
        } else if (pengajuan.jenisPengajuan === 'BTT'){
          pengajuan.jenisPengajuan = 'Pengajuan Belanja Tidak Terduga';
        } else if (pengajuan.jenisPengajuan === 'ADD'){
          pengajuan.jenisPengajuan = 'Pengajuan ADD/DD/DBH';
        } else if (pengajuan.jenisPengajuan === 'BL'){
          pengajuan.jenisPengajuan = 'Pengajuan Belanja Langsung';
        } else if (pengajuan.jenisPengajuan === 'TU'){
          pengajuan.jenisPengajuan = 'Pengajuan Tambahan Uang';
        } else if (pengajuan.jenisPengajuan === 'LS'){
          pengajuan.jenisPengajuan = 'Pengajuan Barang dan Jasa';
        } 

        switch (pengajuan.status) {
          case '0':
            pengajuan.status = 'Request';
            break;
          case '1':
            pengajuan.status = 'Proses Approval';
            break;
          case '2':
            pengajuan.status = 'Revisi';
            break;
          default:
            pengajuan.currentProcess = 'Approved';
            break;
        }
        // Ambil tanggal saja dari kolom insertDate
        pengajuan.insertDate = pengajuan.insertDate.split(' ')[0];
      });

      console.log("isi table",result.body.data);
      this.dataSource = new MatTableDataSource<Pengajuan>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  showDetails(pengajuan: Pengajuan) {
    // console.log(pengajuan)
    if (pengajuan.status === 'Revisi'){
      this.router.navigate(['/revisi/detail', pengajuan.noPengajuan], { relativeTo: this.route });
    } else {
      this.router.navigate(['/lacak/detail', pengajuan.noPengajuan], { relativeTo: this.route });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
