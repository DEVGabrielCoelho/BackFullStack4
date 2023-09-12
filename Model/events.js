import EventsBD from "../Persistence/eventsBD.js";

export default class Events {
  #title;
  #setTime;
  #startDate;
  #endDate;
  #city;
  #description;

  constructor(title, setTime, startDate, endDate, description) {
    this.#title = title;
    this.#setTime = setTime;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#city = city;
    this.#description = description;
  }

  get title() {
    return this.#title;
  }

  set title(newtitle) {
    this.#title = newtitle;
  }

  get setTime() {
    return this.#setTime;
  }

  set setTime(newsetTime) {
    if (newsetTime != "") {
      this.#setTime = newsetTime;
    }
  }

  get startDate() {
    return this.#startDate;
  }

  set startDate(newStartDate) {
    if (newStartDate != "") {
      this.#startDate = newStartDate;
    }
  }

  get endDate() {
    return this.#endDate;
  }

  set endDate(newEndDate) {
    if (newEndDate != "") {
      this.#endDate = newEndDate;
    }
  }
  get city() {
    return this.#endDate;
  }

  set city(newCity) {
    if (newCity != "") {
      this.#city = newCity;
    }
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    if (newDescription != "") {
      this.#description = newDescription;
    }
  }

  // Converte o objeto Event em formato JSON

  toJSON() {
    return {
      title: this.#title,
      setTime: this.#setTime,
      startDate: this.#startDate,
      endDate: this.#endDate,
      city: this.#city,
      description: this.#description,
    };
  }

  // Grava o evento no banco de dados

  async record() {
    const eventsBD = new EventsBD();
    await eventsBD.record(this);
  }

  // Atualiza o evento no banco de dados

  async update() {
    const eventsBD = new EventsBD();
    await eventsBD.update(this);
  }

  // Deleta o evento do banco de dados

  async delete() {
    const eventsBD = new EventsBD();
    await eventsBD.delete(this);
  }

  // Consulta eventos com base em um termo de pesquisa

  async consult(term) {
    const eventsBD = new EventsBD();
    const events = await eventsBD.consult(term);
    return events;
  }

  // Consulta eventos com base em um título específico

  async consultTitle(title) {
    const eventsBD = new EventsBD();
    const event = await eventsBD.consultTitle(title);
    return event;
  }
}
