import mysql from "mysql2/promise";

export default async function Connect() {
  if (global.poolConnections) {
    return await global.poolConnections.getConnection();
  }
  const connection = await mysql.createPool({
    host: "129.146.68.51",
    user: "aluno18-pfsii",
    port: 3306,
    password: "aluno18-pfsii",
    database: "backendFullStack2",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  global.poolConnections = connection;

  return await connection.getConnection();
}

// export default async function Connect() {
//   if (global.poolConnections) {
//     return await global.poolConnections.getConnection();
//   }
//   const connection = await mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "backend2",
//     waitForConnections: true,
//     connectionLimit: 10,
//     maxIdle: 10,
//     idleTimeout: 60000,
//     queueLimit: 0,
//     enableKeepAlive: true,
//     keepAliveInitialDelay: 0,
//   });
//   global.poolConnections = connection;

//   return await connection.getConnection();
// }
