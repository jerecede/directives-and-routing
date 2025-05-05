import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../model/student';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  imports: [ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  marks?: Number[];

  myForm = new FormGroup({
    mark: new FormControl(''),
  });

  route = inject(ActivatedRoute);
  studentServ = inject(StudentService);

  student?: Student;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.studentServ.getStudent(id).subscribe({
        next: (data) => {
          this.student = data;
          this.marks = data.marks;
        },
        error: (err) => console.error(err),
      })
    }
  }

  removeStudent(id: string) {
    this.closeDialog();
    this.studentServ.deleteStudent(id);
  }

  openDialog() {
    document.querySelector("dialog")?.showModal();
  }

  closeDialog() {
    document.querySelector("dialog")?.close();
  }

  addMark(){
    console.log(this.marks);
    const newMark = this.myForm.value.mark;
    console.log(newMark);
    if(this.marks){
      this.marks.push(Number(newMark));
      console.log(this.marks);
      this.addMarksToStudent(this.marks); //addMarksToStudent oppure addMarksToStudentObservable
    }
    this.myForm.reset();
  }

  addMarksToStudent(newMarks: Number[]) {
    if (this.student) {
      this.studentServ.addMarks(this.student.id, newMarks).then(modifiedStudent => this.student = modifiedStudent);
    }
  }

  addMarksToStudentObservable(newMarks: Number[]) {
    console.log('OBSERVABLE')
    if (this.student) {
      this.studentServ.addMarksObservable(this.student.id, newMarks)
      .subscribe({
        next: (modifiedStudent) => {
          this.student = modifiedStudent;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
