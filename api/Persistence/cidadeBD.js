import CidadeModel from "../Model/cidade.js";
import Connect from "../../config/connect.js";

export default class CidadeBD {
  async incluir(cidadeModel) {
    if (cidadeModel instanceof CidadeModel) {
      const conexao = await Connect();

      const sql = "INSERT INTO cidade (Cidade) VALUES (?)";
      const valores = [cidadeModel.Cidade];

      const resultado = await conexao.query(sql, valores);
      global.poolConnections.pool.releaseConnection(conexao);
      return resultado[0].insertId;
    }
  }

  async alterar(cidadeModel) {
    if (cidadeModel instanceof CidadeModel) {
      const conexao = await Connect();

      const sql = "UPDATE cidade SET Cidade = ? WHERE codigo = ?";
      const valores = [cidadeModel.Cidade, cidadeModel.codigo];

      await conexao.query(sql, valores);
      global.poolConnections.pool.releaseConnection(conexao);
    }
  }

  async excluir(cidadeModel) {
    if (cidadeModel instanceof CidadeModel) {
      const conexao = await Connect();

      const sql = "DELETE FROM cidade WHERE codigo = ?";
      const valores = [cidadeModel.codigo];

      await conexao.query(sql, valores);
      global.poolConnections.pool.releaseConnection(conexao);
    }
  }

  async consultar(termo) {
    const conexao = await Connect();

    const sql = "SELECT * FROM cidade";
    const valores = ["%" + termo + "%"];

    global.poolConnections.pool.releaseConnection(conexao);
    const [rows] = await conexao.query(sql, valores);

    const listaCidades = [];

    for (const row of rows) {
      const city_code = new CidadeModel(row["codigo"], row["cidade"]);
      listaCidades.push(city_code);
    }

    return listaCidades;
  }

  async consultarCodigo(codigo) {
    const conexao = await Connect();

    const sql = "SELECT * FROM cidade WHERE codigo = ?";
    const valores = [codigo];

    const [rows] = await conexao.query(sql, valores);
    global.poolConexoes.release(conexao);

    const listaCidades = [];

    for (const row of rows) {
      const cidadeModel = new CidadeModel(row["codigo"], row["Cidade"]);
      listaCidades.push(cidadeModel);
    }

    return listaCidades;
  }
}
