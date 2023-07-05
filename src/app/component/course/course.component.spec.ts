
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseComponent } from './course.component';
import { CourseService } from '../../service/course.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Course } from 'src/app/model/course';
import { of} from 'rxjs';

describe('CourseComponent', () => {
    let component: CourseComponent;
    let fixture: ComponentFixture<CourseComponent>;
    let serviceMock:any;
    let courseService: CourseService;
    const course: Course = {
      id: 1,       
      title: 'Title',
      description: 'Description',
      instructor: 'Instructor',
      duration: 'duration',
      startDate: new Date('2022-01-01'),
      endDate:new Date('2023-01-01'),
      syllabus: 'syllabus'
    }
  
    let mockService = {
      getAllCourses: ()=>{return of([course])},
      deleteCourse: (id:number|string)=>{return of(course)},
      getCourse: ()=>{
        return of([course])
      },
    }

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [CourseComponent],
        imports: [FormsModule,ReactiveFormsModule,HttpClientModule,HttpClientTestingModule] ,
        providers: [FormBuilder, CourseService,HttpTestingController,{provide: CourseService, useValue: mockService}] 
      }).compileComponents();
    });

    beforeEach(() => {
      serviceMock={
        getAllCourses:jest.fn(),
        // getCourseById:jest.fn(),
        createCourse:jest.fn(),
        updateCourse:jest.fn(),
        deleteCourse:jest.fn(),
        searchByTitle:jest.fn(),
        searchByStartDate:jest.fn(), 
        };

      fixture = TestBed.createComponent(CourseComponent);
      component = fixture.componentInstance;
      courseService = TestBed.inject(CourseService);
      fixture.detectChanges();
    });

    describe("business", ()=>{

        it('should create the course component', () => {
          expect(component).toBeTruthy();
        });

        it('should declare course form referece',()=>{
          expect(component.courseForm).toBeDefined();
        })

        it('should initialize the form',()=>{
          const courseForm={
            id:null,       
            title: '',
            description: '',
            instructor: '',
            duration: '',
            startDate: '',
            endDate:'',
            syllabus: ''
          };
          expect(component.courseForm.value).toEqual(courseForm);
        });
    });

    describe('business',()=>{       

      it('should validate the title field in the form', () => {
        const c = component.courseForm.controls['title'];      
        c.setValue('Title1'); 
        expect(c.valid).toBeTruthy();   
        c.setValue(''); 
        expect(c.invalid).toBeTruthy(); 
        c.setValue('Ti'); 
        expect(c.invalid).toBeTruthy();
        c.setValue('aaaa aaa aaa aaaaa aaaaaaaaaaa aaaaaaaaa a a a a a  a a a a a aaaaaaa aaa aaaaaaa aaa aaaa aaaaaa aaa aaaa aaaaaaa aaaaaa aaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaa aaaaaaa aaaaa aaaaaaaa aaaaaaaa aaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaaaaaaaa aaaaaa aaaaaaa aaaaa aaaa');    
        expect(c.invalid).toBeTruthy();
      });

      it('should validate the description field in the form', () => {
        const c = component.courseForm.controls['description'];        
       c.setValue('description');    
        expect(c.valid).toBeTruthy();    
       c.setValue('');    
        expect(c.invalid).toBeTruthy(); 
      });

      it('should validate the instructor field in the form', () => {
        const c = component.courseForm.controls['instructor'];        
       c.setValue('instructor');    
        expect(c.valid).toBeTruthy();    
       c.setValue('');    
        expect(c.invalid).toBeTruthy(); 
      });

      it('should validate the duration field in the form', () => {
        const c = component.courseForm.controls['duration'];        
       c.setValue('1 month');    
        expect(c.valid).toBeTruthy();    
       c.setValue('');    
        expect(c.invalid).toBeTruthy();   
      });

   
      it('should  validate the startDate field in the form', () => {
        const c = component.courseForm.controls['startDate'];        
       c.setValue('2022-01-01');    
        expect(c.valid).toBeTruthy();    
       c.setValue('');    
        expect(c.invalid).toBeTruthy(); 
      });

      it('should validate the endDate field in the form', () => {
        const c = component.courseForm.controls['endDate'];        
       c.setValue('2023-01-01');    
        expect(c.valid).toBeTruthy();    
       c.setValue('');    
        expect(c.valid).toBeTruthy(); 
      });

      it('validates the syllabus field in the form', () => {
        const c = component.courseForm.controls['syllabus'];        
       c.setValue('syllabus1');    
        expect(c.valid).toBeTruthy();    
        c.setValue('');    
        expect(c.valid).toBeTruthy();   
      });


    });
  
   describe("boundary", ()=>{

      it('should invalidate the form when title length  is greater than 100', () => {
        const form = component.courseForm;
        form.controls['title'].setValue('aaaa aaaa aaaaa aaaaa aa aaaaaaaaaa aaaaaaaaaa aaaa  aaaa aaaa aaaaa aaaaa aa aaaaaaaaaa aaaaaaaaaa aaaa aaaa aaaaa aaaaa aa aaaaaaaaaaaaaaaaaaaa');
        expect(form.invalid).toBeTruthy();
        expect(form.controls['title'].errors?.['maxlength']).toBeTruthy();
      });

      it('should invalidate the form when title length is less than 3', () => {
        const form = component.courseForm;
        form.controls['title'].setValue('Ti');
        expect(form.invalid).toBeTruthy();
        expect(form.controls['title'].errors?.['minlength']).toBeTruthy();
      });

   });

    describe('business',()=>{

      it('should validate the form ',()=>{
        component.courseForm.controls['id'].setValue(1);
        component.courseForm.controls['title'].setValue('title');
        component.courseForm.controls['description'].setValue('description');
        component.courseForm.controls['instructor'].setValue('instructor');
        component.courseForm.controls['duration'].setValue('1 month');
        component.courseForm.controls['startDate'].setValue(new Date('2022-01-01'));
        component.courseForm.controls['endDate'].setValue(new Date('2023-01-01'));
        component.courseForm.controls['syllabus'].setValue('syllabus');
        expect(component.courseForm.valid).toBeTruthy();
      });

        it('should disable the submit button when the form is invalid', () => {
        const form = component.courseForm;
        form.controls['title'].setValue('');
        form.controls['description'].setValue('');
        form.controls['instructor'].setValue('');
        form.controls['duration'].setValue('');
        form.controls['startDate'].setValue('');
        form.controls['endDate'].setValue('');
        form.controls['syllabus'].setValue('');
        fixture.detectChanges();    
        const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
        expect(submitButton.disabled).toBe(true);
      });

      it('should enable the submit button when the form is valid', () => {
        const form = component.courseForm;
        //component.courseForm.controls['id'].setValue('');
        component.courseForm.controls['title'].setValue('title1');
        component.courseForm.controls['description'].setValue('description1');
        component.courseForm.controls['instructor'].setValue('instructor1');
        component.courseForm.controls['duration'].setValue('duration1');
        component.courseForm.controls['startDate'].setValue(new Date('2022-01-01'));
        component.courseForm.controls['endDate'].setValue(new Date('2023-01-01'));
        component.courseForm.controls['syllabus'].setValue('syllabus');
        fixture.detectChanges();        
        const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
        expect(submitButton.disabled).toBe(false);
      });
    });

  describe('exception',()=>{

    it('should invalidate the form when empty',()=>{
      component.courseForm.controls['id'].setValue('');
      component.courseForm.controls['title'].setValue('');
      component.courseForm.controls['description'].setValue('');
      component.courseForm.controls['instructor'].setValue('');
      component.courseForm.controls['duration'].setValue('');
      component.courseForm.controls['startDate'].setValue('');
      component.courseForm.controls['endDate'].setValue('');
      component.courseForm.controls['syllabus'].setValue('');
      expect(component.courseForm.valid).toBeFalsy();
    });
  
    // it('id field validity', () => {
    //   const c = component.courseForm.controls['id']
    //   expect(c.invalid).toBeFalsy();            
    // });
    
    it('should required title field', () => {
      const c = component.courseForm.controls['title']
      expect(c.valid).toBeFalsy();      
      c.setValue('');
      expect(c.hasError('required')).toBeTruthy();      
    });
    
    it('should required description field', () => {
      const c = component.courseForm.controls['description']
      expect(c.valid).toBeFalsy();      
      c.setValue('');
      expect(c.hasError('required')).toBeTruthy();      
    });
    
    it('should required duration field', () => {
      const c = component.courseForm.controls['duration']
      expect(c.valid).toBeFalsy();      
      c.setValue('');
      expect(c.hasError('required')).toBeTruthy();      
    });
    
    it('should required startDate field', () => {
      const c = component.courseForm.controls['startDate']
      expect(c.valid).toBeFalsy();      
      c.setValue('');
      expect(c.hasError('required')).toBeTruthy();      
    });

    it('endDate field validity', () => {
      const c = component.courseForm.controls['endDate']
      expect(c.invalid).toBeFalsy();      
      c.setValue('');
      expect(c.hasError('required')).toBeFalsy();      
    });

    it('syllabus field validity', () => {
      const c = component.courseForm.controls['syllabus']
      expect(c.invalid).toBeFalsy();      
      c.setValue('');
      expect(c.hasError('required')).toBeFalsy();      
    });  
  });

  //  describe('business',()=>{

  //     it('createCourse method to be defined',()=>{
  //      component.createCourse=jest.fn();
  //      expect(component.createCourse).toBeDefined();
  //     });
  
  //     it('updateCourse method to be defined',()=>{
  //       component.updateCourse=jest.fn();
  //       expect(component.updateCourse).toBeDefined();
  //      });
  
  //      it('getAllCourses method to be defined',()=>{
  //       component.getAllCourses=jest.fn();
  //       expect(component.getAllCourses).toBeDefined();
  //      });

  //      it('getCourseById method to be defined',()=>{
  //       component.getCourseById=jest.fn();
  //       expect(component.getCourseById).toBeDefined();
  //      });
       
  //      it('deleteCourse method to be defined',()=>{
  //       component.deleteCourse=jest.fn();
  //       expect(component.deleteCourse).toBeDefined();
  //      });

  //      it('searchByTitle method to be defined',()=>{
  //       component.searchByTitle=jest.fn();
  //       expect(component.searchByTitle).toBeDefined();        
  //      });
      
  //      it('searchByStartDate method to be defined',()=>{
  //       component.searchByStartDate=jest.fn();
  //       expect(component.searchByStartDate).toBeDefined();        
  //      });
      
  //   });

  //   describe('business',()=>{
      
  //     it('should call createCourse', () => {
  //       jest.spyOn(component, 'createCourse');
  //       component.createCourse();  
  //       expect(component.createCourse).toHaveBeenCalled();
  //     });
      
  //     it('should call getAllCourses', () => {
  //       jest.spyOn(component, 'getAllCourses');
  //       component.getAllCourses();  
  //       expect(component.getAllCourses).toHaveBeenCalled();
  //     });

  //     // it('should call getCourseById', () => {
  //     //   jest.spyOn(component, 'getCourseById');
  //     //   component.getCourseById(1);  
  //     //   expect(component.getCourseById).toHaveBeenCalled();
  //     // });
      
  //     it('should call deleteCourse', () => {
  //       jest.spyOn(component, 'deleteCourse');
  //       component.deleteCourse(1);  
  //       expect(component.deleteCourse).toHaveBeenCalled();
  //     });

  //     it('should get all courses',()=>{ 
  //       const response={
  //         success:true,
  //         message:'all courses got successfully'
  //       };
  //       const c=jest.spyOn(serviceMock,'getAllCourses').mockReturnValue(response);
  //       expect(serviceMock.getAllCourses(course)).toBe(response);
  //       expect(c).toHaveBeenCalled();
  //       })        
                       
  //     it('should add the course',()=>{ 
  //       const response={
  //         success:true,
  //         message:'course added successfully'
  //       };
  //       const c=jest.spyOn(serviceMock,'createCourse').mockReturnValue(response);
  //       expect(serviceMock.createCourse(course)).toBe(response);
  //       expect(c).toHaveBeenCalledWith(course);
  //       })

  //         it('should edit the Course of specified id',()=>{ 
  //           const response={
  //           success:true,
  //           message:'Course updated successfully'
  //         };
  //         const c=jest.spyOn(serviceMock,'updateCourse').mockReturnValue(response);
  //         expect(serviceMock.updateCourse(course)).toBe(response);
  //         expect(c).toHaveBeenCalledWith(course);
  //         })
  
  //         it('should delete the Course of specified id',()=>{   
  //             const response={
  //               success:true,
  //               message:'Course deleted successfully'
  //             };
  //             const c=jest.spyOn(serviceMock,'deleteCourse').mockReturnValue(response);
  //             expect(serviceMock.deleteCourse(1)).toBe(response);
  //             expect(c).toHaveBeenCalledWith(1);
  //         })

  //             it('search course by title ',()=>{ 
  //               const response={
  //                 success:true,
  //                 message:'a course get successfully'
  //               };
  //               const c=jest.spyOn(serviceMock,'searchByTitle').mockReturnValue(response);
  //               expect(serviceMock.searchByTitle('Title')).toBe(response);
  //               expect(c).toHaveBeenCalledWith('Title');
  //               })

  //               it('search course by StartDate ',()=>{ 
  //                 const response={
  //                   success:true,
  //                   message:'a course get successfully'
  //                 };

  //                 const c=jest.spyOn(serviceMock,'searchByStartDate').mockReturnValue(response);
  //                 expect(serviceMock.searchByStartDate('2023-01-01')).toBe(response);
  //                 expect(c).toHaveBeenCalledWith('2023-01-01');
  //               });
  //   });  
    

    // describe("business",()=>{
    //   it('should call CourseService getAllCourses method on initialization', () => {
    //     const mockCourses: Course [] = [{
    //       id: 1,       
    //       title: 'Title',
    //       description: 'Description',
    //       instructor: 'Instructor',
    //       duration: 'duration',
    //       startDate: new Date('2022-01-01'),
    //       endDate:new Date('2023-01-01'),
    //       syllabus: 'syllabus'
    //     }];
    //     const getAllCoursesSpy = jest.spyOn(courseService, 'getAllCourses')//.mockReturnValue(of(mockCourses));
    //     component.ngOnInit();    
    //     expect(getAllCoursesSpy).toHaveBeenCalled();
    //     expect(component.courses).toEqual(mockCourses);
    //   });

    //   it('should call CourseService createCourse property and update the courses list', () => {
    //     const mockCourse: Course = {
    //       id: 1,       
    //       title: 'Title',
    //       description: 'Description',
    //       instructor: 'Instructor',
    //       duration: 'duration',
    //       startDate: new Date('2022-01-01'),
    //       endDate:new Date('2023-01-01'),
    //       syllabus: 'syllabus'
    //     }
    //     courseService.createCourse = jest.fn().mockReturnValue(of(mockCourse));      
    //     component.createCourse();      
    //    // expect(courseService.addCourse).toHaveBeenCalled();
    //     expect(component.courses).toContainEqual(mockCourse);
    //   });      
           
    //   it('should call CourseService updateCourse property and update the courses list', () => {
    //     const updatedCourse: Course = {
    //       id: 1,       
    //       title: 'Title',
    //       description: 'Description',
    //       instructor: 'Instructor',
    //       duration: 'duration',
    //       startDate: new Date('2022-01-01'),
    //       endDate:new Date('2023-01-01'),
    //       syllabus: 'syllabus'
    //     }
    //     courseService.updateCourse = jest.fn().mockReturnValue(of(undefined));      
    //     component.updateCourse();      
    //     // expect(courseService.updateCourse).toHaveBeenCalled();
    //     expect(component.courses).toContainEqual(updatedCourse);
    //   });
      
    //   it('should call CourseService deleteCourse method and remove the course from the courses list', () => {
    //     const courseToDelete: Course = {
    //       id: 1,       
    //       title: 'Title',
    //       description: 'Description',
    //       instructor: 'Instructor',
    //       duration: 'duration',
    //       startDate: new Date('2022-01-01'),
    //       endDate:new Date('2023-01-01'),
    //       syllabus: 'syllabus'
    //     };
    //     const deleteCourseSpy = jest.spyOn(courseService, 'deleteCourse')//.mockReturnValue(of());
    //     component.deleteCourse(courseToDelete.id);
    //     //expect(deleteCourseSpy).toHaveBeenCalledWith(1);
    //     expect(component.courses).not.toContain(courseToDelete);
    //   });

    //   //search

    // });
 
      describe("business", ()=>{
            it('should fetch all courses', ()=>{    
              component.courses=[];
              jest.spyOn(mockService, 'getAllCourses').mockReturnValue(of([course]));
              component.getAllCourses();        
              //expect(mockService.getAllCourses).toBeCalledTimes(1);
              expect(component.courses.length).toBeGreaterThan(0);    
              expect(Array.isArray(component.courses)).toBe(true);
            }) 
            
            it('should delete course by id', ()=>{  
              jest.spyOn(mockService, 'deleteCourse').mockReturnValue(of(course));
              component.deleteCourse(1);      
              expect(mockService.deleteCourse).toBeCalledTimes(1);
              expect(mockService.deleteCourse).toBeCalledWith(1);
          
            })
          
            it('should get course  by id', ()=>{  
              jest.spyOn(mockService, 'getCourse')//.mockReturnValue(of(course));
              component.getCourseById(1);      
              expect(mockService.getCourse).toBeCalledTimes(1);
              expect(mockService.getCourse).toBeCalledWith(1);
          
            })

      });
});


//Learning Management System App