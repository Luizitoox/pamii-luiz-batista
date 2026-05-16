// Este arquivo roda APENAS no navegador Web simulando o SQLite com LocalStorage

/**
 * FUNÇÃO AUXILIAR: getUsuariosDoBancoWeb
 * O objetivo dela é ir até o LocalStorage do navegador e buscar os usuários já cadastrados.
 */
const getUsuariosDoBancoWeb = (): any[] => {
  // Tenta buscar o texto salvo na chave 'usuarios_mock'
  const dados = localStorage.getItem("usuarios_mock");
  
  // Se existir dados salvos, transforma o texto de volta em um Array de objetos (JSON.parse).
  // Se não existir nada ainda (primeiro acesso), retorna um array vazio [].
  return dados ? JSON.parse(dados) : [];
};

// Objeto que finge ser o banco de dados SQLite na Web
const dbFake = {
  
  /**
   * MÉTODO: getAllSync (Simula as consultas de leitura - SELECT)
   * Recebe o comando SQL e os parâmetros enviados pela tela (ex: e-mail)
   */
  getAllSync: (sql: string, params: any[] = []) => {
    // Exibe no terminal do navegador o comando que a tela tentou executar
    console.log("[Web Mock] Executando consulta: ", sql, params);
    
    // Busca a lista atualizada de usuários reais que estão salvos no LocalStorage
    const usuarios = getUsuariosDoBancoWeb();
    
    // Pega o primeiro parâmetro enviado na busca, que neste caso é o e-mail digitado na tela
    const emailBuscado = params[0];

    // Verifica se a tela está tentando fazer uma busca de usuário por e-mail
    if (sql.includes("SELECT * FROM users WHERE email = ?")) {
      
      // Procura dentro do array do LocalStorage se existe alguém com o e-mail igual ao digitado
      const usuarioEncontrado = usuarios.find(user => user.email === emailBuscado);
      
      // Se encontrou o usuário, retorna ele dentro de um array [usuario].
      // Se não encontrou, retorna o array vazio []. 
      // O Expo-SQLite espera um array como resposta, por isso usamos os colchetes.
      return usuarioEncontrado ? [usuarioEncontrado] : [];
    }

    // Se a query for qualquer outra coisa que não seja a busca por e-mail, retorna vazio
    return [];
  },

  /**
   * MÉTODO: runSync (Simula os comandos de escrita - INSERT, UPDATE, DELETE)
   * Recebe o comando SQL e os dados digitados nos campos do formulário
   */
  runSync: (sql: string, params: any[] = []) => {
    // Exibe no terminal o comando de salvamento que a tela disparou
    console.log("[Web Mock] Executando comando de escrita: ", sql, params);

    // Verifica se a tela está tentando cadastrar (inserir) um novo usuário
    if (sql.includes("INSERT INTO users")) {
      
      // Desestrutura o array de parâmetros na ordem exata enviada pelo formulário:
      // Pega o primeiro valor e guarda em 'nome', o segundo em 'sobrenome', etc.
      const [nome, sobrenome, email, senha] = params;

      // Pega a lista de usuários que já estavam salvos no LocalStorage
      const usuarios = getUsuariosDoBancoWeb();
      
      // Cria um novo objeto contendo os dados reais que VOCÊ digitou na tela de cadastro
      const novoUsuario = { nome, sobrenome, email, senha };
      
      // Adiciona esse novo usuário no final da lista
      usuarios.push(novoUsuario);
      
      // Transforma a lista atualizada em texto (JSON.stringify) e salva de volta no LocalStorage
      localStorage.setItem("usuarios_mock", JSON.stringify(usuarios));
      
      // Confirma no console que o usuário real foi salvo com sucesso
      console.log("[Web Mock] Usuário salvo com sucesso no LocalStorage!", novoUsuario);
    }

    // Retorna null porque a função runSync original do SQLite não retorna dados, apenas executa
    return null;
  }
};

/**
 * EXPORTAÇÃO: createTable
 * Simula a criação da tabela. Como no LocalStorage não precisamos criar tabelas,
 * ela serve apenas para o seu código principal não quebrar ao tentar chamá-la na inicialização.
 */
export const createTable = () => {
  console.log("[Web Mock] Banco de dados simulado via LocalStorage pronto para uso.");
};

// Exporta o banco falso como padrão para ser usado no lugar do SQLite nativo quando rodar na Web
export default dbFake;