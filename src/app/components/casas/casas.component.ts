import { Component, OnInit } from '@angular/core';
import { CasasService } from 'src/app/servicios/casas.service';
import { Casa } from 'src/app/modelos/casa';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-casas',
  templateUrl: './casas.component.html',
  styleUrls: ['./casas.component.css']
})
export class CasasComponent implements OnInit {

  public lstCasas: Casa[];
  public casa = new Casa();
  public cargando = false;

  public dtOptions: DataTables.Settings = {};

  constructor(
    private casasSRV: CasasService
  ) {
    this.cargando = true;
    this.loadCasas();
  }

  ngOnInit() {
    this.dtOptions = environment.datatableOptions;
  }

  /**
   * Abre el modal para crear una casa en el sistema
   */
  abrirModal(): void {

    this.casa = new Casa();

    $('#mdlCasa').modal('show');

  }

  /**
   * Crea una nueva casa en el sistema
   */
  create(): void {

    console.log(this.casa);

    this.casasSRV.create(this.casa).subscribe(
      response => {

        $('#mdlCasa').modal('hide');
        this.loadCasas();
        swal.fire('Nueva Casa de Apuestas', `Casa [#${response.id}] creada con éxito!`, 'success');

      },
      err => {
        swal.fire('Nueva Casa de Apuestas', `${err.error.mensaje}`, 'error');
      }
    );

  }

  // TODO Funcion para editar una casa
  edit(casa: any): void {
    console.log('TO BE DONE');
  }

  /**
   * Carga la lista de casas de apuestas disponibles en el sistema
   */
  private loadCasas(): void {

    this.casasSRV.getCasas().subscribe(
      casas => {
        this.lstCasas = casas;
        this.cargando = false;
      }
    );

  }
}
