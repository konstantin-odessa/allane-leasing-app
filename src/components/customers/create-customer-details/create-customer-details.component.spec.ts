import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerDetailsComponent } from './create-customer-details.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteMock } from '../../../helpers';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateCustomerDetailsComponent', () => {
  let component: CreateCustomerDetailsComponent;
  let fixture: ComponentFixture<CreateCustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedMaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteMock }],
      declarations: [CreateCustomerDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
