export class Operacoes {
    constructor() {
        this.memoria = "";
        this._resultado = 0;
    }
    get resultado() {
        return this._resultado;
    }
    limparResultado() {
        this._resultado = 0;
    }
    somaValor(valor) {
        this._resultado += valor;
        this.memoria = "";
    }
}
