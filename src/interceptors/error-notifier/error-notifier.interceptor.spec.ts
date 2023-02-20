import { TestBed } from '@angular/core/testing';

import { ErrorNotifierInterceptor } from './error-notifier.interceptor';
import { SharedMaterialModule } from '../../modules/shared-material.module';

describe('ErrorNotifierInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [SharedMaterialModule],
      providers: [ErrorNotifierInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: ErrorNotifierInterceptor = TestBed.inject(
      ErrorNotifierInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
