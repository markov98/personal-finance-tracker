import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render form with email and password inputs', () => {
    const emailInput = el.query(By.css('input[type="email"]'));
    const passwordInput = el.query(By.css('input[type="password"]'));
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should make email and password required', () => {
    const emailControl = component.form.get('email');
    const passwordControl = component.form.get('password');

    emailControl?.setValue('');
    passwordControl?.setValue('');
    expect(emailControl?.hasError('required')).toBeTrue();
    expect(passwordControl?.hasError('required')).toBeTrue();
  });

  it('should show error message when email is invalid', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid-email');
    emailControl?.markAsTouched();

    fixture.detectChanges();
    const errorEl = el.query(By.css('.error')).nativeElement;
    expect(errorEl.textContent).toContain('Email must be valid');
  });

  it('should disable the login button if form is invalid', () => {
    component.form.get('email')?.setValue('');
    component.form.get('password')?.setValue('');
    fixture.detectChanges();

    const button = el.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it('should enable the login button if form is valid', () => {
    component.form.get('email')?.setValue('test@example.com');
    component.form.get('password')?.setValue('123456');
    fixture.detectChanges();

    const button = el.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeFalse();
  });

  it('should call login() when form is submitted', () => {
    spyOn(component, 'login');
    component.form.get('email')?.setValue('test@example.com');
    component.form.get('password')?.setValue('123456');

    fixture.detectChanges();

    const form = el.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', {});
    expect(component.login).toHaveBeenCalled();
  });

  it('should display errorMsg if present', () => {
    component.errorMsg = 'Invalid credentials';
    fixture.detectChanges();

    const errorDiv = el.query(By.css('.error')).nativeElement;
    expect(errorDiv.textContent).toContain('Invalid credentials');
  });
});
