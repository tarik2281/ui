import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchValidatorCtrl(target: FormControl): ValidatorFn {
  return (c: FormControl): ValidationErrors | null => {
    if (target.value === c.value) {
      return null;
    } else {
      return { match: true };
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
//
// export function conditionalRequired(target: FormControl, invert: boolean): ValidatorFn {
//   return (c: FormControl): ValidationErrors | null => {
//     // if (formGroup) {
//     //   const targetCtrl = formGroup.controls[target] as FormControl;
//     console.log('check condition', target.value, c.value);
//       if (!target.value) {
//         if (!c.value) {
//           return { required: true };
//         }
//       }
//     // }
//
//     return null;
//   };
// }
