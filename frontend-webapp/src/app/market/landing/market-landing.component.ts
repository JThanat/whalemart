import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { DOCUMENT, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../../environments/environment';
import { Market } from '../../core/market/market.service';

export interface MarketDetail {
  name: string;
  caption: string;
  description: string;
  openingDate: Date;
  closingDate: Date;
  openingTime: Date;
  closingTime: Date;
  contact: {
    fullname: string;
    phoneNumber: string;
    email: string;
  };
  location: {
    name: string;
    latitude: string;
    longitude: string;
  };
  termsAndCondition: string;
  depositPaymentDue: Date;
  fullPaymentDue: Date;
  reservationDueDate: Date;
  estimateVisitor: number;
  minPrice: number;
  maxPrice: number;
  layoutImageUrl: string;
  providedAccessories: {
    name: string;
    amount: number;
  }[];
  coverImageUrl: string;
  scenePhotoUrls: string[];
  tags: string[];
}

/**
 * The offset in pixel for determining whether the section is currently active or not. For example,
 * if the offset is 100, then the first section that its heading is above 100px threshold (the
 * distance from the top of the viewport) is considered active.
 * )
 */
const sectionViewportOffset = 200;

const navigateOffset = 100;

@Component({
  selector: 'app-market-landing',
  templateUrl: './market-landing.component.html',
  styleUrls: ['./market-landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketLandingComponent implements OnInit, OnDestroy, AfterViewInit {
  marketDetailObs: Observable<MarketDetail>;
  similarMarketsObs: Observable<Market[]>;
  marketMapIframeUrl: Observable<SafeResourceUrl>;
  currentSectionId = -1;

  @ViewChildren('sectionHeading') sectionHeadings: QueryList<ElementRef>;

  private fragmentSubscription: Subscription;
  private scrollSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document,
    private scrollDispatcher: ScrollDispatcher,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.marketDetailObs = this.route.data.pipe(map(data => data.marketDetail));
    this.similarMarketsObs = this.route.data.pipe(map(data => data.similarMarkets));
    this.marketMapIframeUrl = this.marketDetailObs.pipe(
      map(marketDetail => {
        const url =
          `https://www.google.com/maps/embed/v1/place?key=${environment.google.apiKey}&q=` +
          encodeURIComponent(
            `${marketDetail.location.latitude},${marketDetail.location.longitude}`
          );
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
      })
    );
  }

  ngAfterViewInit() {
    // TODO: Separate nav bar logic into component/directive.

    this.fragmentSubscription = this.route.fragment.subscribe(fragment => {
      if (fragment === '') {
        return;
      }
      const elem = this.document.querySelector('#' + fragment);
      if (elem) {
        elem.scrollIntoView(true);
        const scrolledY = window.scrollY;
        window.scroll(0, scrolledY - navigateOffset);
      }
    });

    this.scrollSubscription = this.scrollDispatcher.scrolled().subscribe(() => {
      let sectionId = -1;

      const headings = this.sectionHeadings.toArray();
      for (let i = headings.length - 1; i >= 0; i--) {
        const boundingRect = (headings[i].nativeElement as HTMLElement).getBoundingClientRect();
        if (boundingRect.top < sectionViewportOffset) {
          sectionId = i;
          break;
        }
      }

      if (this.currentSectionId !== sectionId) {
        this.currentSectionId = sectionId;
        this.cd.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this.fragmentSubscription.unsubscribe();
    this.scrollSubscription.unsubscribe();
  }
}
