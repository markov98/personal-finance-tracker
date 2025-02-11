import { ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  const regExp = new RegExp(`[A-Za-z0-9]+@[A-Za-z0-9]`);

  return (control) => {
    const isEmailInvalid = control.value === '' || regExp.test(control.value);
    console.log(isEmailInvalid);
    return isEmailInvalid ? null : { emailValidator: true };
  };
}