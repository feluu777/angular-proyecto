import { Injectable } from "@angular/core";
import { generarStringAleatorio } from "../../shared/utils";
import { delay, Observable, of } from 'rxjs';
import { Curso } from '../models/cursos'

let MY_FAKE_DATABASE: Curso[] = [
    {
        id: generarStringAleatorio(6),
        nombre: 'JavaScript',
        editing: false,
        curso: ''
    },
    {
        id: generarStringAleatorio(6),
        nombre: 'React',
        editing: false,
        curso: ''
    },
    {
        id: generarStringAleatorio(6),
        nombre: 'HTML',
        editing: false,
        curso: ''
    },
]

@Injectable({ providedIn: 'root' })
export class CursoService {

    getCursos(): Observable<Curso[]> {
        return of([...MY_FAKE_DATABASE])
    }
    deleteCourseById(id: String): Observable<Curso[]> {
        MY_FAKE_DATABASE = MY_FAKE_DATABASE.filter(Curso => Curso.id != id)
        return this.getCursos()
    }
}