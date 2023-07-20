import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  isDesktop: boolean = false;
  positionToast: string = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private toast: ToastrService
  ) {
    this.sizeScreen();
  }

  sizeScreen() {
    this.breakpointObserver.observe([
      "(max-width: 992px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
          this.isDesktop = false;
      } else {
          this.isDesktop = true;
      }
    });
    this.isDesktop == false ? this.positionToast = 'toast-top-center' : this.positionToast = 'toast-top-right';
  }

  notif(toastr: string, message: string) {
    return new Promise<void>((resolve, reject) => {
      let toastConfig: any = { timeOut: 1500, positionClass: `${this.positionToast}`, enableHtml: true };
      switch (toastr) {
        case "success":
          this.toast.success(`${message}`, `${toastr}`, toastConfig);
          break;
        case "info":
          this.toast.info(`${message}`, `${toastr}`, toastConfig);
          break;
        case "warning":
          this.toast.warning(`${message}`, `${toastr}`, toastConfig);
          break;
        case "error":
          this.toast.error(`${message}`, `${toastr}`, toastConfig);
          break;
        default:
          break;
      }
      setTimeout(() => {
        const shouldResolve = true;
        if(shouldResolve) {
            resolve();
        }else {
            reject("Error : something went wrong!");
        }
      }, 1500);
    })
  }
}
