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
import { Tipster } from 'src/app/modelos/Tipster';
import { Deporte } from 'src/app/modelos/deporte';
import { Torneo } from 'src/app/modelos/torneo';
import { Estado } from 'src/app/modelos/estado';
import { Tipo } from 'src/app/modelos/Tipo';
import { environment } from 'src/environments/environment';


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

  public lstTipsters: Tipster[];
  public lstDeportes: Deporte[];
  public lstTorneos: Torneo[];
  public lstEstados: Estado[];
  public lstTipos: Tipo[];

  public virtual = new Virtual();

  dateVirtual = new FormControl(new Date());
  dateEventoVirtual = new FormControl(new Date());

  iconBtnVer = faCheckSquare;

  public dtOptions: DataTables.Settings = {};

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
    this.dtOptions = environment.datatableOptions;
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

  abrirModal(): void {

    this.virtual = new Virtual();

    this.virtual.fechaEvento =  formatDate(new Date(), 'yyyy-MM-dd', 'es');

    // cargar info para combo de tipster
    this.tipsterSRV.getTipsters().subscribe(
      tipsters => this.lstTipsters = tipsters
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

    $('#mdlApuestaVirtual').modal('show');

  }

  cargarTorneos(deporteId: number) {

    this.deportesSRV.getTorneos(deporteId).subscribe( torneos => this.lstTorneos = torneos );

  }

  create(): void {

    this.apuestasSRV.createVirtual(this.virtual).subscribe(
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

  cambiarFecha(): void {

    const paramDate =  formatDate(this.dateVirtual.value, 'yyyyMMdd', 'es');
    this.fechaLista = paramDate;
    this.router.navigate(['/virtuales', paramDate]);
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
        this.apuestasSRV.actualizarEstadoVirtual(apuestaId, estadoId).subscribe(
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
