import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContractModalComponent } from './delete-contract-modal.component';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DeleteContractModalComponent', () => {
  let component: DeleteContractModalComponent;
  let fixture: ComponentFixture<DeleteContractModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedMaterialModule, HttpClientTestingModule],
      declarations: [DeleteContractModalComponent],
      providers: [
        HttpClient,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteContractModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
