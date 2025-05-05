import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../model/student';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  readonly BASE_URL = "https://68109d6927f2fdac2412124a.mockapi.io/";
  readonly STUDENTS_ENDPOINT = "students/"

  constructor(private http: HttpClient, private router: Router) { //per fare observable
  }

  getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.BASE_URL + this.STUDENTS_ENDPOINT)
  }

  getStudent(id: string): Observable<Student>{
    return this.http.get<Student>(this.BASE_URL + this.STUDENTS_ENDPOINT + id)
  }

  deleteStudent(id: string) {
    fetch(this.BASE_URL + this.STUDENTS_ENDPOINT + id, {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
          return res.json();
      } else{
        throw new Error("Errore durante l'eliminazione dello studente");
      }
    }).then(() => {
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    }).catch(error => {
      console.error(error);
    })
  }

  addMarks(id: string, marks: Number[]): Promise<Student>{
    const patchValue = {marks: marks}

    return fetch(this.BASE_URL + this.STUDENTS_ENDPOINT + id, {
      method: 'PUT', // or PATCH
      headers: {'content-type':'application/json'},
      body: JSON.stringify(patchValue)
    }).then(res => {
      if (res.ok) {
          return res.json();
      } else{
        throw new Error("Errore durante l'eliminazione dello studente");
      }
    }).catch(error => {
      console.error(error);
    })
  }

  addMarksObservable(id: string, marks: Number[]): Observable<Student>{
    const patchValue = {marks: marks}
    const url = `${this.BASE_URL}${this.STUDENTS_ENDPOINT}${id}`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<Student>(url, patchValue, { headers });
  }

  addStudent(formName: string, formSurname: string, formCountry: string, formDob: string, formGender: string, formImageurl: string){
    const testStudent: Student = {
      name: formName,
      surname: formSurname,
      country: formCountry,
      dob: formDob,
      gender: formGender,
      marks: [],
      imageUrl: formImageurl,
      id: '',
    }

    fetch(this.BASE_URL + this.STUDENTS_ENDPOINT, {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify(testStudent)
    }).then(res => {
      if (res.ok) {
          return res.json();
      } else{
        throw new Error("Errore durante l'eliminazione dello studente");
      }
    }).then(() => {
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000);
    }).catch(error => {
      console.error(error);
    })
  }
}
