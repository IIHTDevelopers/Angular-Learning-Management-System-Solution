import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = 'http://127.0.0.1:8081/learningmanagement/users';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
 
    return this.http.post<User>(this.baseUrl, user);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchByTitle(title: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/search?title=${title}`);
  }

  searchByStartDate(startDate: Date): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/search?startDate=${startDate}`);
  }

  // searchByTitle(title: string): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.baseUrl}/search/title?title=${title}`);
  // }

  // searchByStartDate(startDate: Date): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.baseUrl}/search/startDate?startDate=${startDate.toISOString()}`);
  // }

}
