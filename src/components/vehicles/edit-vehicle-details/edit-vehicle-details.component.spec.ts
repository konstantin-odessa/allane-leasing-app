import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleDetailsComponent } from './edit-vehicle-details.component';

describe('CreateCustomerDetailsComponent', () => {
  let component: EditVehicleDetailsComponent;
  let fixture: ComponentFixture<EditVehicleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditVehicleDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditVehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
