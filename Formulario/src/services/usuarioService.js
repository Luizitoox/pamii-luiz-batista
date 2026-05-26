// src/services/usuarioService.js
import { db } from '../config/firebaseConfig';
// Adicionado 'doc' e 'deleteDoc' para permitir a exclusão
import { collection, addDoc, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';

// Função para cadastrar
export const cadastrarUsuarioService = async (nome, email) => {
  return await addDoc(collection(db, "usuarios"), {
    nome,
    email,
    criadoEm: new Date()
  });
};

// Nova Função: Deletar um usuário pelo ID do documento
export const excluirUsuarioService = async (id) => {
  // Cria uma referência direta ao documento do usuário dentro da coleção "usuarios"
  const usuarioRef = doc(db, "usuarios", id);
  // Executa a exclusão de forma assíncrona no Firebase
  return await deleteDoc(usuarioRef);
};

// Função para escutar em tempo real
export const escutarUsuariosService = (onUpdate) => {
  const q = query(collection(db, "usuarios"), orderBy("criadoEm", "desc"));
  
  return onSnapshot(q, (querySnapshot) => {
    const listaUsuarios = [];
    querySnapshot.forEach((doc) => {
      listaUsuarios.push({ id: doc.id, ...doc.data() });
    });
    onUpdate(listaUsuarios);
  }, (error) => {
    console.error("Erro ao buscar usuários: ", error);
  });
};