export class InfoDiaria {

    fecha: string;
    numApuestasTotal: number;
    numApuestasPendientes: number;
    numApuestasGanadas: number;
    numApuestasPerdidas: number;
    numApuestasOtras: number;
    importeTotal: number;
    importeGanado: number;
    importePerdido: number;
    importePotencial: number;
    importeGanancia: number;
    yield: number;

    constructor() {

        this.fecha = '';
        this.numApuestasTotal = 0;
        this.numApuestasPendientes = 0;
        this.numApuestasGanadas = 0;
        this.numApuestasPerdidas = 0;
        this.numApuestasOtras = 0;
        this.importeTotal = 0;
        this.importeGanado = 0;
        this.importePerdido = 0;
        this.importePotencial = 0;
        this.importeGanancia = 0;
        this.yield = 0;
    }

}