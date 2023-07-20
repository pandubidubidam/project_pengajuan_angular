import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";
// import { DummyDataUser } from 'src/app/consts/dummy-login-success';
import { DummyLoginFailed } from 'src/app/consts/dummy-login-failed';
import { ResponseLogin } from 'src/app/models/response.model';
import { LoadingService } from 'src/app/shared/loader/loading.service';
import { ToastService } from 'src/app/shared/notif/toast.service';
import { credential } from 'src/app/lib/security';
import { MainServiceService } from 'src/app/services/main-service.service';
import { catchError } from 'rxjs/operators';
import { HandleErrorService } from 'src/app/shared/handle-error/handle-error.service';
import Swal from 'sweetalert2'
// import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  hide: boolean = true;
  errorMessage: string = "";
  userActive?: ResponseLogin;
  service : any;
  user: any;
  role: any;
  ipAddress: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loading: LoadingService,
    private toast: ToastService,
    private services: MainServiceService,
    private route: ActivatedRoute,
    private handleError: HandleErrorService
  ) { 
    // this.userActive = DummyDataUser;
    this.toast.sizeScreen();
    let emoji: any = Validators.pattern(/[\u0020-\u007e\u00a0-\u00ff\u0152\u0153\u0178]/);
    this.form = this.formBuilder.group(
      {
        username: ['', [emoji, Validators.required]],
        password: ['', [emoji, Validators.required]]
      },
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    this.errorMessage = '';
    if(this.form.invalid) {
      return;
    }else {
      this.loading.showLoading(true);
      let parameter = {
        "username": this.form.value.username,
        "password": this.form.value.password
      }
      console.log(parameter);
      this.loading.showLoading(true);
      this.services.getDetailUserLogin('user/login', parameter,  catchError(this.handleError.handleErrorLogin.bind(this))).subscribe(result => {
        console.log("result,",result)
        if (result.body.status == true) {
          this.service = result.body.data.userId;
          this.user = result.body.data;
          this.role = result.body.data.jobDesc;
          console.log("========>",this.role);
          setTimeout(() => {
            if(this.form.value.username === this.service) {
              credential.storage.set('user', JSON.stringify(this.user));
              credential.storage.set('role', JSON.stringify(this.role));
              this.loading.showLoading(false);
              const wait = async () => {
                await this.toast.notif("success", "Login");
                this.router.navigate(['/dashboard/layout']);
              }
              wait();
            }else{
              this.loading.showLoading(false);
              this.errorMessage = result.body.result.status;
            }
          }, 1500);
        } else if (result.body.result.status == false && result.body.result.message.toLowerCase().includes('connection problem')) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Connection Problem, Please Try Again',
            showConfirmButton: false,
            timer: 1500
          })
          this.loading.showLoading(false);
        } else if (result.body.result.status == false && result.body.result.message.toLowerCase().includes('invalid')) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Nik atau Password salah',
            showConfirmButton: false,
            timer: 1500
          })
          this.loading.showLoading(false);
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'User Tidak Terdaftar',
            showConfirmButton: false,
            timer: 1500
          })
          this.loading.showLoading(false);
        }
      })
    }
  };
}