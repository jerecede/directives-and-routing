import { Injectable } from '@angular/core';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL = "https://68109d6927f2fdac2412124a.mockapi.io/";
  readonly USERS_ENDPOINT = "users/"

  isAuth = false;

  getUsers(): Promise<User[]>{
    return fetch(this.BASE_URL + this.USERS_ENDPOINT, {
      method: 'GET',
      headers: {'content-type':'application/json'},
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else{
        throw new Error("Errore durante l'eliminazione dello studente");
      }
    }).then(users => {
      return users;
    }).catch(error => {
      console.error(error)
    })
  }

  constructor() { }
}
