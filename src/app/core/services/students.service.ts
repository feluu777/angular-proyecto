import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { students } from '../models/students'
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentsService {
    private apiUrl = `${environment.baseApiUrl}/students`;

    constructor(private http: HttpClient) { }

    getStudents(): Observable<students[]> {
        return this.http.get<students[]>(this.apiUrl);
    }

    addStudent(student: students): Observable<students> {
        return this.http.post<students>(this.apiUrl, student);
    }

    deleteStudentById(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
