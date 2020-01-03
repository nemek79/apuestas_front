import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadisticasService } from 'src/app/servicios/estadisticas.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  public cargando = false;
  public tmp = '';

  constructor(
    private estadisticasSRV: EstadisticasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.cargando = true;
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {

      const tipo: string = params.get('tipo');

      switch (tipo.toUpperCase()) {
        case 'ALL':

          this.estadisticasSRV.setEstadisticasDia().subscribe( response => {
            this.estadisticasSRV.setEstadisticasSemanaActual().subscribe( responseSemana => {
              this.estadisticasSRV.setEstadisticasMesActual().subscribe( responseMes => {
                this.cargando = false;
                swal.fire({
                  title: 'Estadísticas',
                  text: 'Las estadísticas se han actualizado con éxito',
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                  type: 'info'
                }).then((result) => {
                  if (result.value) {
                    this.router.navigate(['/']);
                  }
                });
              });
            });
          });

          break;

        default:

          this.tmp = 'ERROR!';
          break;
      }

      this.cargando = false;
    });

  }

}
