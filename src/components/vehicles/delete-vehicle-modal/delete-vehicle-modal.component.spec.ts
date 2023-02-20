import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVehicleModalComponent } from './delete-vehicle-modal.component';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('DeleteVehicleModalComponent', () => {
  let component: DeleteVehicleModalComponent;
  let fixture: ComponentFixture<DeleteVehicleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedMaterialModule, HttpClientTestingModule],
      declarations: [DeleteVehicleModalComponent],
      providers: [
        HttpClient,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteVehicleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
