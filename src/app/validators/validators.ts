import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { User } from "../model/user";

export function isUrl(): ValidatorFn {
  const urlRegex = /https?:\/\/[^\s]+/i;

  return (control: AbstractControl): ValidationErrors | null => {
    if (urlRegex.test(control.value)) {
      return null;
    }
    return {erroreUrl: true, url: control.value};
  };
}

export function maxDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const selectedDate = new Date(control.value);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0); //cosi escludiamo gli orari
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      return { errorDate: true, date: selectedDate, today: today};
    }

    return null;
  };
}

export function findUser(users: User[]): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {

    const email = group.get('email')?.value;
    const password = group.get('password')?.value;

    console.log('Email:', email);
    console.log('Password:', password);

    const userFound = users.some(user => user.email === email && user.password === password); //questa logica non va e non so perche
    console.log('User found:', userFound);
    
    return userFound ? null : { wrongPasswordOrEmail: true }; //quando useFound è false se ne fotte ed element.error = null invece di { wrongPasswordOrEmail: true }, sara colpa del formbuilder
  };
}

//quando provi a registarti con una email gia usata te lo dice