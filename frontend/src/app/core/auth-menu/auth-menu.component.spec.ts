import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthMenuComponent } from './auth-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AuthMenuComponent', () => {
  let component: AuthMenuComponent;
  let fixture: ComponentFixture<AuthMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthMenuComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show login and signup links when not logged in', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();

    const loginLink = fixture.debugElement.query(By.css('a[routerLink="/login"]'));
    const signupLink = fixture.debugElement.query(By.css('a[routerLink="/signup"]'));

    expect(loginLink).toBeTruthy();
    expect(signupLink).toBeTruthy();
  });

  it('should show My Finance and Logout when logged in', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();

    const financeLink = fixture.debugElement.query(By.css('a[routerLink="/transaction-list"]'));
    const logoutBtn = fixture.debugElement.query(By.css('.logout'));

    expect(financeLink).toBeTruthy();
    expect(logoutBtn).toBeTruthy();
  });

  it('should call logout() when clicking logout button', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();

    spyOn(component, 'logout');

    const logoutBtn = fixture.debugElement.query(By.css('.logout'));
    logoutBtn.nativeElement.click();

    expect(component.logout).toHaveBeenCalled();
  });
});
