import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContractDetailsComponent } from './edit-contract-details.component';

describe('ContractDetailsComponent', () => {
  let component: EditContractDetailsComponent;
  let fixture: ComponentFixture<EditContractDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditContractDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditContractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
