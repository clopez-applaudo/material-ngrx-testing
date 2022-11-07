import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";

describe('LoginComponent', () => {

  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [LoginService]
    }).compileComponents();

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should send credentials to api to log in', () => {
    const credentials = 'test';
    service.login(credentials).subscribe((res) => {
      expect(res).toBe(true);
    });

    const request = httpMock.expectOne('www.google.com');
    expect(request.request.method).toBe('POST');
    request.flush(true);
  })
});