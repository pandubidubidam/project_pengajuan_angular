import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lacak-pengajuan-detail',
  templateUrl: './lacak-pengajuan-detail.component.html',
  styleUrls: ['./lacak-pengajuan-detail.component.css']
})
export class LacakPengajuanDetailComponent implements OnInit {

  orderStatus: string = 'appr2';
  noPengajuan: string = '001';

  constructor() { }

  ngOnInit(): void {
  }

}

