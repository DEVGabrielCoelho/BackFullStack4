import mysql from "mysql2/promise";

export default async function Connect() {
  if (global.connection && global.connection.status != "diconnected") {
    return global.connection;
  }

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "eventdatabase",
  });

  global.connection = connection;

  return connection;
}
