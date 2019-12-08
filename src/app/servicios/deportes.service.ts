import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Deporte } from '../modelos/deporte';
import { Torneo } from '../modelos/torneo';

@Injectable()
export class DeportesService {

  private urlEndPoint = 'http://localhost:8180/api/deportes';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) {

  }

  getDeportes(): Observable<any> {

    return this.http.get(this.urlEndPoint).pipe(
      map((response: any) => {
        return response.data;
      })
    );

  }

  getTorneos(idDeporte: number): Observable<any> {

    return this.http.get(this.urlEndPoint + '/' + idDeporte + '/'  + 'torneos').pipe(
      map((response: any) => {
        return response.data;
      })
    );

  }

  /**
   * Obtiene un deporte por su identificador
   */
  getDeporte(deporteId: number): Observable<Deporte> {

    return this.http.get(this.urlEndPoint + '/' + deporteId).pipe(
      map( (response: any) => {
        return response.data;
      })
    );

  }

  /**
   * Obtiene un torneo por su identificador
   */
  getTorneo(torneoId: number): Observable<Torneo> {

    return this.http.get(this.urlEndPoint + '/torneos/' + torneoId).pipe(
      map( (response: any) => {
        return response.data;
      })
    );

  }

  /**
   * Crea un deporte
   */
  createDeporte(deporte: Deporte): Observable<any> {


    return this.http.post(this.urlEndPoint, deporte, {headers: this.httpHeaders}).pipe(
      map( (response: any) => {

        return response.data as Deporte;
      }),
      catchError(e => {
        console.log(e);
        return throwError(e);
      })
    );

  }

  /**
   * Crea un torneo
   */
  createTorneo(torneo: Torneo): Observable<any> {


    return this.http.post(this.urlEndPoint + '/torneos', torneo, {headers: this.httpHeaders}).pipe(
      map( (response: any) => {

        return response.data as Torneo;
      }),
      catchError(e => {
        console.log(e);
        return throwError(e);
      })
    );
  }
}
