import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { Progress } from 'src/app/models/progress.model';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-lms',
  templateUrl: './lms.component.html',
  styleUrls: ['./lms.component.css']
})
export class LmsComponent {
  courses: Course[] = [
    {
      id: 1,
      title: 'Introduction to Angular',
      description: 'Learn the basics of Angular, a popular front-end framework.',
      duration: '5 weeks',
      enrollmentDeadline: new Date('2024-03-01')
    },
  ];

  students: Student[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      enrolledCourses: []
    },
  ];

  progress: Progress[] = [
    {
      courseId: 1,
      studentId: 1,
      assignmentScores: { "Assignment 1": 95 },
      completionStatus: 'In Progress'
    },
  ];

  certificates: { studentId: number; courseId: number; certificateId: string }[] = [
    {
      studentId: 1,
      courseId: 1,
      certificateId: 'CERT-1-1-123456'
    },
  ];

  addCourse(form: NgForm) {
    const newCourse: Course = {
      id: this.courses.length + 1,
      title: form.value.title,
      description: form.value.description,
      duration: form.value.duration,
      enrollmentDeadline: new Date(form.value.enrollmentDeadline)
    };
    this.courses.push(newCourse);
    form.reset();
  }

  enrollStudentToCourse(form: NgForm) {
    const studentId = form.value.studentId;
    const courseId = form.value.courseId;
    const student = this.students.find(s => s.id === studentId);
    if (student && !student.enrolledCourses.includes(courseId)) {
      student.enrolledCourses.push(courseId);
    }
    form.reset();
  }

  updateProgress(form: NgForm) {
    const { studentId, courseId, assignmentTitle, score } = form.value;
    let studentProgress = this.progress.find(p => p.studentId === studentId && p.courseId === courseId);
    if (!studentProgress) {
      studentProgress = {
        courseId: courseId,
        studentId: studentId,
        assignmentScores: {},
        completionStatus: 'In Progress'
      };
      this.progress.push(studentProgress);
    }
    studentProgress.assignmentScores[assignmentTitle] = score;
    form.reset();
  }

  assignCertificate(form: NgForm) {
    const { studentId, courseId } = form.value;
    const certificateId = `CERT-${studentId}-${courseId}-${new Date().getTime()}`;
    this.certificates.push({ studentId, courseId, certificateId });
    form.reset();
  }

  getCoursesTitle(courseId: number): string {
    const course = this.courses.find(course => course.id === courseId);
    return course ? course.title : 'Unknown Course';
  }

  getStudentName(studentId: number): string {
    const student = this.students.find(student => student.id === studentId);
    return student ? student.name : 'Unknown Student';
  }

  getCourseTitle(courseId: number): string {
    const course = this.courses.find(course => course.id === courseId);
    return course ? course.title : 'Unknown Course';
  }
}
