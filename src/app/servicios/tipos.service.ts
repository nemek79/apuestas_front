import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TiposService {

  private urlEndPoint = 'http://vir2al.es:8180/api/tipos';

  constructor(
    private http: HttpClient
  ) {

  }


  getTipos(): Observable<any> {

    return this.http.get(this.urlEndPoint).pipe(
      map((response: any) => {
        return response.data;
      })
    );

  }

}
