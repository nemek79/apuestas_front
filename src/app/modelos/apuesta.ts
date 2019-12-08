import { Casa } from './casa';
import { Torneo } from './torneo';
import { Tipo } from './Tipo';
import { Tipster } from './Tipster';
import { Estado } from './estado';

export class Apuesta {

  id: number;
  fechaAlta: string;
  fechaEvento: string;
  casa: Casa;
  torneo: Torneo;
  tipo: Tipo;
  tipster: Tipster;
  estado: Estado;
  descripcion: string;
  apuesta: string;
  cuota: number;
  importe: number;
  ganancia: number;
  stake: number;

}
