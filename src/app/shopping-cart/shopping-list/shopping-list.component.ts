import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryType } from 'src/app/Enum/CategoryType';
import { ItemService } from 'src/app/Service/ItemService';
import { ConvertEnumToList } from 'src/app/util/enumlist';
import { categoryName } from 'src/app/util/enumPipe';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  providers: [categoryName],
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  loading: boolean = false;
  itemList: any;
  withoutFilterItemList: any;
  categoryTypeList: any;
  userId: any;
  searchFormGroup: FormGroup;
  constructor(private modalService: NgbModal, private itemService: ItemService, private toastr: ToastrService, private categoryName: categoryName,
    private angularFireAuth: AngularFireAuth, private fb: FormBuilder) {
    this.angularFireAuth.user.subscribe(res => {
      if (res)
        this.userId = res.uid;
    });
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      CategoryId: ''
    });
    this.categoryTypeList = [{ id: 1, name: 'Uninterruptible Power Supply' },
    { id: 2, name: 'Uninterruptible' },
    { id: 3, name: 'Power Supply' },
    { id: 4, name: 'Energy' }]
    this.getItemList();
  }

  // Upload new document
  appendItemDetail() {
    const modalRef = this.modalService.open(AddItemComponent, { size: 'md', backdrop: 'static', keyboard: false });
    modalRef.result.then((data) => {
      // this.loadData();
    })
  }

  getItemList() {
    this.itemService
      .getItem()
      .subscribe((res) => {
        this.itemList = res;
        this.withoutFilterItemList = res;
      }
      );
  }

  deleteItem(item) {
    this.itemService.deleteItem(item).then((res) => {
      alert("Item delete successfully");
      // this.toastr.success("Item delete successfully");
    });;
  }

  update(item) {
    const modalRef = this.modalService.open(AddItemComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.detail = item;
    modalRef.result.then((data) => {
      // this.loadData();
    })
  }

  onSelectionChange() {
    const formData = this.searchFormGroup.value;
    if (formData.CategoryId != "") {
      let id = parseInt(formData.CategoryId);
      this.itemList = this.withoutFilterItemList.filter(s => s.payload.doc.data().categoryId == id);
    }
    else {
      this.itemList = this.withoutFilterItemList;
    }
  }
}
