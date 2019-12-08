import { Component, OnInit } from '@angular/core';
import { CasasService } from 'src/app/servicios/casas.service';
import { Casa } from 'src/app/modelos/casa';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-casas',
  templateUrl: './casas.component.html',
  styleUrls: ['./casas.component.css']
})
export class CasasComponent implements OnInit {

  public lstCasas: Casa[];
  public casa = new Casa();

  constructor(
    private casasSRV: CasasService
  ) {
    this.loadCasas();
  }

  ngOnInit() {
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

  /**
   * Carga la lista de casas de apuestas disponibles en el sistema
   */
  private loadCasas(): void {

    this.casasSRV.getCasas().subscribe(
      casas => {
        this.lstCasas = casas;
      }
    );

  }
}
