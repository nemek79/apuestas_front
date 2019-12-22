import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/servicios/info.service';
import { InfoDiaria } from 'src/app/modelos/InfoDiaria';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public infoDiaria: InfoDiaria;

  constructor(
    private infoSRV: InfoService
  ) {
    this.loadInfo();
  }

  ngOnInit() {
  }

  private loadInfo() {

    this.infoDiaria = new InfoDiaria();

    this.infoSRV.getInfoDiaria().subscribe(
      response => {
        this.infoDiaria = response.data;
      }
    );
  }

}
