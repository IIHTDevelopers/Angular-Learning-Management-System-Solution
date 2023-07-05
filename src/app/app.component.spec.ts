import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseComponent } from './component/course/course.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [    
        RouterTestingModule ,FormsModule,ReactiveFormsModule,HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        CourseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('business',()=>{
        it('should create the app component', () => {
          expect(component).toBeTruthy();
        });

        it('should have the heading title as Learning Management System App', () => {
          const titleElement = fixture.nativeElement.querySelector('h1');
          expect(titleElement.textContent).toContain('Learning Management System App');
        });

      });

});
