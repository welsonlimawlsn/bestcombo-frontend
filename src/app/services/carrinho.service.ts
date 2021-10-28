import {Injectable} from '@angular/core';
import {Produto} from "./http/responses-dto";

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor() {
  }

  adicionaProduto(produto: Produto) {
    localStorage.setItem('carrinho', JSON.stringify(produto));
  }

  getProduto() {
    return JSON.parse(localStorage.getItem('carrinho') ?? '{}');
  }
}
