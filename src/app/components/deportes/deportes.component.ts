import { Component, OnInit } from '@angular/core';
import { Torneo } from 'src/app/modelos/torneo';
import { Deporte } from 'src/app/modelos/deporte';
import { DeportesService } from 'src/app/servicios/deportes.service';

import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.component.html',
  styleUrls: ['./deportes.component.css']
})
export class DeportesComponent implements OnInit {

  public lstDeportes: Deporte[];
  public lstTorneos: Torneo[];

  public deporte = new Deporte();
  public torneo = new Torneo();

  public deporteIdSelected = -1;

  constructor(
    private deportesSRV: DeportesService
  ) {
    this.loadDeportes();
  }

  ngOnInit() {
  }

  /**
   * Abre el modal para crear un deporte
   */
  abrirModalDeporte(): void {

    this.deporte = new Deporte();

    $('#mdlDeporte').modal('show');

  }

  /**
   * Abre el modal para crear un torneo
   */
  abrirModalTorneo(): void {

    this.torneo = new Torneo();

    $('#mdlTorneo').modal('show');

  }

  /**
   * Crea un deporte
   */
  createDeporte(): void {

    this.deportesSRV.createDeporte(this.deporte).subscribe(
      response => {

        $('#mdlDeporte').modal('hide');
        this.loadDeportes();
        swal.fire('Nuevo deporte', `Deporte [#${response.id}] creado con éxito!`, 'success');

      },
      err => {
        swal.fire('Nuevo Deporte', `${err.error.mensaje}`, 'error');
      }
    );

  }

  /**
   * Crea un torneo
   */
  createTorneo(): void {

    console.log(this.torneo);

    this.torneo.deporte = new Deporte();
    this.torneo.deporte.id = this.deporteIdSelected;

    this.deportesSRV.createTorneo(this.torneo).subscribe(
      response => {

        $('#mdlTorneo').modal('hide');
        this.loadTorneos(response.deporte.id);
        swal.fire('Nuevo torneo', `Torneo [#${response.id}] creado con éxito!`, 'success');

      },
      err => {
        swal.fire('Nuevo Torneo', `${err.error.mensaje}`, 'error');
      }
    );

  }



  /**
   * Carga la lista de casas de apuestas disponibles en el sistema
   */
  private loadDeportes(): void {

    this.deportesSRV.getDeportes().subscribe(
      deportes => {
        this.lstDeportes = deportes;
      }
    );

  }

  /**
   * Carga la lista de torneos asociados a un deporte
   */
  private loadTorneos(deporteId: number): void {

    this.deporteIdSelected = deporteId;

    this.deportesSRV.getTorneos(deporteId).subscribe(
      torneos => {
        this.lstTorneos = torneos;
      }
    );

  }

  /**
   * Carga los torneos asociados al deporte indicado
   */
  private cargarTorneos(deporteId: number): void {

    this.loadTorneos(deporteId);

  }

}
