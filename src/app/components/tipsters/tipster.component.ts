import { Component, OnInit } from '@angular/core';
import { TipstersService } from 'src/app/servicios/tipsters.service';
import { Tipster } from 'src/app/modelos/Tipster';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tipster',
  templateUrl: './tipster.component.html',
  styleUrls: ['./tipster.component.css']
})
export class TipsterComponent implements OnInit {

  public tipsterId: number;
  public tipster: Tipster;

  constructor(
    private tipsterSRV: TipstersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.activatedRoute.paramMap.subscribe(params => {

      this.tipsterId = +params.get('tipsterId');

      this.tipsterSRV.getTipster(this.tipsterId).subscribe(
        tipster => {
          console.log(tipster);
          this.tipster = tipster;
        },
        err => {
          swal.fire('Tipster', 'Error al obtener los datos del tipster', 'error');
        }
      );


    }
  );

  }

  ngOnInit(): void {}
}
