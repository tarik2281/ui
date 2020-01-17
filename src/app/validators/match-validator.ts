import {FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function matchValidatorCtrl(target: FormControl): ValidatorFn {
  return (c: FormControl): ValidationErrors | null => {
    if (target.value === c.value) {
      return null;
    } else {
      return {match: true};
    }
  };
}

export function matchValidator(target: string): ValidatorFn {
  return (c: FormControl): ValidationErrors | null => {
    if (c.parent && c.parent.controls[target].value === c.value) {
      return null;
    } else {
      return { match: true };
    }
  };
}
