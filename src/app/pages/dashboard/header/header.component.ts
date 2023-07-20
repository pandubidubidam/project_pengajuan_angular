import { Component, Inject } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { credential } from 'src/app/lib/security';
import { DialogUserData } from 'src/app/models/profile-dialog.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isPhone: boolean = false;
  user: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
  ) {
    this.user = JSON.parse(credential.storage.get('user'));
    this.detectScreenSize();
  }

  detectScreenSize() {
    this.breakpointObserver.observe([
        "(max-width: 360px)"
      ]).subscribe((result: BreakpointState) => {
        if (result.matches) {
            this.isPhone = true;
        } else {
            this.isPhone = false;
        }
      });
  }

  openProfil() {
    this.dialog.open(ProfilDialog, {
      data: this.user,
      width: '600px',
      scrollStrategy: new NoopScrollStrategy()
    });
  }

  logout() {
    this.dialog.open(ConfirmLogout, {
      scrollStrategy: new NoopScrollStrategy()
    });
  }

}

@Component({
  selector: 'profil-dialog',
  templateUrl: './profil-dialog.html',
  styleUrls: ['./header.component.css']
})
export class ProfilDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogUserData
  ) {}
}

@Component({
  selector: 'confirm-logout',
  templateUrl: './confirm-logout.html',
  styleUrls: ['./header.component.css']
})
export class ConfirmLogout {
  constructor(
    public dialogRef: MatDialogRef<ConfirmLogout>,
    private router: Router
  ) {}
  
  noClick() {
    this.dialogRef.close();
  }

  yesClick() {
    credential.storage.delete('user');
    credential.storage.delete('menu');
    this.dialogRef.close();
    this.router.navigate(['auth/login']);
  }
}
