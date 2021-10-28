export interface ListaCategoriasResponse {
  categorias: Categoria[];
}

export interface UploadImagemResponse {
  nomeArquivo: string;
}

export interface BuscaLojasResponse {
  lojas: Loja[];
}

export interface BuscaProdutosResponse {
  produtos: Produto[];
}

export interface BuscaProdutoUnicoResponse {
  produto: Produto;
}

export interface ListaPedidosResponse {
  pedidos: Pedido[];
}

export interface Categoria {
  codigo: number;
  nome: string;
  tipoServico: number;
}

export interface Pedido {
  codigo: string;
  data: Date;
  dataAgendamento: Date;
  loja: Loja;
  situacao: string;
  valor: number;
}

export interface Loja {
  codigo: string;
  cnpj: string;
  descricao: string;
  imagem: string;
  nome: string;
}

export interface Produto {
  codigo: string;
  codigoLoja: string;
  descricao: string;
  imagem: string;
  nome: string;
  preco: number;
  quantidadePessoas: number;
  categorias: Categoria[];
}
