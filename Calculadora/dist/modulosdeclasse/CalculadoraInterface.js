import { Operacoes } from "./Operacoes.js";
export class CalculadoraInterface {
    constructor() {
        this._inputNumerico = false;
        this._ultimaOperacao = "";
        this._operacoes = new Operacoes();
        this._arrayBtnNum = this._botoesNumericos();
        this._display = document.querySelector("#display-screen");
        this._btnSoma = document.querySelector("#soma");
        this._btnSubtracao = document.querySelector("#subtracao");
        this._btnMultiplicacao = document.querySelector("#multiplicacao");
        this._btnDivisao = document.querySelector("#divizao");
        this._btnIgual = document.querySelector("#igual");
        this._ativarBotoesNumericos();
        this._ativarBotaoSoma();
        this._ativarBotaoSubtracao();
        this._ativarBotaoMultiplicacao();
        this._ativarBotaoDivisao();
        this._ativarBotaoIgual();
    }
    _botoesNumericos() {
        return document.querySelectorAll(".numeric-button");
    }
    _ativarBotoesNumericos() {
        this._arrayBtnNum.forEach((botao) => {
            botao.addEventListener("click", () => {
                if (this._ultimaOperacao == "=") {
                    this._operacoes.limparResultado();
                    this._ultimaOperacao = "";
                }
                if (botao.innerText != ",") {
                    this._operacoes.memoria = this._operacoes.memoria + botao.innerText;
                }
                else {
                    this._operacoes.memoria = (this._operacoes.memoria.search(/[,]/) == -1) ? this._operacoes.memoria + botao.innerText : this._operacoes.memoria;
                }
                this._display.value = this._operacoes.memoria;
                this._inputNumerico = true;
            });
        });
    }
    _ativarBotaoSoma() {
        this._btnSoma.addEventListener("click", () => {
            if (this._inputNumerico && (this._ultimaOperacao != "x" && this._ultimaOperacao != "=")) {
                this._operacoes.somaValor(this._retornaValorDisplay());
            }
            else if (this._inputNumerico && this._ultimaOperacao == "x") {
                this._operacoes.multiplicaValor(this._retornaValorDisplay());
            }
            this._display.value = this._operacoes.resultado.toString().replace(".", ",");
            this._inputNumerico = false;
            this._ultimaOperacao = "+";
        });
    }
    _ativarBotaoSubtracao() {
        this._btnSubtracao.addEventListener("click", () => {
            if (this._inputNumerico && (this._ultimaOperacao != "x" && this._ultimaOperacao != "=")) {
                this._operacoes.somaValor(this._retornaValorDisplay());
            }
            else if (this._inputNumerico && this._ultimaOperacao == "x") {
                this._operacoes.multiplicaValor(this._retornaValorDisplay());
            }
            this._operacoes.memoria = this._btnSubtracao.innerHTML;
            this._display.value = this._operacoes.resultado.toString().replace(".", ",");
            this._inputNumerico = false;
            this._ultimaOperacao = "-";
        });
    }
    _ativarBotaoMultiplicacao() {
        this._btnMultiplicacao.addEventListener("click", () => {
            if (this._ultimaOperacao != "x" && this._ultimaOperacao != "=") {
                this._operacoes.somaValor(this._retornaValorDisplay());
            }
            else if (this._inputNumerico && this._ultimaOperacao == "x") {
                this._operacoes.multiplicaValor(this._retornaValorDisplay());
            }
            this._display.value = this._operacoes.resultado.toString().replace(".", ",");
            this._inputNumerico = false;
            this._ultimaOperacao = "x";
        });
    }
    _ativarBotaoDivisao() {
    }
    _ativarBotaoIgual() {
        this._btnIgual.addEventListener('click', () => {
            if (this._inputNumerico && (this._ultimaOperacao == "+" || this._ultimaOperacao == "-")) {
                this._operacoes.somaValor(this._retornaValorDisplay());
            }
            else if (this._inputNumerico && this._ultimaOperacao == "x") {
                this._operacoes.multiplicaValor(this._retornaValorDisplay());
            }
            this._display.value = this._operacoes.resultado.toString().replace(".", ",");
            this._ultimaOperacao = "=";
        });
    }
    _retornaValorDisplay() {
        return (this._display.value.search(/[,]/) == -1) ? parseInt(this._display.value) : parseFloat(this._display.value.replace(",", "."));
    }
}
