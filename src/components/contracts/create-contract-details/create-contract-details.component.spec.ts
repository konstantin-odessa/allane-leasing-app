import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractDetailsComponent } from './create-contract-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteMock } from '../../../helpers';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { EditVehicleDetailsComponent } from '../../vehicles';
import { EditCustomerDetailsComponent } from '../../customers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CapEmptyDataPipe } from '../../../pipes';

describe('CreateContractDetailsComponent', () => {
  let component: CreateContractDetailsComponent;
  let fixture: ComponentFixture<CreateContractDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedMaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        CreateContractDetailsComponent,
        EditVehicleDetailsComponent,
        EditCustomerDetailsComponent,
        CapEmptyDataPipe,
      ],
      providers: [
        HttpClient,
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateContractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
