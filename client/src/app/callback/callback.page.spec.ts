import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CallbackPage } from './callback.page';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

describe('CallbackPage', () => {
  let component: CallbackPage;
  let fixture: ComponentFixture<CallbackPage>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'signUp', 'isAuthenticated', 'logout', 'getAccessToken', 'saveTokensToLocalStorage', 'getTokensFromCognito']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const routeSpy = jasmine.createSpyObj('ActivatedRouter', ['login', 'signUp', 'isAuthenticated', 'logout', 'getAccessToken']);
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallbackPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeSpy },

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CallbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
