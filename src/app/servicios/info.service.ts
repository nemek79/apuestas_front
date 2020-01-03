import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class InfoService {

    private urlEndPoint = environment.urlBase + 'info';

    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(
        private http: HttpClient,
        private router: Router
      ) {

    }

    /**
     * Obtiene la información diaria de las apuestas
     */
    getInfoDiaria(): Observable<any> {

        return this.http.get(this.urlEndPoint);

    }

    /**
     * Obtiene los avisos
     */
    getAvisos(): Observable<any> {

      const localUrl = this.urlEndPoint + '/avisos';

      return this.http.get(localUrl);

  }

  }
