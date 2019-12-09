import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Casa } from '../modelos/casa';


@Injectable()
export class CasasService {

  private urlEndPoint = 'http://vir2al.es:8180/api/casas';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de casas de apuestas en el sistema
   */
  getCasas(): Observable<any> {

    return this.http.get(this.urlEndPoint).pipe(
      map((response: any) => {
        return response.data;
      })
    );

  }

  getCasa(casaId: number): Observable<Casa> {

    return this.http.get(this.urlEndPoint + '/' + casaId).pipe(
      map( (response: any) => {
        return response.data;
      })
    );

  }

  /**
   * Crea una nueva casa de apuestas en el sistema
   */
  create(casa: Casa): Observable<any> {


    return this.http.post(this.urlEndPoint, casa, {headers: this.httpHeaders}).pipe(
      map( (response: any) => {

        return response.data as Casa;
      }),
      catchError(e => {
        console.log(e);
        return throwError(e);
      })
    );

  }

}
