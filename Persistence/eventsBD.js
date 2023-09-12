import CidadeModel from "../Model/cidade.js";
import Events from "../Model/events.js";
import CidadeBD from "./cidadeBD.js";
import Connect from "./connectBD.js";

export default class EventsBD {
  //Método para cadastrar um evento.
  async record(event) {
    if (event instanceof Events) {
      const connection = await Connect();
      const sql =
        "INSERT INTO events (title, setTime, startDate, endDate, city_code, description) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [
        event.title,
        event.setTime,
        event.startDate,
        event.endDate,
        event.city_code,
        event.description,
      ];
      global.poolConnections.pool.releaseConnection(connection);
      await connection.query(sql, values);
    }
  }
  // Método para atualizar um evento.
  async update(event) {
    if (event instanceof Events) {
      const connection = await Connect();
      const sql =
        "UPDATE events SET setTime=?, startDate=?, endDate=?, city_code=?, description=? WHERE title=?";
      const values = [
        event.setTime,
        event.startDate,
        event.endDate,
        event.city_code,
        event.description,
        event.title,
      ];
      global.poolConnections.pool.releaseConnection(connection);
      await connection.query(sql, values);
    }
  }

  //Método para excluir um evento.
  async delete(event) {
    if (event instanceof Events) {
      const connection = await Connect();
      const sql = "DELETE FROM events WHERE title=?";
      const values = [event.title];
      global.poolConnections.pool.releaseConnection(connection);
      await connection.query(sql, values);
    }
  }
  //Método para consultar eventos.

  async consult(term) {
    const connection = await Connect();
    const sql =
      "SELECT * FROM events as p INNER JOIN cidade as c ON p.city_code = c.codigo WHERE cidade LIKE ?";
    const value = ["%" + term + "%"];
    global.poolConnections.pool.releaseConnection(connection);
    const [rows] = await connection.query(sql, value);
    const eventList = [];
    for (const row of rows) {
      const city_code = new CidadeModel(row["codigo"], row["cidade"]);
      const event = new Events(
        row["title"],
        row["setTime"],
        row["startDate"],
        row["endDate"],
        row["description"],
        row["city_code"],
        city_code
      );
      eventList.push(event);
    }

    return eventList;
  }

  //Método para consultar um evento pelo ID.

  async consultTitle(title) {
    const connection = await Connect();
    const sql = "SELECT * FROM events WHERE title = ?";
    const value = [title];
    global.poolConnections.pool.releaseConnection(connection);
    const [rows] = await connection.query(sql, value);
    const eventList = [];
    for (const row of rows) {
      const event = new Events(
        row["title"],
        row["setTime"],
        row["startDate"],
        row["endDate"],
        row["city_code"],
        row["description"]
      );
      eventList.push(event);
    }
    return eventList;
  }
}
