import { Component, OnInit } from '@angular/core';
import { Apuesta } from 'src/app/modelos/apuesta';
import { ApuestasService } from 'src/app/servicios/apuestas.service';
import { map, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import { ApuestaFilter } from 'src/app/modelos/request/apuestaFilter';
import { Tipster } from 'src/app/modelos/Tipster';
import { TipstersService } from 'src/app/servicios/tipsters.service';
import { Casa } from 'src/app/modelos/casa';
import { CasasService } from 'src/app/servicios/casas.service';
import { DeportesService } from 'src/app/servicios/deportes.service';
import { Deporte } from 'src/app/modelos/deporte';
import { Torneo } from 'src/app/modelos/torneo';
import { EstadosService } from 'src/app/servicios/estados.service';
import { Estado } from 'src/app/modelos/estado';
import { TiposService } from 'src/app/servicios/tipos.service';
import { Tipo } from 'src/app/modelos/Tipo';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';


declare var $: any;


@Component({
  selector: 'app-apuestas',
  templateUrl: './apuestas.component.html',
  styleUrls: ['./apuestas.component.css']
})
export class ApuestasComponent implements OnInit {

  public fechaLista: string;

  public lstApuestas: Apuesta[] = [];
  public totalApuestas: number;
  public apuesta = new Apuesta();
  public lstTipsters: Tipster[];
  public lstCasas: Casa[];
  public lstDeportes: Deporte[];
  public lstTorneos: Torneo[];
  public lstEstados: Estado[];
  public lstTipos: Tipo[];

  date = new FormControl(new Date());
  dateEvento = new FormControl(new Date());

  iconBtnVer = faCheckSquare;

  constructor(
    private apuestasSRV: ApuestasService,
    private tipsterSRV: TipstersService,
    private casasSRV: CasasService,
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

  private calcularTotal(listaApuestas: Apuesta[]): number {

    let total = 0;

    this.lstApuestas.forEach(element => {

      if (element.estado.id === 4) {
        total -= element.importe;
      } else if (element.estado.id > 2) {
        total += element.ganancia;
      }

    });

    return total;

  }

  abrirModal(): void {

    this.apuesta = new Apuesta();

    this.apuesta.fechaEvento =  formatDate(new Date(), 'yyyy-MM-dd', 'es');

    // cargar info para combo de tipster
    this.tipsterSRV.getTipsters().subscribe(
      tipsters => this.lstTipsters = tipsters
    );

    // cargar info para combo de casas
    this.casasSRV.getCasas().subscribe(
      casas => this.lstCasas = casas
    );

    // cargar info para combo de estados
    this.estadosSRV.getEstados().subscribe(
      estados => this.lstEstados = estados
    );

    // cargar info para combo de tipos
    this.tiposSRV.getTipos().subscribe(
      tipos => this.lstTipos = tipos
    );

    // cargar info para combo de deportes y torneos
    this.deportesSRV.getDeportes().subscribe(
      deportes => {
        this.lstDeportes = deportes;
        this.deportesSRV.getTorneos(this.lstDeportes[0].id).subscribe(
          torneos => this.lstTorneos = torneos
        );
    });

    $('#mdlApuesta').modal('show');

  }

  create(): void {

    this.apuestasSRV.create(this.apuesta).subscribe(
      response => {

        $('#mdlApuesta').modal('hide');

        swal.fire('Nueva Apuesta', `Apuesta [#${response.id}] creada con éxito!`, 'success');

        this.loadDataApuestas();

      },
      err => {
        swal.fire('Nueva Apuesta', `${err.error.mensaje}`, 'error');
      }
    );
  }


  cargarTorneos(deporteId: number) {

    this.deportesSRV.getTorneos(deporteId).subscribe( torneos => this.lstTorneos = torneos );

  }

  cambiarFecha(): void {

    const paramDate =  formatDate(this.date.value, 'yyyyMMdd', 'es');
    this.fechaLista = paramDate;
    this.router.navigate(['/apuestas', paramDate]);
  }

  eliminarApuesta(apuestaId: number): void {

    swal.fire('Eliminar Apuesta', 'Temporalmente no se pueden eliminar apuestas. Contacte con el administrador.', 'warning');
    /*
    swal.fire({
      title: 'Eliminar Apuesta',
      text: 'Está seguro de eliminar la apuesta con id: ' + apuestaId,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      type: 'warning'
    }).then((result) => {
      if (result.value) {
        this.apuestasSRV.delete(apuestaId).subscribe(
          data => {
            swal.fire('Eliminar Apuesta', 'La apuesta se ha eliminado correctamente', 'success');
          },
          err => {
            swal.fire('Eliminar Apuesta', `${err.error.mensaje}`, 'error');
          }
        );
      }
    });
    */

  }


  actualizarEstado( apuestaId: number, estadoId: number): void {

    swal.fire({
      title: 'Actualizar estado',
      text: 'Está seguro de actualizar el estado de la apuesta con id: ' + apuestaId,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
      type: 'warning'
    }).then((result) => {
      if (result.value) {
        this.apuestasSRV.actualizarEstado(apuestaId, estadoId).subscribe(
          data => {

            this.loadDataApuestas();
            swal.fire('Actualizar estado apuesta', 'El estado de la apuesta se ha actualizado correctamente', 'success');

          },
          err => {
            swal.fire('Actualizar estado apuesta', `${err.error.mensaje}`, 'error');
          }
        );
      }
    });

  }

  /**
   * Carga la lista de apuestas
   */
  private loadDataApuestas() {

    const filtro = new ApuestaFilter();
    filtro.fechaIni = formatDate(new Date(), 'yyyyMMdd', 'es');

    this.activatedRoute.paramMap.subscribe(params => {

      this.fechaLista = params.get('fechaIni');

      if (this.fechaLista) {
        filtro.fechaIni = this.fechaLista;
      }

      this.apuestasSRV.getApuestasDiaEvento(filtro).subscribe(
        response => {
          this.fechaLista = filtro.fechaIni;
          this.lstApuestas = response.data;
          this.totalApuestas = this.calcularTotal(this.lstApuestas);
        });

    });

  }

}
