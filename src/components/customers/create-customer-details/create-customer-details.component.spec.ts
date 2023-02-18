import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerDetailsComponent } from './create-customer-details.component';

describe('CreateCustomerDetailsComponent', () => {
  let component: CreateCustomerDetailsComponent;
  let fixture: ComponentFixture<CreateCustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCustomerDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
