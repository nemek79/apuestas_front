import { Torneo } from './torneo';
import { Tipo } from './Tipo';
import { Tipster } from './Tipster';
import { Estado } from './estado';

export class Virtual {

  id: number;
  fechaAlta: string;
  fechaEvento: string;
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
  apuestaId: number;

}
