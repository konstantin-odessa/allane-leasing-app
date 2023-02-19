import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsListComponent } from './contracts-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContractsListComponent', () => {
  let component: ContractsListComponent;
  let fixture: ComponentFixture<ContractsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [HttpClient],
      declarations: [ContractsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContractsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
