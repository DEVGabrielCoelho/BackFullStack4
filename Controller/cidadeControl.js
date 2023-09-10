import CidadeModel from "../Modelo/CidadeModel.js";

export default class CidadeCTRL {
  consultar(requisicao, resposta) {
    resposta.type("application/json");

    if (requisicao.method === "GET") {
      const cidadeProd = new CidadeModel();
      cidadeProd
        .consultar("")
        .then((cidades) => {
          resposta.status(200).json(cidades);
        })
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido! Consulte a documentação da API.",
      });
    }
  }

  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const cidade = dados.cidade;
      if (cidade) {
        const cidadeProd = new CidadeModel(0, cidade);
        cidadeProd
          .gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              id: cidadeProd.codigo,
              mensagem: "Cidade gravada com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Registro inválido! Informe adequadamente todos os dados da cidade conforme a documentação da API.",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou cidade no formato JSON não fornecida! Consulte a documentação da API.",
      });
    }
  }

  atualizar(requisicao, resposta) {
    resposta.type("application/json");

    if (requisicao.method === "PUT" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigo = dados.codigo;
      const cidade = dados.cidade;

      if (codigo && cidade) {
        const cidadeProd = new CidadeModel(codigo, cidade);
        cidadeProd
          .atualizar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Cidade atualizada com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Atualização inválida! Informe adequadamente todos os dados da cidade conforme a documentação da API.",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou cidade no formato JSON não fornecida! Consulte a documentação da API.",
      });
    }
  }

  excluir(requisicao, resposta) {
    resposta.type("application/json");

    if (requisicao.method === "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const codigo = dados.codigo;

      if (codigo) {
        const cidadeProd = new CidadeModel(codigo);
        cidadeProd
          .remover()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Cidade excluída com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Exclusão inválida! Informe adequadamente o código da cidade conforme a documentação da API.",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou cidade no formato JSON não fornecida! Consulte a documentação da API.",
      });
    }
  }

  consultarPeloCodigo(requisicao, resposta) {
    resposta.type("application/json");
    const codigo = requisicao.params["codigo"];

    if (requisicao.method === "GET") {
      const cidadeProd = new CidadeModel();
      cidadeProd
        .consultarCodigo(codigo)
        .then((cidades) => {
          resposta.status(200).json(cidades);
        })
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido! Consulte a documentação da API.",
      });
    }
  }
}
