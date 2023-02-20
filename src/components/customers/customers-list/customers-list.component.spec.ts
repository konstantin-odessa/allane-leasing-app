import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersListComponent } from './customers-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteMock } from '../../../helpers';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NonNullablePipe } from '../../../pipes';

describe('CustomersListComponent', () => {
  let component: CustomersListComponent;
  let fixture: ComponentFixture<CustomersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedMaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        HttpClient,
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
      ],
      declarations: [CustomersListComponent, NonNullablePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
