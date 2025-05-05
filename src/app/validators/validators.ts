import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isUrl(): ValidatorFn {
    const urlRegex = /https?:\/\/[^\s]+/i;

    return (control: AbstractControl): ValidationErrors | null => {
        if(urlRegex.test(control.value)){
            return null;
        }
        return {'erroreUrl': true};
    };
}

export function maxDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
  
      const selectedDate = new Date(control.value);
      const today = new Date();
  
      selectedDate.setHours(0, 0, 0, 0); //cosi escludiamo gli orari
      today.setHours(0, 0, 0, 0);
  
      if (selectedDate > today) {
        return { errorDate: true };
      }
  
      return null;
    };
  }