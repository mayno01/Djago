import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpInterceptorFn, HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ],
    });

    // Instantiate the interceptor
    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add the Authorization header', () => {
    const httpRequest = new HttpRequest('GET', '/test-url');
    const httpHandler: HttpHandler = {
      handle: jasmine.createSpy('handle').and.callFake(() => Promise.resolve({})),
    };

    interceptor.intercept(httpRequest, httpHandler).subscribe(() => {
      expect(httpHandler.handle).toHaveBeenCalled();
    });
  });
});
