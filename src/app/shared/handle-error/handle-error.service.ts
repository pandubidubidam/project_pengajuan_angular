import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { LoadingService } from "src/app/shared/loader/loading.service";
// import { ToastService } from "../notif/toast.service";
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(
    private loading: LoadingService,
    private router: Router) { }

  handleErrorLogin(error: HttpErrorResponse) {
    console.log("cekcekeck",error.status);

    if (error.status === 401) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.status);
      if (error.error.status === false) {
        const waitPopUpDone = async () => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: '404 Error Service',
            showConfirmButton: false,
            timer: 1500
          })
          this.loading.showLoading(false);
        }
        waitPopUpDone();
      } else {
        const waitPopUpDone = async () => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: '404 Service Not Found',
            showConfirmButton: false,
            timer: 1500
          })
          this.loading.showLoading(false);
        } 
        waitPopUpDone();
      }
      
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
