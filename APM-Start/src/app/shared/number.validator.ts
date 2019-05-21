import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidators {

    //* vvv==> Use the method as static == any code can use it without creating an instance of this class
    static range(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'range': true };
            }
            return null;
        };
    }
}