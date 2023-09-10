import Events from "../Model/events.js";

export default class EventCtrl {
  // Método para cadastrar um evento
  record(request, response) {
    response.type("application/json");

    if (request.method === "POST" && request.is("application/json")) {
      const data = request.body;
      const title = data.title;
      const setTime = data.setTime;
      const startDate = data.startDate;
      const endDate = data.endDate;
      const description = data.description;

      if (title && setTime && startDate && endDate && description) {
        // Grava um evento no Banco de Dados
        const events = new Events(
          title,
          setTime,
          startDate,
          endDate,
          description
        );
        events
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
      const title = data.title;
      const setTime = data.setTime;
      const startDate = data.startDate;
      const endDate = data.endDate;
      const description = data.description;

      if (title && setTime && startDate && endDate && description) {
        // Atualizar um evento no Banco de Dados
        const events = new Events(
          title,
          setTime,
          startDate,
          endDate,
          description
        );
        events
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
      const title = data.title;

      if (title) {
        // Deletar um evento no Banco de Dados
        const events = new Events(title);
        events
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
      const event = new Events();
      event
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

  // Método para consultar um evento pelo ID
  consultTitle(request, response) {
    response.type("application/json");
    const title = request.params["title"];

    if (request.method === "GET") {
      // Consulta um evento no Banco de Dados
      const events = new Events();
      events
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
