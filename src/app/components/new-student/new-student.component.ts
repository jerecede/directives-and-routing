import * as countries from "i18n-iso-countries";
import itLocale from "i18n-iso-countries/langs/it.json";  // Usa import per caricare il file JSON
import { Component, inject } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Country } from '../../model/country';
import { isUrl, maxDate } from '../../validators/validators'

@Component({
  selector: 'app-new-student',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.scss'
})
export class NewStudentComponent {
  studentServ = inject(StudentService);

  maxDate: string;

  name = '';
  surname = '';
  country = '';
  gender = '';
  dob = '';
  imgUrl = '';

  newStudentForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required, maxDate()]),
    imgUrl: new FormControl('', [Validators.required, isUrl()]),
  });

  countryList: Country[] = [];

  constructor(){
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    countries.registerLocale(itLocale); //chiedo di avere i nomi tradotti in italiano

    const countryObj = countries.getNames("it", { select: "alias" }); //richiedo i paesi in italiano(posso per la require fatta prima), e in 'alias' volgio i nomi non cosi official

    this.countryList = Object.entries(countryObj).map(([code, name]) => ({
      code,
      name
    }));
  }

  submitForm() {
    if(this.newStudentForm.valid){
      console.log(this.newStudentForm);

      const formValues = this.newStudentForm.value;

      this.name = formValues.name!;
      this.surname = formValues.surname!;
      this.country = formValues.country!;
      this.dob = formValues.dob!;
      this.gender = formValues.gender!;
      this.imgUrl = formValues.imgUrl!;
      
      document.querySelector("dialog")?.showModal();
    } else{
      for (const key in this.newStudentForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.newStudentForm.controls, key)) {
          const element = this.newStudentForm.get(key);
          console.log(key, element?.errors)
        }
      }
    }
  }

  addStudent() {
    this.closeDialog();
    this.studentServ.addStudent(this.name, this.surname, this.country, this.dob, this.gender, this.imgUrl);;
  }

  closeDialog() {
    document.querySelector("dialog")?.close();
  }
}
