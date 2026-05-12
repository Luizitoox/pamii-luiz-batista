import * as SQLite from "expo-sqlite";

// Cria ou abre o banco de dados
const db = SQLite.openDatabaseSync("users.db");

// Função para criar a tabela de usuários
export function createTable() {

  // Executa um comando SQL
  db.execSync(`

    CREATE TABLE IF NOT EXISTS users (

      // ID automático do usuário
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      // Nome do usuário
      nome TEXT,

      // Sobrenome do usuário
      sobrenome TEXT,

      // Email do usuário
      email TEXT,

      // Senha do usuário
      senha TEXT

    );

  `);
}

// Exporta o banco para usar em outros arquivos
export default db;