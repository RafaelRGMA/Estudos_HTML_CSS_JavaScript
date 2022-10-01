export class Operacoes{
    memoria:string;
    private _resultado:number;
    constructor(){
        this.memoria = "";
        this._resultado = 0;
    }

    get resultado():number{
        return this._resultado;
    }

    limparResultado():void{
        this._resultado = 0;
    }


    somaValor(valor:number):void{
        this._resultado += valor;
        this.memoria = "";
    }

    multiplicaValor(valor:number):void{
        this._resultado *= valor;
        this.memoria = "";
    }

    divideValor(valor:number):void{
        this._resultado /= valor;
        this.memoria = "";
    }
   
}