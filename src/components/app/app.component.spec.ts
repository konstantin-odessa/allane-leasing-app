import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedMaterialModule } from '../../modules/shared-material.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedMaterialModule],
      declarations: [AppComponent, NavigationMenuComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
