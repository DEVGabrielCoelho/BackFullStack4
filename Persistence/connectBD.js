import mysql from "mysql2/promise";

export default async function conectar() {
  if (global.poolConnections) {
    return await global.poolConnections.getConnection();
  }
  const poolConexoes = await mysql.createConnection({
    host: "129.146.68.51",
    user: "aluno18-pfsii",
    port: 3306,
    password: "77lRprmkDU70gd3LcwXi",
    database: "backendFullStack2",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  global.poolConexoes = poolConexoes;
  return await poolConexoes.getConecction();
}
