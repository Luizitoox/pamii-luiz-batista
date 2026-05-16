// Importa todos os recursos do pacote 'expo-sqlite' para lidar com o banco nativo do celular
import * as SQLite from 'expo-sqlite';

// Abre (ou cria, se não existir) o arquivo físico de banco de dados chamado 'meubanco.db'
const db = SQLite.openDatabaseSync('meubanco.db');

// Declara a função responsável por gerar as tabelas do aplicativo
export function createTable() {
  // Executa de forma síncrona um comando SQL no banco de dados
  db.runSync(`
    // Cria a tabela 'users' apenas se ela ainda não existir no arquivo de banco
    CREATE TABLE IF NOT EXISTS users (
      // Define a coluna id como chave primária, numérica e auto-incrementável
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      // Define a coluna nome para guardar textos (String)
      nome TEXT,
      // Define a coluna sobrenome para guardar textos
      sobrenome TEXT,
      // Define a coluna email, forçando que nunca existam dois e-mails iguais no banco (UNIQUE)
      email TEXT UNIQUE,
      // Define a coluna senha para guardar o texto das senhas
      senha TEXT
    );
  `); // Fecha a string do comando SQL
} // Fecha a função createTable

// Exporta a conexão do banco de dados para ser utilizada por outras telas
export default db;