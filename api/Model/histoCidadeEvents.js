import HistoCidadeEventsBD from "../Persistence/histoCidadeEventsBD.js";

export default class HistoCidadeEvents {
  #id;
  #eventosCidades;
  #nomeEvento;

  constructor(id, eventosCidades, nomeEvento) {
    this.#id = id;
    this.#eventosCidades = eventosCidades;
    this.#nomeEvento = nomeEvento;
  }

  get id() {
    return this.#id;
  }

  set id(newid) {
    this.#id = newid;
  }

  get eventosCidades() {
    return this.#eventosCidades;
  }

  set eventosCidades(newcodiCity) {
    if (newcodiCity != "") {
      this.#eventosCidades = newcodiCity;
    }
  }

  get nomeEvento() {
    return this.#nomeEvento;
  }

  set nomeEvento(newnomeEvent) {
    if (newnomeEvent != "") {
      this.#nomeEvento = newnomeEvent;
    }
  }

  // Converte o objeto Event em formato JSON

  toJSON() {
    return {
      id: this.#id,
      nomeEvento: this.#nomeEvento,
      eventosCidades: this.#eventosCidades,
    };
  }

  // Grava o evento no banco de dados

  async record() {
    const histoCidade = new HistoCidadeEventsBD();
    await histoCidade.record(this);
  }

  // Atualiza o evento no banco de dados

  async update() {
    const histoCidade = new HistoCidadeEventsBD();
    await histoCidade.update(this);
  }

  // Deleta o evento do banco de dados

  async delete() {
    const histoCidade = new HistoCidadeEventsBD();
    await histoCidade.delete(this);
  }

  // Consulta eventos com base em um termo de pesquisa

  async consult(term) {
    const histoCidade = new HistoCidadeEventsBD();
    const events = await histoCidade.consult(term);
    return events;
  }

  async consultSimple(term) {
    const histoCidade = new HistoCidadeEventsBD();
    const events = await histoCidade.consultSimple(term);
    return events;
  }

  // Consulta eventos com base em um título específico

  async consultCod(title) {
    const histoCidade = new HistoCidadeEventsBD();
    const event = await histoCidade.consultCod(title);
    return event;
  }
}
