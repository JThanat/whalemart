import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of as observableOf } from 'rxjs/observable/of';

import { AlertService } from '../../core/alert/alert.service';
import { FileInputComponent } from '../../shared/input/file/file-input.component';
import { CreateMarketComponent } from './create-market.component';
import { CreateMarketService } from './create-market.service';

class MockCreateMarketService {
  createMarket() {
    return observableOf(31);
  }

  tagsValidators() {
    return null;
  }
}

class MockAlertService {}

describe('CreateMarketComponent', () => {
  let component: CreateMarketComponent;
  let fixture: ComponentFixture<CreateMarketComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, RouterTestingModule],
        declarations: [CreateMarketComponent, FileInputComponent],
        providers: [
          { provide: CreateMarketService, useClass: MockCreateMarketService },
          { provide: AlertService, useClass: MockAlertService }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
