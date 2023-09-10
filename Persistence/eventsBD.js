import Events from "../Model/events.js";
import Connect from "./connectBD.js";

export default class EventsBD {
  //Método para cadastrar um evento.
  async record(event) {
    if (event instanceof Events) {
      const connection = await Connect();
      const sql =
        "INSERT INTO eventtable (title, setTime, startDate, endDate, description) VALUES (?, ?, ?, ?, ?)";
      const values = [
        event.title,
        event.setTime,
        event.startDate,
        event.endDate,
        event.description,
      ];
      await connection.query(sql, values);
    }
  }
  // Método para atualizar um evento.
  async update(event) {
    if (event instanceof Events) {
      const connection = await Connect();
      const sql =
        "UPDATE eventtable SET setTime=?, startDate=?, endDate=?, description=? WHERE title=?";
      const values = [
        event.setTime,
        event.startDate,
        event.endDate,
        event.description,
        event.title,
      ];
      await connection.query(sql, values);
    }
  }

  //Método para excluir um evento.
  async delete(event) {
    if (event instanceof Events) {
      const connection = await Connect();
      const sql = "DELETE FROM eventtable WHERE title=?";
      const values = [event.title];
      await connection.query(sql, values);
    }
  }
  //Método para consultar eventos.

  async consult(term) {
    const connection = await Connect();
    const sql = "SELECT * FROM eventtable";
    const value = ["%" + term + "%"];
    const [rows] = await connection.query(sql, value);
    const eventList = [];
    for (const row of rows) {
      const event = new Events(
        row["title"],
        row["setTime"],
        row["startDate"],
        row["endDate"],
        row["description"]
      );
      eventList.push(event);
    }

    return eventList;
  }

  //Método para consultar um evento pelo ID.

  async consultTitle(title) {
    const connection = await Connect();
    const sql = "SELECT * FROM eventtable WHERE title = ?";
    const value = [title];
    const [rows] = await connection.query(sql, value);
    const eventList = [];
    for (const row of rows) {
      const event = new Events(
        row["title"],
        row["setTime"],
        row["startDate"],
        row["endDate"],
        row["description"]
      );
      eventList.push(event);
    }
    return eventList;
  }
}
