import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/servicios/info.service';
import { InfoDiaria } from 'src/app/modelos/InfoDiaria';
import { Aviso } from 'src/app/modelos/aviso';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public infoDiaria: InfoDiaria;
  public avisos: Aviso[];
  public cargando = 0;

  constructor(
    private infoSRV: InfoService
  ) {
    this.cargando = 2;
    this.loadInfo();
  }

  ngOnInit() {
  }

  private loadInfo() {

    this.infoDiaria = new InfoDiaria();

    this.infoSRV.getInfoDiaria().subscribe(
      response => {
        this.infoDiaria = response.data;
        this.cargando = this.cargando - 1;
      }
    );

    this.infoSRV.getAvisos().subscribe(
      response => {
        this.avisos = response.data;
        this.cargando = this.cargando - 1;
      }
    );

  }

}
