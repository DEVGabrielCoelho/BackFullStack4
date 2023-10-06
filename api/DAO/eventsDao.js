import Events from "../Model/events";

class eventsDao extends GenericDao(Events) {
  constructor() {
    return Events.class;
  }
}
