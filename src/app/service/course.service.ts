import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly baseUrl = 'http://127.0.0.1:8081/learningmanagement/lms';

  constructor(private http: HttpClient) { }

  createCourse(course: Course): Observable<Course> {
 
    return this.http.post<Course>(this.baseUrl, course);
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchByTitle(title: string): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/search?title=${title}`);
  }

  searchByStartDate(startDate: Date): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/search?startDate=${startDate}`);
  }

  // searchByTitle(title: string): Observable<Course[]> {
  //   return this.http.get<Course[]>(`${this.baseUrl}/search/title?title=${title}`);
  // }

  // searchByStartDate(startDate: Date): Observable<Course[]> {
  //   return this.http.get<Course[]>(`${this.baseUrl}/search/startDate?startDate=${startDate.toISOString()}`);
  // }

}
