import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Apuesta } from '../modelos/apuesta';
import { ApuestaFilter } from '../modelos/request/apuestaFilter';
import { environment } from '../../environments/environment';
import { Virtual } from '../modelos/virtual';

@Injectable({
  providedIn: 'root'
})
export class ApuestasService {

  private urlEndPoint = environment.urlBase + 'apuestas';
  private urlEndPointVirtuales = environment.urlBase + 'virtuales';

  private httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }


  /**
   * Obtiene todas las apuestas
   */
  getAllApuestas(): Observable<any> {

    return this.http.get(this.urlEndPoint);

  }

  /**
   * Obtiene la lista de apuestas con fecha de evento igual a la fecha actual
   */
  getApuestasDiaEvento(filter: ApuestaFilter): Observable<any> {

    /*
    const params = new HttpParams().set('fechaIni', filter.fechaIni);
    console.log(params);
    */

    const localUrl = this.urlEndPoint + '?fechaIni=' + filter.fechaIni;

    return this.http.get<any>(localUrl , {headers: this.httpHeaders});

  }

  /**
   * Crea una nueva apuesta en el sistema
   */
  create(apuesta: Apuesta): Observable<any> {

    return this.http.post(this.urlEndPoint, apuesta, {headers: this.httpHeaders}).pipe(
      map( (response: any) => {

        response.data.fechaEvento = response.data.fechaEvento.substring(0, 10);

        return response.data as Apuesta;
      }),
      catchError(e => {
        console.log(e);
        return throwError(e);
      })
    );

  }

  /**
   * Elimina una apuesta. NO IMPLEMENTADO EN EL BACK
   */
  delete(apuestaId: number): Observable<any> {

    return this.http.delete(this.urlEndPoint + '/' + apuestaId, {headers: this.httpHeaders});

  }

  /**
   * Actualiza el estado de la apuesta al estado indicado
   */
  actualizarEstado(apuestaId: number, estadoId: number): Observable<any> {

    return this.http.put(this.urlEndPoint + '/' + apuestaId + '/estado?estadoId=' + estadoId, {headers: this.httpHeaders});

  }

  /**
   * Actualiza el estado de una apuesta con estado parcial
   */
  actualizarEstadoParcial(apuestaId: number, ganancia: number): Observable<any> {

    return this.http.put(this.urlEndPoint + '/' + apuestaId + '/estado?estadoId=7&ganancia='
    + ganancia, {headers: this.httpHeaders});

  }

  // =============================================
  //  VIRTUALES
  // =============================================

  /**
   * Obtiene la lista de apuestas virtuales con fecha de evento igual a la fecha actual
   */
  getVirtualesDiaEvento(filter: ApuestaFilter): Observable<any> {

    const localUrl = this.urlEndPointVirtuales + '?fechaIni=' + filter.fechaIni;

    return this.http.get<any>(localUrl , {headers: this.httpHeaders});

  }

  /**
   * Crea una nueva apuesta virtual en el sistema
   */
  createVirtual(apuesta: Virtual): Observable<any> {

    return this.http.post(this.urlEndPointVirtuales, apuesta, {headers: this.httpHeaders}).pipe(
      map( (response: any) => {

        response.data.fechaEvento = response.data.fechaEvento.substring(0, 10);

        return response.data as Apuesta;
      }),
      catchError(e => {
        console.log(e);
        return throwError(e);
      })
    );

  }

  /**
   * Actualiza el estado de la apuesta virtual al estado indicado
   */
  actualizarEstadoVirtual(apuestaId: number, estadoId: number): Observable<any> {

    return this.http.put(this.urlEndPointVirtuales + '/' + apuestaId + '/estado?estadoId=' + estadoId, {headers: this.httpHeaders});

  }

}
