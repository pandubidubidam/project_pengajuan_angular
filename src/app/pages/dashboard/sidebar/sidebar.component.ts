import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ListMenu } from 'src/app/lib/list-menu';
import { credential } from 'src/app/lib/security';
import { Avatar } from 'src/app/models/avatar.model';
import { AvatarImages } from 'src/app/consts/avatar-images';
import { Menu } from 'src/app/models/menu.model';
import { DataInfoLogin } from 'src/app/models/response.model';
import { LoadingService } from 'src/app/shared/loader/loading.service';
import { environment } from 'src/environments/environment';
import { DataDialogAvatar } from 'src/app/models/data-dialog-avatar.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  todayDate: Date = new Date();
  version: string = '';
  toggleIcon: boolean = true;
  safeSrc: SafeResourceUrl;
  treeControl = new NestedTreeControl<Menu>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Menu>();
  activeNode: any;
  exactUrl: string = '';
  prntCode: string = '';
  user: DataInfoLogin;
  menu!: Menu[];
  role: any;
  mode: any;
  avatar: Avatar[] = [];
  avatarSelected!: Avatar;
  selectedIndex!: number;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sanitizer: DomSanitizer,
    private loading: LoadingService,
    public dialog: MatDialog
  ) {
    this.detectScreenSize();
    this.version = environment.VERSION.version;
    this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.exactUrl);
    this.user = JSON.parse(credential.storage.get('user'));
    this.role = JSON.parse(credential.storage.get('role'));
    console.log("========>",this.user);
    console.log("========>",this.role);
    this.menu = [
      {
        "menuCode": "590000000",
        "menuName": "Pengajuan",
        "details": [
          {
            "functionCode": "view",
            "functionName": "View",
            "functionMethod": "GET,POST,PUT,UPDATE,DELETE",
            "functionPath": "/external/590000000",
            "parentCode": "510000000"
          }
        ],
        "icon": "menu",
        "url": "/external/590000000",
        "children": [
          {
            "menuCode": "590010000",
            "menuName": "Pengajuan Baru",
            "details": [
              {
                "functionCode": "view",
                "functionName": "View",
                "functionMethod": "GET,POST,PUT,UPDATE,DELETE",
                "functionPath": "/external/590010000",
                "parentCode": "590000000"
              }
            ],
            "icon": "assignment",
            "url": "/external/590010000"
          },
          {
            "menuCode": "590020000",
            "menuName": "Persetujuan",
            "details": [
              {
                "functionCode": "view",
                "functionName": "View",
                "functionMethod": "GET,POST,PUT,UPDATE,DELETE",
                "functionPath": "/external/590020000",
                "parentCode": "590000000"
              }
            ],
            "icon": "history_edu",
            "url": "/external/590020000"
          },
          {
            "menuCode": "590030000",
            "menuName": "Lacak Pengajuan",
            "details": [
              {
                "functionCode": "view",
                "functionName": "View",
                "functionMethod": "GET,POST,PUT,UPDATE,DELETE",
                "functionPath": "/external/590030000",
                "parentCode": "590000000"
              }
            ],
            "icon": "content_paste_search",
            "url": "/external/590030000"
          }
        ]
      }
    ];

    if (this.role === "Requestor") {
      // Menyembunyikan child menu "Persetujuan"
      this.menu[0].children = this.menu[0].children?.filter(child => child.menuName !== "Persetujuan");
    } else if (this.role.includes("Approver")) {
      // Menyembunyikan child menu "Pengajuan Baru" dan "Lacak Pengajuan"
      this.menu[0].children = this.menu[0].children?.filter(child => child.menuName !== "Pengajuan Baru" && child.menuName !== "Lacak Pengajuan");
    } else {
      this.menu;
    }

    this.dataSource.data = this.menu;
    this.setAvatar();
  }

  detectScreenSize() {
    this.breakpointObserver.observe([
        "(max-width: 768px)"
      ]).subscribe((result: BreakpointState) => {
        if (result.matches) {
            this.mode = 'over'
        } else {
            this.mode = 'side';
        }
      });
  }

  ngOnInit(): void {}

  hasChild = (_: number, node: Menu) => !!node.children && node.children.length > 0;

  logoClicked() {
    window.location.reload();
  }

  setAvatar() {
    this.avatar = AvatarImages;
    if(credential.storage.get('index-avatar')) {
      this.selectedIndex = parseInt(credential.storage.get('index-avatar')); 
      this.avatar.forEach((element, index) => {
        if(index === this.selectedIndex) {
          this.avatarSelected = {
            sourceImg: element.sourceImg,
            imgAlt: element.imgAlt
          }
        }
      })
    }else {
      this.selectedIndex = 0;
      credential.storage.set('index-avatar', this.selectedIndex.toString());
      this.avatar.forEach((element, index) => {
        if(index === this.selectedIndex) {
          this.avatarSelected = {
            sourceImg: element.sourceImg,
            imgAlt: element.imgAlt
          }
        }
      })
    }
  }

  editAvatar() {
    const dialogRef = this.dialog.open(AvatarDialog, {
      data: {
        source: this.avatar, 
        index: this.selectedIndex
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) credential.storage.set('index-avatar', result.toString()); 
      this.setAvatar();
    });
  }

  menuClicked(data: any) {
    this.loading.showLoading(true);
    setTimeout(() => {
      this.exactUrl = data.url;
      this.prntCode = data.details[data.details.length - 1].parentCode;
      this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.exactUrl);
      this.loading.showLoading(false);
    }, 1500);
  }

}

@Component({
  selector: 'avatar-dialog',
  templateUrl: './avatar-dialog.html',
  styleUrls: ['./sidebar.component.css']
})

export class AvatarDialog {

  avatars: Avatar[] = [];
  selectedIndex!: number;

  constructor(
    public dialogRef: MatDialogRef<AvatarDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialogAvatar
  ) {
    this.data.source.forEach((element) => {
      this.avatars.push(
        {
          sourceImg: element.sourceImg,
          imgAlt: element.imgAlt
        }
      )
    })
    this.selectedIndex = this.data.index;
  }

  indexAvatar(i: number) {
    this.selectedIndex = i;
  }

  onOkClick() {
    this.dialogRef.close(this.selectedIndex);
  }

}
