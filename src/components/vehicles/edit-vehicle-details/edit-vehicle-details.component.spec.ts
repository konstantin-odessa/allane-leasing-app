import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleDetailsComponent } from './edit-vehicle-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteMock } from '../../../helpers';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CapEmptyDataPipe } from '../../../pipes';

describe('EditVehicleDetailsComponent', () => {
  let component: EditVehicleDetailsComponent;
  let fixture: ComponentFixture<EditVehicleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedMaterialModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteMock }],
      declarations: [EditVehicleDetailsComponent, CapEmptyDataPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(EditVehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
