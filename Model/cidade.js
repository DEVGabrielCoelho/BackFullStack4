import CidadeBD from "../Persistencia/CidadeBD.js";

export default class CidadeModel {
  #codigo;
  #cidade;

  constructor(codigo, cidade) {
    this.#codigo = codigo;
    this.#cidade = cidade;
  }

  get codigo() {
    return this.#codigo;
  }

  set codigo(novoCodigo) {
    if (novoCodigo !== "") {
      this.#codigo = novoCodigo;
    }
  }

  get cidade() {
    return this.#cidade;
  }

  set cidade(novoCidade) {
    if (novoCidade !== "") {
      this.#cidade = novoCidade;
    }
  }

  toJSON() {
    return {
      codigo: this.#codigo,
      cidade: this.#cidade,
    };
  }

  async gravar() {
    const cidadeBD = new CidadeBD();
    await cidadeBD.incluir(this);
  }

  async atualizar() {
    const cidadeBD = new CidadeBD();
    await cidadeBD.alterar(this);
  }

  async remover() {
    const cidadeBD = new CidadeBD();
    await cidadeBD.excluir(this);
  }

  async consultar(termo) {
    const cidadeBD = new CidadeBD();
    const Cidades = await cidadeBD.consultar(termo);
    return Cidades;
  }

  async consultarCodigo(codigo) {
    const cidadeBD = new CidadeBD();
    const Cidades = await cidadeBD.consultarCodigo(codigo);
    return Cidades;
  }
}
