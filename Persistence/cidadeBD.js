import conectar from "./Conexao.js";
import CidadeModel from "../Modelo/CidadeModel.js";

export default class CidadeBD {
  async incluir(cidadeModel) {
    if (cidadeModel instanceof CidadeModel) {
      const conexao = await conectar();

      const sql = "INSERT INTO cidade (categoria) VALUES (?)";
      const valores = [cidadeModel.categoria];

      const resultado = await conexao.query(sql, valores);
      global.poolConexoes.release(conexao);
      return resultado[0].insertId;
    }
  }

  async alterar(cidadeModel) {
    if (cidadeModel instanceof CidadeModel) {
      const conexao = await conectar();

      const sql = "UPDATE cidade SET categoria = ? WHERE codigo = ?";
      const valores = [cidadeModel.categoria, cidadeModel.codigo];

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

    const sql = "SELECT * FROM cidade WHERE categoria LIKE ?";
    const valores = ["%" + termo + "%"];

    const [rows] = await conexao.query(sql, valores);
    global.poolConexoes.release(conexao);

    const listaCategorias = [];

    for (const row of rows) {
      const cidadeModel = new CidadeModel(row["codigo"], row["categoria"]);
      listaCategorias.push(cidadeModel);
    }

    return listaCategorias;
  }

  async consultarCodigo(codigo) {
    const conexao = await conectar();

    const sql = "SELECT * FROM cidade WHERE codigo = ?";
    const valores = [codigo];

    const [rows] = await conexao.query(sql, valores);
    global.poolConexoes.release(conexao);

    const listaCategorias = [];

    for (const row of rows) {
      const cidadeModel = new CidadeModel(row["codigo"], row["categoria"]);
      listaCategorias.push(cidadeModel);
    }

    return listaCategorias;
  }
}
