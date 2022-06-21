import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { CategoryType } from 'src/app/Enum/CategoryType';
import { ItemModel } from 'src/app/Model/ItemModel';
import { ItemService } from 'src/app/Service/ItemService';
import { ConvertEnumToList } from 'src/app/util/enumlist';

const EMPTY_ITEMDETAIL: ItemModel = {
  id: null,
  categoryId: undefined,
  name: "",
  description: ""
};


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itemDetail: ItemModel;
  itemFormGroup: FormGroup;
  categoryTypeList: any;
  @Input() detail: any;
  public id: Guid;
  constructor(private fb: FormBuilder, public modal: NgbActiveModal, private itemService: ItemService, private toastr: ToastrService,) {


  }

  ngOnInit(): void {
    this.itemDetail = EMPTY_ITEMDETAIL;
    this.loadForm();
    if (this.detail != null) {
      this.setItemData();
    }
    this.categoryTypeList = ConvertEnumToList(CategoryType)
  }

  loadForm() {
    this.itemFormGroup = this.fb.group({
      itemCategory: ['', [Validators.required]],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      id: [null, '']
    });
  }

  setItemData() {
    // Set Profile detail 
    console.log(this.detail.payload.doc.data().id, "this.detail.payload.doc.data().id");
    console.log(this.detail.payload.doc.id, "Suchin Id");
    this.itemFormGroup.setValue({
      itemCategory: this.detail.payload.doc.data().categoryId,
      name: this.detail.payload.doc.data().name,
      description: this.detail.payload.doc.data().description,
      id: this.detail.payload.doc.data().id
    });
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.itemFormGroup.controls[controlName];
    return control.valid && (control.dirty);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.itemFormGroup.controls[controlName];
    return control.invalid && (control.dirty);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.itemFormGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty);
  }

  isControlTouched(controlName): boolean {
    const control = this.itemFormGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  //This method is use for the create add/update model
  private prepareItemDetail() {
    const formData = this.itemFormGroup.value;
    this.itemDetail.categoryId = formData.itemCategory;
    this.itemDetail.name = formData.name;
    this.itemDetail.description = formData.description;
    let newId: any = Guid.create();
    if (this.detail == undefined) {
      this.itemDetail.id = newId.value;
    }
    else {
      this.itemDetail.id = this.detail.payload.doc.id;
    }
  }

  save() {
    if (this.itemFormGroup.invalid) {
      return;
    }
    if (this.detail != null) {
      this.update();
    }
    else {
      this.prepareItemDetail();
      this.create();
    }
  }

  update() {
    this.prepareItemDetail();
    this.itemService.updateItem(this.itemDetail).then((res) => {           
      // this.toastr.success("Item Update successfully");
      this.modal.close();
      alert("Item Update successfully");
    });
  }

  create() {
    this.itemService.createItem(this.itemDetail).then(res => {
      if (res.id != null) {
        this.modal.close();
        alert("Item add successfully");
        // this.toastr.success("Item add successfully");
      }
    });
  }
}
