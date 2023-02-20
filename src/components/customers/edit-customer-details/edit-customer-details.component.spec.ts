import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerDetailsComponent } from './edit-customer-details.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteMock } from '../../../helpers';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CapEmptyDataPipe } from '../../../pipes';

describe('EditCustomerDetailsComponent', () => {
  let component: EditCustomerDetailsComponent;
  let fixture: ComponentFixture<EditCustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedMaterialModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        HttpClient,
      ],
      declarations: [EditCustomerDetailsComponent, CapEmptyDataPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
