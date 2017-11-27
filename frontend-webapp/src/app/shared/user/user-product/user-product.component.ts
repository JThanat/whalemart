import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../../../core/alert/alert.service';
import { Product, UserProductService } from './user-product.service';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.scss']
})
export class UserProductComponent implements OnInit {
  products: Product[];
  isShowAddProduct = false;
  addProductForm: FormGroup;

  constructor(
    private userProductService: UserProductService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.userProductService.getProducts$.subscribe(
      data => (this.products = data)
    );

    this.addProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required])
    });
  }

  showAddProduct() {
    this.isShowAddProduct = true;
  }

  addProduct() {
    if (!this.addProductForm.valid) {
      return;
    }

    this.addProductForm.disable();

    const { name, description, image } = this.addProductForm.value;

    this.userProductService
      .addProduct$({
        name: name,
        description: description,
        image: image ? image[0] : null
      })
      .subscribe(
        (data: Product[]) => {
          this.products = data;
          this.addProductForm.enable();
        },
        err => {
          this.addProductForm.enable();
          this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' });
        }
      );
  }

  deleteProduct(product: Product) {
    if (!confirm(`Are you sure to delete ${product.name}`)) {
      return;
    }
    this.userProductService.deleteProduct$(product.id).subscribe(
      (data: Product[]) => {
        this.products = data;
        this.alert.show({ message: 'ลบเสร็จสิ้น', type: 'success' });
      },
      (err: any) => {
        this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' });
      }
    );
  }
}
