import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContractDetailsComponent } from './edit-contract-details.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteMock } from '../../../helpers';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { EditVehicleDetailsComponent } from '../../vehicles';
import { EditCustomerDetailsComponent } from '../../customers';
import { ReactiveFormsModule } from '@angular/forms';
import { CapEmptyDataPipe } from '../../../pipes';

describe('EditContractDetailsComponent', () => {
  let component: EditContractDetailsComponent;
  let fixture: ComponentFixture<EditContractDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedMaterialModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        HttpClient,
      ],
      declarations: [
        EditContractDetailsComponent,
        EditVehicleDetailsComponent,
        EditCustomerDetailsComponent,
        CapEmptyDataPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditContractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
