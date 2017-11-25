import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { combineLatest } from 'rxjs/observable/combineLatest';
import { AlertService } from '../../core/alert/alert.service';
import { Product, VendorProductService } from './vendor-product.service';

@Component({
  selector: 'app-vendor-product',
  templateUrl: './vendor-product.component.html',
  styleUrls: ['./vendor-product.component.scss']
})
export class VendorProductComponent implements OnInit {
  products: Product[];
  isShowAddProduct = true;
  addProductForm: FormGroup;

  constructor(
    private vendorProductService: VendorProductService
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.vendorProductService
      .getProducts$
      .subscribe(data => (this.products = data));

    this.addProductForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        image: new FormControl(null, [Validators.required])
      },
      { updateOn: 'blur' }
    );
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

    this.vendorProductService.addProduct$({
      name: name,
      description: description,
      image: image ? image[0] : null
    }).subscribe((data: any) => {
        this.products = data;
        this.addProductForm.enable();
      }, err => {
        this.addProductForm.enable();
        this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' });
      });
  }
}
