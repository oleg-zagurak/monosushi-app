import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthComponent } from './admin-auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

describe('AdminAuthComponent', () => {
  let component: AdminAuthComponent;
  let fixture: ComponentFixture<AdminAuthComponent>;
  let mockAuthService = jasmine.createSpyObj('AuthService', {
    login: Promise.resolve()
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAuthComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {provide: AuthService, useValue: mockAuthService}
      ]
    });
    fixture = TestBed.createComponent(AdminAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should login user if form is valid', () => {
    spyOn(component, 'loginUser').and.callThrough();
    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    component.loginUser();
    expect(component.loginUser).toHaveBeenCalled();
    expect(mockAuthService.login).toHaveBeenCalledOnceWith('test@test.com', 'password');

    component.loginForm.reset();
    component.loginUser();
    expect(component.loginUser).toHaveBeenCalled();
    expect(mockAuthService.login).toHaveBeenCalledTimes(1);
  });
  

});
