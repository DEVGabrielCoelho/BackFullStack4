import HistoCidadeEvents from "../Model/histoCidadeEvents.js";
import Connect from "../../config/connectBD.js";
import Events from "../Model/events.js";
import CidadeBD from "./cidadeBD.js";
import CidadeModel from "../Model/cidade.js";

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
      global.poolConnections.pool.releaseConnection(conexao);

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
    }
  }

  async consult(term) {
    try {
      const conexao = await Connect();
      global.poolConnections.pool.releaseConnection(conexao);

      const value = ["%" + term + "%"];
      const sql = `SELECT 
                  *
                FROM 
                  histEvents AS he
                  INNER JOIN events AS e ON e.title = he.nomeEvento
                  INNER JOIN cidade AS c ON c.codigo = e.city_code
                WHERE 
                  e.city_code LIKE ?`;

      const [rows] = await conexao.query(sql, value);
      const histList = {};
      for (const row of rows) {
        const cidadeModel = new CidadeModel(row["codigo"], row["cidade"]);
        const event = new Events(
          row["title"],
          row["setTime"],
          row["startDate"],
          row["endDate"],
          cidadeModel,
          row["description"]
        );

        if (!histList[cidadeModel.cidade]) {
          histList[cidadeModel.cidade] = {
            eventosCidades: cidadeModel,
            nomeEvento: [event],
          };
        } else {
          histList[cidadeModel.cidade].nomeEvento.push(event);
        }
      }
      conexao.release();
      return Object.values(histList);
    } catch (error) {
      console.error("Erro na consulta:", error);
      throw error;
    }
  }

  async consultCod(histoCidade) {
    const conexao = await Connect();

    try {
      if (!(histoCidade instanceof HistoCidadeEvents)) {
        return []; // Retorna uma lista vazia se histoCidade não for uma instância de HistoCidadeEvents
      }

      const { eventosCidades } = histoCidade;
      const sql = `
      SELECT e.*, c.Cidade AS cidadeNome
      FROM histEvents AS e
      INNER JOIN cidade AS c ON e.city_code = c.codigo
      WHERE e.eventosCidades = ?
    `;

      const [rows] = await conexao.query(sql, eventosCidades);
      const eventoHistList = rows.map((row) => {
        const cidadeModel = new CidadeModel(row.codigo, row.cidadeNome);
        const event = new Events(
          row.title,
          row.setTime,
          row.startDate,
          row.endDate,
          row.city_code,
          row.description
        );
        return new HistoCidadeEvents(row.id, cidadeModel, event);
      });

      return eventoHistList;
    } catch (error) {
      console.error("Erro na consulta:", error);
      throw error;
    } finally {
      conexao.release();
    }
  }

  // async consultCod(codigo) {
  //   const conexao = await Connect();

  //   const sql = "SELECT cidade FROM cidade WHERE codigo = ? ";
  //   const valores = [codigo];

  //   const [rows] = await conexao.query(sql, valores);
  //   global.poolConexoes.release(conexao);

  //   const eventoHistList = [];

  //   for (const row of rows) {
  //     const histoCidadeEvents = new HistoCidadeEvents(
  //       row["id"],
  //       row["nomeEvento"],
  //       row["eventosCidades"]
  //     );
  //     eventoHistList.push(histoCidadeEvents);
  //   }

  //   return eventoHistList;
  // }
}
