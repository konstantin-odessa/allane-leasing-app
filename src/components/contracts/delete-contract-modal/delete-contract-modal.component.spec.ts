import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContractModalComponent } from './delete-contract-modal.component';

describe('DeleteContractModalComponent', () => {
  let component: DeleteContractModalComponent;
  let fixture: ComponentFixture<DeleteContractModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteContractModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteContractModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
