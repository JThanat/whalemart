import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private vendorProductService: VendorProductService) {}

  ngOnInit() {
    this.vendorProductService
      .getProducts$()
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

  addProduct() {}
}
