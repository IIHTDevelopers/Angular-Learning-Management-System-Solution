
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from '../../model/course';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent {
  courseForm!: FormGroup;
  newCourse!: Course;
  searchTitle: string;
  searchStartDate: Date;
  courses: Course[] = [];
  //searchResult!: Course;
  searchByTitleForm!: FormGroup;
  searchByStartDateForm!: FormGroup;
  currentCourse!: Course;
  searchResults!: any[];
  updatebtn=false;
  constructor(private formBuilder: FormBuilder, private courseService: CourseService) {
  //If wont initialize disappers the all data displayed
    this.searchTitle = '';
    this.searchStartDate = new Date(); 
    this.searchResults = [];

    this.createForm();
    this.searchTitle= ''
    this.searchStartDate= new Date();


    this.searchByTitleForm = this.formBuilder.group({
      title: ['', Validators.required]
    });

    this.searchByStartDateForm = this.formBuilder.group({
      startDate: ['', [Validators.required, Validators.email]]
    });

    this.getAllCourses();
  }

  createForm(): void {
    this.courseForm = this.formBuilder.group({
      id:[],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', Validators.required],
      instructor: ['', Validators.required],
      duration: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      syllabus: ['']
    });
  }

  createCourse(): void {
    if (this.courseForm.valid) {
      this.newCourse = this.courseForm.value;
      this.courseService.createCourse(this.newCourse).subscribe(
        (course) => {
          this.courses.push(course);
          this.courseForm.reset();
        }
        // ,
        // (error) => {
        //   console.error(error);
        // }
      );
    }
  }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (courses) => {
        this.courses = courses;
      }
      // ,
      // (error) => {
      //   console.error(error);
      // }
    );
  }

  // updateCourse(id: number): void {
  //   const updatedCourse = this.courseForm.value;
  //   this.courseService.updateCourse(id, updatedCourse).subscribe(
  //     (course) => {
  //       const index = this.courses.findIndex(u => u.id === id);
  //       this.courses[index] = course;
  //       this.courseForm.reset();
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }


  updateCourse(): void {
    if (this.courseForm.valid && this.currentCourse) {
      const updatedCourse: Course = {
        id: this.currentCourse.id,
        title: this.courseForm.value.title,
        description: this.courseForm.value.description,
        instructor: this.courseForm.value.instructor,
        duration: this.courseForm.value.duration,
        startDate: this.courseForm.value.startDate,
        endDate: this.courseForm.value.endDate,
        syllabus: this.courseForm.value.syllabus,
       
      };

      this.courseService.updateCourse(updatedCourse.id, updatedCourse).subscribe((course: Course) => {
        const index = this.courses.findIndex(u => u.id === course.id);
        if (index !== -1) {
          this.courses[index] = course;
          this.courseForm.reset();
          //this.currentCourse = null;
        }
      });
    }
  }

  deleteCourse(id: number): void {
    this.courseService.deleteCourse(id).subscribe(
      () => {
        this.courses = this.courses.filter(u => u.id !== id);
      }
      // ,
      // (error) => {
      //   console.error(error);
      // }
    );
  }

  getCourseById(courseId: number): void {
    this.courseService.getCourse(courseId).subscribe((course: Course) => {
      this.currentCourse = course;
      this.courseForm.patchValue(course);
    });
    this.updatebtn=true;
  }


  // searchByTitle(): void {
  //   if (this.searchTitle) {
  //     this.courseService.searchByTitle(this.searchTitle).subscribe(
  //       (courses) => {
  //         this.courses = courses;
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }

  // searchByStartDate(): void {
  //   if (this.searchStartDate) {
  //     this.courseService.searchByStartDate(this.searchStartDate).subscribe(
  //       (courses) => {
  //         this.courses = courses;
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }


  // searchByTitle(): void {
  //   if (this.searchByTitleForm.valid) {
  //     const title = this.searchByTitleForm.value.title;
  //     this.courseService.searchByTitle(title).subscribe((course: Course) => {
  //       this.searchResult = course;
  //       alert(this.searchResult)
  //       this.searchByTitleForm.reset();
  //     });
  //   }
  // }
 
  // searchByStartDate(): void {
  //   // alert(this.searchByStartDateForm.valid)
  //   // if (this.searchByStartDateForm.valid) {
  //   //   alert('2')
  //     const date = this.searchByStartDateForm.value.startDate;
  //     this.courseService.searchByStartDate(date).subscribe((course: Course) => {
  //       this.searchResult = course;
  //       this.searchByStartDateForm.reset();
  //     });
  //   // }
  // }

  searchByTitle(): void {
    if (this.searchByTitleForm.valid) {
      const title = this.searchByTitleForm.value.title;
      this.courseService.searchByTitle(title).subscribe((result:any) => {
        this.searchResults = result;    
        this.searchByTitleForm.reset();
      });
    }
  }
 
  searchByStartDate(): void {
    // alert(this.searchByStartDateForm.valid)
    // if (this.searchByStartDateForm.valid) {
      const date = this.searchByStartDateForm.value.startDate;
      this.courseService.searchByStartDate(date).subscribe((result:any) => {
        this.searchResults = result;
        this.searchByStartDateForm.reset();
      });
    // }
  }
 
}
