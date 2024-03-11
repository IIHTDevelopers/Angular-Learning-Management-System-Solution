import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LmsComponent } from './lms.component';

describe('LmsComponent', () => {
  let component: LmsComponent;
  let fixture: ComponentFixture<LmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LmsComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have initial courses array populated', () => {
      expect(component.courses.length).toBeGreaterThan(0);
    });

    it('should display the "Courses" heading', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('div:nth-child(1) h2')?.textContent).toContain('Courses');
    });

    it('should display the "Add Course" heading', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('div:nth-child(2) h2')?.textContent).toContain('Add Course');
    });

    it('should have a title input field in the add course form', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const titleInput = compiled.querySelector('div:nth-child(2) form input[name="title"]');
      expect(titleInput).toBeTruthy();
    });

    it('should have a description input field in the add course form', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const descriptionInput = compiled.querySelector('div:nth-child(2) form input[name="description"]');
      expect(descriptionInput).toBeTruthy();
    });

    it('should have a duration input field in the add course form', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const durationInput = compiled.querySelector('div:nth-child(2) form input[name="duration"]');
      expect(durationInput).toBeTruthy();
    });

    it('should have an enrollmentDeadline input field in the add course form', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const enrollmentDateInput = compiled.querySelector('div:nth-child(2) form input[name="enrollmentDeadline"]');
      expect(enrollmentDateInput).toBeTruthy();
    });

    it('should have an "Add Course" button in the add course form', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const addButton = compiled.querySelector('div:nth-child(2) form button[type="submit"]');
      expect(addButton).toBeTruthy();
      expect(addButton?.textContent).toContain('Add Course');
    });

    it('should display the "Enrolled Students" heading', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('div:nth-child(3) h2')?.textContent).toContain('Enrolled Students');
    });

    it('should display the "Enroll Student to Course" heading', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('div:nth-child(4) h2')?.textContent).toContain('Enroll Student to Course');
    });

    it('should display the "Student Progress" heading', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('div:nth-child(5) h2')?.textContent).toContain('Student Progress');
    });

    it('should display the "Update Progress" heading', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('div:nth-child(6) h2')?.textContent).toContain('Update Progress');
    });

    it('should have an assignmentTitle input field in the update progress form', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const assignmentTitleInput = compiled.querySelector('div:nth-child(6) form input[name="assignmentTitle"]');
      expect(assignmentTitleInput).toBeTruthy();
    });

    it('should have a score input field in the update progress form', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const scoreInput = compiled.querySelector('div:nth-child(6) form input[name="score"]');
      expect(scoreInput).toBeTruthy();
    });

    it('should have an "Update Progress" button in the update progress form', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const updateButton = compiled.querySelector('div:nth-child(6) form button[type="submit"]');
      expect(updateButton).toBeTruthy();
      expect(updateButton?.textContent).toContain('Update Progress');
    });

    it('should display the "Certificates" heading', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('div:nth-child(7) h2')?.textContent).toContain('Certificates');
    });

    it('should display the "Assign Certificate" heading', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('div:nth-child(8) h2')?.textContent).toContain('Assign Certificate');
    });

    it('should have an "Assign Certificate" button in the assign certificate form', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const assignButton = compiled.querySelector('div:nth-child(8) form button[type="submit"]');
      expect(assignButton).toBeTruthy();
      expect(assignButton?.textContent).toContain('Assign Certificate');
    });
  });
});
