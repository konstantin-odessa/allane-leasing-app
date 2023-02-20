import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustomerModalComponent } from './delete-customer-modal.component';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('DeleteCustomerModalComponent', () => {
  let component: DeleteCustomerModalComponent;
  let fixture: ComponentFixture<DeleteCustomerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedMaterialModule, HttpClientTestingModule],
      declarations: [DeleteCustomerModalComponent],
      providers: [
        HttpClient,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
