import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/cursos';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private apiUrl = `${environment.baseApiUrl}/courses`;

    constructor(private http: HttpClient) { }

    getCursos(): Observable<Curso[]> {
        return this.http.get<Curso[]>(this.apiUrl);
    }

    addCurso(curso: Curso): Observable<Curso> {
        return this.http.post<Curso>(this.apiUrl, curso);
    }

    deleteCourseById(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
