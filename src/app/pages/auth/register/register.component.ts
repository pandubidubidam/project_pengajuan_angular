import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.validateInput();
  }

  validateInput() {
    let alphabets: any = Validators.pattern(/^[a-zA-Z ]*$/);
    let emoji: any = Validators.pattern(/[\u0020-\u007e\u00a0-\u00ff\u0152\u0153\u0178]/);
    this.form = this.formBuilder.group(
      {
        firstName: ['', [alphabets, emoji, Validators.required]],
        lastName: ['', [alphabets, emoji, Validators.required]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]*$/), Validators.maxLength(15)]],
        email: ['', [emoji, Validators.required, Validators.email]],
        password: ['', [emoji, Validators.required]],
        confirmPassword: ['', [emoji, Validators.required]]
      },
    );
  }

  ngOnInit(): void {

  }

  onSubmit() {

  }

}
