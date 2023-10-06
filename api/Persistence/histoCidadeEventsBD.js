import HistoCidadeEvents from "../Model/histoCidadeEvents.js";
import Connect from "../../config/connectBD.js";

export default class HistoCidadeEventsBD {
  async record(histoCidadeEvents) {
    if (histoCidadeEvents instanceof HistoCidadeEvents) {
      const conexao = await Connect();

      const sql =
        "INSERT INTO histEvents (nomeEvento, eventosCidades) VALUES (?,?)";
      const valores = [histoCidadeEvents.Cidade];

      const resultado = await conexao.query(sql, valores);
      global.poolConnections.pool.releaseConnection(conexao);
      return resultado[0].insertId;
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

      await conexao.query(sql, valores);
      global.poolConnections.pool.releaseConnection(conexao);
    }
  }

  async delete(histoCidadeEvents) {
    if (histoCidadeEvents instanceof HistoCidadeEvents) {
      const conexao = await Connect();

      const sql = "DELETE FROM histEvents WHERE id = ?";
      const valores = [histoCidadeEvents.id];

      await conexao.query(sql, valores);
      global.poolConnections.pool.releaseConnection(conexao);
    }
  }

  async consult(termo) {
    const conexao = await Connect();

    const sql = "SELECT * FROM histEvents";
    const valores = ["%" + termo + "%"];

    global.poolConnections.pool.releaseConnection(conexao);
    const [rows] = await conexao.query(sql, valores);

    const eventoHistList = [];

    for (const row of rows) {
      const eventoHist = new HistoCidadeEvents(
        row["id"],
        row["nomeEvento"],
        row["eventosCidades"]
      );
      eventoHistList.push(eventoHist);
    }

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
