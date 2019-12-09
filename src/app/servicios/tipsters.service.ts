import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Tipster } from '../modelos/Tipster';

@Injectable()
export class TipstersService {

  private urlEndPoint = 'http://vir2al.es:8180/api/tipsters';

  private httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) {

  }


  /**
   * Obtiene la lista de todos los tipster activos en el sistema
   */
  getTipsters(): Observable<any> {

    return this.http.get(this.urlEndPoint).pipe(
      map((response: any) => {
        return response.data;
      })
    );

  }

  getTipster(tipsterId: number): Observable<Tipster> {

    return this.http.get(this.urlEndPoint + '/' + tipsterId).pipe(
      map( (response: any) => {
        return response.data;
      })
    );

  }

  /**
   * Crea un nuevo tipster en el sistema
   */
  create(tipster: Tipster): Observable<any> {

    // siempre se crea como activo
    tipster.activo = true;

    return this.http.post(this.urlEndPoint, tipster, {headers: this.httpHeaders}).pipe(
      map( (response: any) => {

        return response.data as Tipster;
      }),
      catchError(e => {
        console.log(e);
        return throwError(e);
      })
    );

  }

}
