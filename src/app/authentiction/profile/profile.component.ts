import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileDetail: any = {};
  IsProfileDisable: boolean = false;
  loading = false;
  constructor(private formBuilder: FormBuilder, private router: Router,) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.profileForm = this.formBuilder.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
    });
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.profileForm.controls[controlName];
    return control.valid && (control.dirty);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.profileForm.controls[controlName];
    return control.invalid && (control.dirty);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.profileForm.controls[controlName];
    return control.hasError(validation) && (control.dirty);
  }

  isControlTouched(controlName): boolean {
    const control = this.profileForm.controls[controlName];
    return control.dirty || control.touched;
  }

  onSubmit() {
    this.IsProfileDisable = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    this.redirectToDashboard();
  }

  redirectToDashboard() {
    //Implement the Login logic If already user then login else create profile
    this.router.navigate(['/shoppingCart/list']);
  }
}
