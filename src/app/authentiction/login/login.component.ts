import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
  IsLoginDisable: boolean = false;
  loading = false;
  constructor(private formBuilder: FormBuilder, private router: Router,
    private angularFireAuth: AngularFireAuth) { }

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
    this.IsLoginDisable = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.redirectToLogin();
  }

  redirectToLogin() {
    const formData = this.loginForm.value;
    this.angularFireAuth
      .signInWithEmailAndPassword(formData.username, formData.password)
      .then(res => {
        if (res) {
          localStorage.setItem("UserId",res.user.uid);        
          if (res.user.displayName == null) {
            this.router.navigate(['/profile']);
          }
          else {
            this.router.navigate(['/shoppingCart/list']);
          }
          console.log('You are Successfully logged in!');
        }
      })
      .catch(err => {
        this.IsLoginDisable = false;
        alert("User not found");
        console.log('Something is wrong:', err.message);
      });

    //Implement the Login logic If already user then login else create profile

  }

}
