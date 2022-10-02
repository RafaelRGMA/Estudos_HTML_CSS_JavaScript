import { Operacoes } from "./Operacoes.js";

export class CalculadoraInterface{
    private _arrayBtnNum:NodeList;
    private _display:HTMLInputElement;
    private _btnSoma:HTMLButtonElement;
    private _btnSubtracao:HTMLButtonElement;
    private _btnIgual:HTMLButtonElement;
    private _btnMultiplicacao:HTMLButtonElement;
    private _btnDivisao:HTMLButtonElement;
    private _btnLimpar:HTMLButtonElement;
    private _inputNumerico:boolean = false;
    private _ultimaOperacao:string = ""
    private _operacoes:Operacoes;
    constructor(){
        this._operacoes = new Operacoes();
        this._arrayBtnNum = this._botoesNumericos();
        this._display = document.querySelector("#display-screen");
        this._btnSoma = document.querySelector("#soma");
        this._btnSubtracao = document.querySelector("#subtracao");
        this._btnMultiplicacao = document.querySelector("#multiplicacao");
        this._btnDivisao = document.querySelector("#divizao");
        this._btnIgual = document.querySelector("#igual");
        this._btnLimpar = document.querySelector("#limpar");
        this._ativarBotoesNumericos();
        this._ativarBotaoSoma();
        this._ativarBotaoSubtracao();
        this._ativarBotaoMultiplicacao();
        this._ativarBotaoDivisao();
        this._ativarBotaoIgual();
        this._ativarBotaoLimpar();
        this._display.value = "0";
    }

  
//=====CONFIGURAÇÕES DOS BOTÕES NUMÉRICOS================================================
    private _botoesNumericos():NodeList{
        return document.querySelectorAll(".numeric-button");
    }

    private _inputNumero(botao:HTMLButtonElement):void{
        if(this._ultimaOperacao == "="){
            this._operacoes.limparResultado();
            this._ultimaOperacao = "";
        }

        if(botao.innerText != ","){
            this._operacoes.memoria = this._operacoes.memoria + botao.innerText;
        }else{
            this._operacoes.memoria = (this._operacoes.memoria.search(/[,]/) == -1)?this._operacoes.memoria + botao.innerText : this._operacoes.memoria;
        }
        
        this._display.value = this._operacoes.memoria;
        this._inputNumerico = true;
    }


    private _ativarBotoesNumericos():void{
        this._arrayBtnNum.forEach( (botao:HTMLButtonElement)=>{
           botao.addEventListener("click",()=>{
               this._inputNumero(botao);                
           });
           document.addEventListener("keypress", (event)=>{
                if(event.key == botao.innerHTML){
                    this._inputNumero(botao);
                }
           });
        });
    }

//=========================================================================================================

//======CONFIGURAÇÃO DO BOTÃO SOMAR========================================================================
    private _somar():void{
        if(this._inputNumerico && (this._ultimaOperacao != "x" && this._ultimaOperacao != "=")){
            this._operacoes.somaValor(this._retornaValorDisplay());
        }else if(this._inputNumerico && this._ultimaOperacao == "x"){
            this._operacoes.multiplicaValor(this._retornaValorDisplay());
        }

        this._display.value = this._operacoes.resultado.toString().replace(".", ",");          
        this._inputNumerico = false;
        this._ultimaOperacao = "+";
    }

    private _ativarBotaoSoma():void{
        this._btnSoma.addEventListener("click", ()=>{
           this._somar();
        });

        document.addEventListener("keypress", (event)=>{
            if(event.key == "+"){
                this._somar();
            }
        });
    }
//=================================================================================================================


//======CONFIGURAÇÃO DO BOTÃO SUBTRAIR=============================================================================
    private _subtrair():void{
        if(this._inputNumerico && (this._ultimaOperacao != "x" && this._ultimaOperacao != "=")){
            this._operacoes.somaValor(this._retornaValorDisplay());
        }else if(this._inputNumerico && this._ultimaOperacao == "x"){
            this._operacoes.multiplicaValor(this._retornaValorDisplay());
        }    

        this._operacoes.memoria = this._btnSubtracao.innerHTML;
        this._display.value = this._operacoes.resultado.toString().replace(".", ",");          
        this._inputNumerico = false;
        this._ultimaOperacao = "-"
    }

    private _ativarBotaoSubtracao():void{
        this._btnSubtracao.addEventListener("click", ()=>{
            this._subtrair();
        });

        document.addEventListener("keypress", (event)=>{
            if(event.key == "-"){
                this._subtrair();
            }
        });
    }

//=================================================================================================================

//=========CONFIGURAÇÃO DO BOTÃO MULTIPLICAR=======================================================================
    private _multiplicar():void{
        if(this._ultimaOperacao != "x" && this._ultimaOperacao != "="){
            this._operacoes.somaValor(this._retornaValorDisplay());
        }else if(this._inputNumerico && this._ultimaOperacao == "x"){
            this._operacoes.multiplicaValor(this._retornaValorDisplay());
        }    
        this._display.value = this._operacoes.resultado.toString().replace(".", ",");          
        this._inputNumerico = false;
        this._ultimaOperacao = "x";
    }


    private _ativarBotaoMultiplicacao():void{
        this._btnMultiplicacao.addEventListener("click", ()=>{
            this._multiplicar();
        });

        document.addEventListener("keypress", (event)=>{
            if(event.key == "*"){
                this._multiplicar();
            };
        });
    }
//==================================================================================================================


//===============CONFIGURAÇÃO DO BOTÃO DIVIDIR======================================================================
    private _ativarBotaoDivisao():void{
            
    }
//===============CONFIGURAÇÃO DO BOTÃO IGUAL========================================================================

    private _totalizar():void{
        if(this._inputNumerico && (this._ultimaOperacao == "+" || this._ultimaOperacao == "-")){
            this._operacoes.somaValor(this._retornaValorDisplay());
        }else if(this._inputNumerico && this._ultimaOperacao == "x"){
            this._operacoes.multiplicaValor(this._retornaValorDisplay());
        }

        this._display.value = this._operacoes.resultado.toString().replace(".", ",");
        this._ultimaOperacao = "=";
    }

    private _ativarBotaoIgual():void{
        this._btnIgual.addEventListener('click', ()=>{
            this._totalizar();
        });

        document.addEventListener("keypress", (event)=>{
            if(event.key == "Enter"){
                this._totalizar();
            }
        });
    }
//===================================================================================================================

//========CONFIGURAÇÃO DO BOTÃO LIMPAR===============================================================================

    private _ativarBotaoLimpar():void{
        this._btnLimpar.addEventListener("click", ()=>{
            this._display.value = "0";
            this._operacoes.memoria = "";
            this._operacoes.limparResultado();
            this._inputNumerico = false;
            this._ultimaOperacao = "";
        });
    }

//===================================================================================================================  
    private _retornaValorDisplay():any{
        return (this._display.value.search(/[,]/) == -1)?parseInt(this._display.value):parseFloat(this._display.value.replace(",","."));
    }
}