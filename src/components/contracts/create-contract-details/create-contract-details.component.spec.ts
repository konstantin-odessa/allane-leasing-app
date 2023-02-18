import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractDetailsComponent } from './create-contract-details.component';

describe('ContractDetailsComponent', () => {
  let component: CreateContractDetailsComponent;
  let fixture: ComponentFixture<CreateContractDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateContractDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateContractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
