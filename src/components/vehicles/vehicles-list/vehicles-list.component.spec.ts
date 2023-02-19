import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesListComponent } from './vehicles-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('VehiclesListComponent', () => {
  let component: VehiclesListComponent;
  let fixture: ComponentFixture<VehiclesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [HttpClient],
      declarations: [VehiclesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
