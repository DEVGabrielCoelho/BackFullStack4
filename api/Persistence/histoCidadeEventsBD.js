import HistoCidadeEvents from "../Model/histoCidadeEvents.js";
import Connect from "../../config/connectBD.js";
import Events from "../Model/events.js";

export default class HistoCidadeEventsBD {
  async record(histoCidadeEvents) {
    if (histoCidadeEvents instanceof HistoCidadeEvents) {
      const sql =
        "INSERT INTO histEvents (nomeEvento, eventosCidades) VALUES (?,?)";

      const valores = [
        histoCidadeEvents.nomeEvento,
        histoCidadeEvents.eventosCidades,
      ];

      try {
        const conexao = await Connect();
        await conexao.beginTransaction();
        const resultado = await conexao.query(sql, valores);
        global.poolConnections.pool.releaseConnection(conexao);
        await conexao.commit();
        return resultado[0].insertId;
      } catch (e) {
        await conexao.rollback();
        throw e;
      }
    }
  }

  async update(histoCidadeEvents) {
    if (histoCidadeEvents instanceof HistoCidadeEvents) {
      const conexao = await Connect();

      const sql =
        "UPDATE histEvents SET nomeEvento = ?  eventosCidades = ? WHERE id = ?";
      const valores = [
        histoCidadeEvents.nomeEvento,
        histoCidadeEvents.eventosCidades,
        histoCidadeEvents.id,
      ];

      try {
        await conexao.beginTransaction();
        await conexao.query(sql, valores);
        await conexao.commit();
      } catch (e) {
        await conexao.rollback();
        throw e;
      }

      global.poolConnections.pool.releaseConnection(conexao);
    }
  }

  async delete(histoCidadeEvents) {
    if (histoCidadeEvents instanceof HistoCidadeEvents) {
      const conexao = await Connect();

      const sql = "DELETE FROM histEvents WHERE id = ?";
      const valores = [histoCidadeEvents.id];

      try {
        await conexao.beginTransaction();
        await conexao.query(sql, valores);
        await conexao.commit();
      } catch (e) {
        await conexao.rollback();
        throw e;
      }

      global.poolConnections.pool.releaseConnection(conexao);
    }
  }

  async consult(termo) {
    const conexao = await Connect();

    if (histoCidadeEvents instanceof HistoCidadeEvents) {
      const { eventosCidades } = histoCidadeEvents;
      const sql = "SELECT * FROM histEvents where eventosCidades = ?";

      const [rows] = await conexao.query(sql, histoCity);

      const eventoHistList = [];

      for (const row of rows) {
        const event = new Events(
          row["title"],
          row["setTime"],
          row["startDate"],
          row["endDate"],
          row["city_code"],
          row["description"]
        );
        const eventoHist = new HistoCidadeEvents(
          row["id"],
          row["eventosCidades"],
          event
        );
        eventoHistList.push(eventoHist);
      }
    }

    global.poolConnections.pool.releaseConnection(conexao);

    return eventoHistList;
  }

  async consultCod(codigo) {
    const conexao = await Connect();

    const sql = "SELECT cidade FROM cidade WHERE codigo = ? ";
    const valores = [codigo];

    const [rows] = await conexao.query(sql, valores);
    global.poolConexoes.release(conexao);

    const eventoHistList = [];

    for (const row of rows) {
      const histoCidadeEvents = new HistoCidadeEvents(
        row["id"],
        row["nomeEvento"],
        row["eventosCidades"]
      );
      eventoHistList.push(histoCidadeEvents);
    }

    return eventoHistList;
  }
}
