import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render username, email, password, and confirm password inputs', () => {
    expect(el.query(By.css('input#username'))).toBeTruthy();
    expect(el.query(By.css('input#email'))).toBeTruthy();
    expect(el.query(By.css('input#password'))).toBeTruthy();
    expect(el.query(By.css('input#confirm-password'))).toBeTruthy();
  });

  it('should make username required with minlength 5', () => {
    const username = component.form.get('username');
    username?.setValue('');
    expect(username?.hasError('required')).toBeTrue();

    username?.setValue('abc');
    expect(username?.hasError('minlength')).toBeTrue();
  });

  it('should validate email correctly', () => {
    const email = component.form.get('email');
    email?.setValue('');
    expect(email?.hasError('required')).toBeTrue();

    email?.setValue('invalid-email');
    expect(email?.hasError('email')).toBeTrue();

    email?.setValue('test@example.com');
    expect(email?.valid).toBeTrue();
  });

  it('should validate password match', () => {
    const passGroup = component.form.get('passGroup');
    const password = passGroup?.get('password');
    const rePassword = passGroup?.get('rePassword');

    password?.setValue('123456');
    rePassword?.setValue('654321');
    fixture.detectChanges();

    expect(passGroup?.errors?.['matchPasswordsValidator']).toBeTruthy();

    rePassword?.setValue('123456');
    fixture.detectChanges();

    expect(passGroup?.errors).toBeNull();
  });

  it('should disable the signup button when form is invalid', () => {
    component.form.get('username')?.setValue('');
    component.form.get('email')?.setValue('');
    component.form.get('passGroup.password')?.setValue('');
    component.form.get('passGroup.rePassword')?.setValue('');
    fixture.detectChanges();

    const button = el.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it('should enable the signup button when form is valid', () => {
    component.form.get('username')?.setValue('validUser');
    component.form.get('email')?.setValue('test@example.com');
    component.form.get('passGroup.password')?.setValue('123456');
    component.form.get('passGroup.rePassword')?.setValue('123456');
    fixture.detectChanges();

    const button = el.query(By.css('button')).nativeElement;
    expect(button.disabled).toBeFalse();
  });

  it('should call signup() when form is submitted', () => {
    spyOn(component, 'signup');
    component.form.get('username')?.setValue('validUser');
    component.form.get('email')?.setValue('test@example.com');
    component.form.get('passGroup.password')?.setValue('123456');
    component.form.get('passGroup.rePassword')?.setValue('123456');

    fixture.detectChanges();

    const form = el.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', {});
    expect(component.signup).toHaveBeenCalled();
  });

  it('should display errorMsg if present', () => {
    component.errorMsg = 'Something went wrong';
    fixture.detectChanges();

    const errorDiv = el.query(By.css('.error')).nativeElement;
    expect(errorDiv.textContent).toContain('Something went wrong');
  });
});
