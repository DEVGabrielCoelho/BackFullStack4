import CidadeModel from "../Model/cidade.js";
import conectar from "./connectBD.js";

export default class CidadeBD {
  async incluir(cidadeModel) {
    if (cidadeModel instanceof CidadeModel) {
      const conexao = await conectar();

      const sql = "INSERT INTO cidade (Cidade) VALUES (?)";
      const valores = [cidadeModel.Cidade];

      const resultado = await conexao.query(sql, valores);
      global.poolConexoes.release(conexao);
      return resultado[0].insertId;
    }
  }

  async alterar(cidadeModel) {
    if (cidadeModel instanceof CidadeModel) {
      const conexao = await conectar();

      const sql = "UPDATE cidade SET Cidade = ? WHERE codigo = ?";
      const valores = [cidadeModel.Cidade, cidadeModel.codigo];

      await conexao.query(sql, valores);
      global.poolConexoes.release(conexao);
    }
  }

  async excluir(cidadeModel) {
    if (cidadeModel instanceof CidadeModel) {
      const conexao = await conectar();

      const sql = "DELETE FROM cidade WHERE codigo = ?";
      const valores = [cidadeModel.codigo];

      await conexao.query(sql, valores);
      global.poolConexoes.release(conexao);
    }
  }

  async consultar(termo) {
    const conexao = await conectar();

    const sql = "SELECT * FROM cidade WHERE Cidade LIKE ?";
    const valores = ["%" + termo + "%"];

    const [rows] = await conexao.query(sql, valores);
    global.poolConexoes.release(conexao);

    const listaCidades = [];

    for (const row of rows) {
      const cidadeModel = new CidadeModel(row["codigo"], row["Cidade"]);
      listaCidades.push(cidadeModel);
    }

    return listaCidades;
  }

  async consultarCodigo(codigo) {
    const conexao = await conectar();

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
