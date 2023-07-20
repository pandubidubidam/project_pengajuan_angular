import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-pengajuan',
  templateUrl: './new-pengajuan.component.html',
  styleUrls: ['./new-pengajuan.component.css']
})
export class NewPengajuanComponent implements OnInit {

  constructor(private router:Router) { }

  goToPage(route: string) {
    this.router.navigateByUrl(route);
  }

  ngOnInit(): void {
  }

}
