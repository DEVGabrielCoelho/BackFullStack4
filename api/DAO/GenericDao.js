class GenericDao {
  constructor(persistedClass) {
    this.persistedClass = persistedClass;
  }

  async save(entity) {
    try {
      const response = await fetch("/" + this.persistedClass.name, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entity),
      });
      const savedEntity = await response.json();
      return savedEntity;
    } catch (error) {
      console.error("Save error:", error);
      throw error;
    }
  }

  async update(entity) {
    try {
      const response = await fetch("/" + this.persistedClass.name, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entity),
      });
      const updatedEntity = await response.json();
      return updatedEntity;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await fetch("/" + this.persistedClass.name + "/" + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Delete error: " + response.status);
      }
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
  }

  async getList() {
    try {
      const response = await fetch("/" + this.persistedClass.name);
      const entities = await response.json();
      return entities;
    } catch (error) {
      console.error("Get list error:", error);
      throw error;
    }
  }

  async findId(id) {
    try {
      const response = await fetch("/" + this.persistedClass.name + "/" + id);
      const entity = await response.json();
      return entity;
    } catch (error) {
      console.error("Find by id error:", error);
      throw error;
    }
  }
}
