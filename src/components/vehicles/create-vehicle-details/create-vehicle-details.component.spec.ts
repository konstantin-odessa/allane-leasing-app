import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVehicleDetailsComponent } from './create-vehicle-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateVehicleDetailsComponent', () => {
  let component: CreateVehicleDetailsComponent;
  let fixture: ComponentFixture<CreateVehicleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedMaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [HttpClient],
      declarations: [CreateVehicleDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateVehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
