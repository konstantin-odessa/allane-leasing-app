import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVehicleDetailsComponent } from './create-vehicle-details.component';

describe('CreateCustomerDetailsComponent', () => {
  let component: CreateVehicleDetailsComponent;
  let fixture: ComponentFixture<CreateVehicleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
