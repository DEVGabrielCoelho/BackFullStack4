import HistoCidadeEvents from "../Model/histoCidadeEvents.js";
import CidadeBD from "../Persistence/cidadeBD.js";
import HistoCidadeEventsBD from "../Persistence/histoCidadeEventsBD.js";

export default class HistoCtrlEC {
  // Método para cadastrar um evento
  record(request, response) {
    response.type("application/json");

    if (request.method === "POST" && request.is("application/json")) {
      const data = request.body;
      const id = data.id;
      const nomeEvento = data.nomeEvento;
      const eventosCidades = data.eventosCidades;

      const nomeCity = new CidadeBD(0, "").consultarCodigo(eventosCidades);
      const tituloEvent = new HistoCidadeEventsBD(
        "",
        "",
        "",
        "",
        ""
      ).consultarCodigo(nomeEvento);

      if (nomeCity || tituloEvent) {
        if (id && nomeEvento && eventosCidades) {
          // Grava um evento no Banco de Dados
          const histo = new HistoCidadeEvents(id, nomeEvento, eventosCidades);
          histo
            .record()
            .then(() => {
              response.status(200).json({
                status: true,
                title: events.title,
                message: "Evento cadastrado com sucesso.",
              });
            })
            .catch((error) => {
              response.status(500).json({
                status: false,
                message: error.message,
              });
            });
        } else {
          response.status(400).json({
            status: false,
            message:
              "Por favor, informe corretamente todos os dados do evento conforme a API.",
          });
        }
      }
    } else {
      response.status(400).json({
        status: false,
        message:
          "Método não permitido ou evento em JSON não informado. Consulte a API.",
      });
    }
  }

  // Método para atualizar um evento
  update(request, response) {
    response.type("application/json");

    if (request.method === "PUT" && request.is("application/json")) {
      const data = request.body;
      const id = data.id;
      const nomeEvento = data.nomeEvento;
      const eventosCidades = data.eventosCidades;

      if (id && nomeEvento && eventosCidades) {
        // Grava um evento no Banco de Dados
        const histo = new HistoCidadeEvents(id, nomeEvento, eventosCidades);
        histo
          .update()
          .then(() => {
            response.status(200).json({
              status: true,
              message: "Evento atualizado com sucesso.",
            });
          })
          .catch((error) => {
            response.status(500).json({
              status: false,
              message: error.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          message:
            "Por favor, informe corretamente todos os dados do evento conforme a API.",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        message:
          "Método não permitido ou evento em JSON não informado. Consulte a API.",
      });
    }
  }

  // Método para excluir um evento
  delete(request, response) {
    response.type("application/json");

    if (request.method === "DELETE" && request.is("application/json")) {
      const data = request.body;
      const id = data.id;

      if (id) {
        const histo = new HistoCidadeEvents(id);
        histo
          .delete()
          .then(() => {
            response.status(200).json({
              status: true,
              message: "Evento excluído com sucesso.",
            });
          })
          .catch((error) => {
            response.status(500).json({
              status: false,
              message: error.message,
            });
          });
      } else {
        response.status(400).json({
          status: false,
          message: "Por favor, informe o ID do evento conforme a API.",
        });
      }
    } else {
      response.status(400).json({
        status: false,
        message:
          "Método não permitido ou evento em JSON não informado. Consulte a API.",
      });
    }
  }

  // Método para consultar todos os eventos
  consult(request, response) {
    response.type("application/json");

    if (request.method === "GET") {
      // Consulta eventos no Banco de Dados
      const histo = new HistoCidadeEvents();
      histo
        .consult("")
        .then((event) => {
          response.status(200).json(event);
        })
        .catch((error) => {
          response.status(500).json({
            status: false,
            message: error.message,
          });
        });
    } else {
      response.status(400).json({
        status: false,
        message:
          "Método não permitido. Consulte a API para obter a lista de eventos.",
      });
    }
  }

  consultSimple(request, response) {
    response.type("application/json");

    if (request.method === "GET") {
      // Consulta eventos no Banco de Dados
      const histo = new HistoCidadeEvents();
      histo
        .consultSimple("")
        .then((event) => {
          response.status(200).json(event);
        })
        .catch((error) => {
          response.status(500).json({
            status: false,
            message: error.message,
          });
        });
    } else {
      response.status(400).json({
        status: false,
        message:
          "Método não permitido. Consulte a API para obter a lista de eventos.",
      });
    }
  }

  // Método para consultar um evento pelo ID
  consultCod(request, response) {
    response.type("application/json");
    const title = request.params["title"];

    if (request.method === "GET") {
      // Consulta um evento no Banco de Dados
      const histo = new HistoCidadeEvents();
      histo
        .consultId(title)
        .then((events) => {
          response.status(200).json(events);
        })
        .catch((error) => {
          response.status(500).json({
            status: false,
            message: error.message,
          });
        });
    } else {
      response.status(400).json({
        status: false,
        message:
          "Método não permitido. Consulte a API para obter detalhes de um evento específico.",
      });
    }
  }
}
