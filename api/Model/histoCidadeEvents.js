import HistoCidadeEventsBD from "../Persistence/histoCidadeEventsBD.js";

export default class HistoCidadeEvents {
  #id;
  #codiCity;
  #nomeEvent;

  constructor(id, codiCity, nomeEvent) {
    this.#id = id;
    this.#codiCity = codiCity;
    this.#nomeEvent = nomeEvent;
  }

  get id() {
    return this.#id;
  }

  set id(newid) {
    this.#id = newid;
  }

  get codiCity() {
    return this.#codiCity;
  }

  set codiCity(newcodiCity) {
    if (newcodiCity != "") {
      this.#codiCity = newcodiCity;
    }
  }

  get nomeEvent() {
    return this.#nomeEvent;
  }

  set nomeEvent(newnomeEvent) {
    if (newnomeEvent != "") {
      this.#nomeEvent = newnomeEvent;
    }
  }

  // Converte o objeto Event em formato JSON

  toJSON() {
    return {
      id: this.#id,
      codiCity: this.#codiCity,
      nomeEvent: this.#nomeEvent,
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

  async consultId(title) {
    const histoCidade = new HistoCidadeEventsBD();
    const event = await histoCidade.consultTitle(title);
    return event;
  }
}
