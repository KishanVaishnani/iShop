import { Component, OnInit } from '@angular/core';
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
  providers:[categoryName],
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  loading: boolean = false;
  itemList: any;
  categoryTypeList: any;
  constructor(private modalService: NgbModal, private itemService: ItemService, private toastr: ToastrService,private categoryName:categoryName) { }

  ngOnInit(): void {
    this.categoryTypeList = ConvertEnumToList(CategoryType)
    this.getItemList();
  }

  // Upload new document
  appendItemDetail() {
    const modalRef = this.modalService.open(AddItemComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.result.then((data) => {
      // this.loadData();
    })
  }

  getItemList() {
    this.itemService
      .getItem()
      .subscribe((res) => {
        this.itemList = res;
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
}
