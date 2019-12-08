import { Component, OnInit } from '@angular/core';
import { ApuestasService } from 'src/app/servicios/apuestas.service';
import { TipstersService } from 'src/app/servicios/tipsters.service';
import { DeportesService } from 'src/app/servicios/deportes.service';
import { EstadosService } from 'src/app/servicios/estados.service';
import { TiposService } from 'src/app/servicios/tipos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApuestaFilter } from 'src/app/modelos/request/apuestaFilter';
import { formatDate } from '@angular/common';
import { Virtual } from 'src/app/modelos/virtual';
import { FormControl } from '@angular/forms';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { map, tap } from 'rxjs/operators';
import swal from 'sweetalert2';


declare var $: any;

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styleUrls: ['./virtual.component.css']
})
export class VirtualComponent implements OnInit {

  public fechaLista: string;
  public lstVirtuales: Virtual[] = [];
  public totalVirtuales: number;

  dateVirtual = new FormControl(new Date());
  dateEventoVirtual = new FormControl(new Date());

  iconBtnVer = faCheckSquare;

  constructor(
    private apuestasSRV: ApuestasService,
    private tipsterSRV: TipstersService,
    private deportesSRV: DeportesService,
    private estadosSRV: EstadosService,
    private tiposSRV: TiposService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.loadDataApuestas();
  }

  ngOnInit() {
  }

  /**
   * Carga la lista de apuestas virtuales
   */
  private loadDataApuestas() {

    const filtro = new ApuestaFilter();
    filtro.fechaIni = formatDate(new Date(), 'yyyyMMdd', 'es');

    this.activatedRoute.paramMap.subscribe(params => {

      this.fechaLista = params.get('fechaIni');

      if (this.fechaLista) {
        filtro.fechaIni = this.fechaLista;
      }

      this.apuestasSRV.getVirtualesDiaEvento(filtro).subscribe(
        response => {
          this.fechaLista = filtro.fechaIni;
          this.lstVirtuales = response.data;
          this.totalVirtuales = this.calcularTotal(this.lstVirtuales);
        });

    });

  }

  private calcularTotal(listaApuestas: Virtual[]): number {

    let total = 0;

    this.lstVirtuales.forEach(element => {

      if (element.estado.id === 4) {
        total -= element.importe;
      } else if (element.estado.id > 2) {
        total += element.ganancia;
      }

    });

    return total;

  }

}
