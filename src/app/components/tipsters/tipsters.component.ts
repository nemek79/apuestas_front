import { Component, OnInit } from '@angular/core';
import { TipstersService } from 'src/app/servicios/tipsters.service';
import { Tipster } from 'src/app/modelos/Tipster';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-tipsters',
  templateUrl: './tipsters.component.html',
  styleUrls: ['./tipsters.component.css']
})
export class TipstersComponent implements OnInit {

  public lstTipsters: Tipster[];
  public tipster = new Tipster();

  public dtOptions: DataTables.Settings = {};

  constructor(
    private tipsterSRV: TipstersService
  ) {
    this.loadTipsters();
  }

  ngOnInit() {

    this.dtOptions = environment.datatableOptions;
  }


  /**
   * Abre el modal para crear un tipster en el sistema
   */
  abrirModal(): void {

    this.tipster = new Tipster();

    $('#mdlTipster').modal('show');

  }

  create(): void {

    this.tipsterSRV.create(this.tipster).subscribe(
      response => {

        $('#mdlTipster').modal('hide');
        this.loadTipsters();
        swal.fire('Nuevo Tipster', `Tipster [#${response.id}] creado con éxito!`, 'success');

      },
      err => {
        swal.fire('Nueva Tipster', `${err.error.mensaje}`, 'error');
      }
    );

  }

  // TODO Funcion para editar un tipster
  edit(tipster: any): void {
    console.log('TO BE DONE');
  }

  /**
   * Obtiene la lista de tipster con una llamada al servicio
   */
  private loadTipsters(): void {


    this.tipsterSRV.getTipsters().subscribe(
      tipsters => this.lstTipsters = tipsters
    );

  }

}
