import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userDetail: any = {};
  IsLoginDisable:boolean=false;
  loading = false;
  constructor(private formBuilder: FormBuilder,private router: Router,) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, [Validators.required]]
    });
  }

   // helpers for View
   isControlValid(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];
    return control.valid && (control.dirty);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.controls[controlName];
    return control.invalid && (control.dirty);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.loginForm.controls[controlName];
    return control.hasError(validation) && (control.dirty);
  }

  isControlTouched(controlName): boolean {
    const control = this.loginForm.controls[controlName];
    return control.dirty || control.touched;
  }

  onSubmit() {
    this.IsLoginDisable=true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.redirectToLogin();
  }

  redirectToLogin()
  {
//Implement the Login logic If already user then login else create profile
this.router.navigate(['/profile']);
  }

}
