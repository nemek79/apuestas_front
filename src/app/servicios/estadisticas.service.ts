import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class EstadisticasService {

  private urlEndPoint = environment.urlEstadisticasBase + 'apuestas/dia/fechas';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) {

  }

  public setEstadisticasDia(): Observable<any> {

    const fechasIn = {
      fechaInicial: '20190910',
      fechaFinal: '20200120'
    };

    return this.http.post(this.urlEndPoint, fechasIn, {headers: this.httpHeaders}).pipe(
      map( (response: any) => {

        return true;
      }),
      catchError(e => {
        console.log(e);
        return throwError(e);
      })
    );

  }

  public setEstadisticasSemanaActual(): Observable<any> {

    const localUlr = environment.urlEstadisticasBase + 'apuestas/semana/actual';

    return this.http.post(localUlr, null, {headers: this.httpHeaders}).pipe(
      map( (response: any) => {

        return true;
      }),
      catchError(e => {
        console.log(e);
        return throwError(e);
      })
    );

  }

  public setEstadisticasMesActual(): Observable<any> {

    const localUlr = environment.urlEstadisticasBase + 'apuestas/mes/actual';

    return this.http.post(localUlr, null, {headers: this.httpHeaders}).pipe(
      map( (response: any) => {

        return true;
      }),
      catchError(e => {
        console.log(e);
        return throwError(e);
      })
    );

  }

}
