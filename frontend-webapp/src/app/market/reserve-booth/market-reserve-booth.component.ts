import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { combineLatest as observableCombineLatest } from 'rxjs/observable/combineLatest';

import { MarketDetail } from '../market-detail-resolver.service';
import { MarketReserveBoothService } from './market-reserve-booth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface Booth {
  id: number;
  name: string;
  price: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-market-reserve-booth',
  templateUrl: './market-reserve-booth.component.html',
  styleUrls: ['./market-reserve-booth.component.scss']
})
export class MarketReserveBoothComponent implements OnInit {
  marketDetailObservable: Observable<MarketDetail>;
  booths: Observable<Booth[]>;
  products: Observable<Product[]>;
  selectedProducts = new BehaviorSubject<Product[]>([]);
  unselectedProducts: Observable<Product[]>;

  reserveForm: FormGroup;
  boothsForm: FormArray;

  constructor(
    private route: ActivatedRoute,
    private marketReserveBoothService: MarketReserveBoothService
  ) {}

  ngOnInit() {
    this.marketDetailObservable = this.route.data.pipe(map(data => data.marketDetail));
    this.booths = this.route.data.pipe(map(data => data.booths));
    this.products = this.route.data.pipe(map(data => data.products));
    this.unselectedProducts = observableCombineLatest(
      this.products,
      this.selectedProducts,
      (allProducts, selectedProducts) => {
        const unselectedSet = new Set<Product>(allProducts);
        for (const selected of selectedProducts) {
          unselectedSet.delete(selected);
        }
        return Array.from(unselectedSet);
      }
    );

    this.boothsForm = new FormArray([], [this.marketReserveBoothService.boothsDuplicateValidator]);
    for (let i = 0; i < 10; i++) {
      this.boothsForm.push(new FormControl('', [Validators.required]));
    }

    this.reserveForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      booths: this.boothsForm
    });
  }

  addProduct(productAdder: HTMLSelectElement) {
    const productIdStr = productAdder.value;
    if (productIdStr === '') {
      return;
    }

    // Get current products.
    let allProducts: Product[] = [];
    this.products
      .subscribe(ap => {
        allProducts = ap;
      })
      .unsubscribe();

    const productId = Number(productIdStr);
    const product = allProducts.find(product => product.id === productId);

    if (product) {
      this.selectedProducts.next([...this.selectedProducts.value, product]);
    }

    productAdder.value = '';
  }

  unselectProduct(targetProduct: Product) {
    this.selectedProducts.next(
      this.selectedProducts.value.filter(product => product !== targetProduct)
    );
  }
}
