import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { teachers } from '../models/teachers';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TeachersService {
    private apiUrl = `${environment.baseApiUrl}/teachers`;

    constructor(private http: HttpClient) { }

    getTeachers(): Observable<teachers[]> {
        return this.http.get<teachers[]>(this.apiUrl);
    }

    addTeacher(teacher: teachers): Observable<teachers> {
        return this.http.post<teachers>(this.apiUrl, teacher);
    }

    deleteTeacherById(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

}
