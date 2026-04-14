import React, { useState } from 'react';
// Importa React e o hook useState (para criar estados)

import { View } from 'react-native';
// View → container básico (tipo uma div)

import InputCustom from '../components/InputCustom';
// Importa o componente de input

import BotaoCustom from '../components/BotaoCustom';
// Importa o botão

import Tabela from '../components/Tabela';
// Importa a tabela

import ModalCustom from '../components/ModalCustom';
// Importa o modal

export default function App() {
  // Componente principal do app

  const [valorInput, setValorInput] = useState('');
  // Cria um estado para o texto digitado

  const [modalVisivel, setModalVisivel] = useState(false);
  // Controla se o modal está aberto ou fechado

  const [dados, setDados] = useState<any[]>([]);
  // Array de dados (usando any para simplificar)

  function BotaoConfirmacao() {
    // Função chamada ao confirmar

    setDados([...dados, { nome: valorInput, valor: Math.random() }]);
    // Ela adiciona um novo item na lista dados sem apagar os anteriores

    setModalVisivel(false);
    // Fecha o modal

    setValorInput('');
    // Limpa o input
  }

  function BotaoCancelar() {
    // Função chamada ao cancelar

    setModalVisivel(false);
    // Fecha o modal
  }


  return (
    <View style={{ padding: 20 }}
    //Container principal com espaçamento
    >

      <InputCustom
        valor={valorInput}
        // Passa o valor do input

        aoAlterar={setValorInput}
        // Passa a função que atualiza o valor

        placeholder="Digite seu nome..."
      // Texto de ajuda
      />

      <BotaoCustom
        texto="Adicionar"
        // Texto do botão

        cor="blue"
        // Cor do botão

        aoPressionar={() => setModalVisivel(true)}
      // Abre o modal ao clicar
      />

      <Tabela dados={dados}
      //Mostra os dados na tabela
      />

      <ModalCustom
        visivel={modalVisivel}
        // Define se o modal aparece

        aoConfirmar={BotaoConfirmacao}
        // Função confirmar

        aoCancelar={BotaoCancelar}
      // Função cancelar
      />

    </View>
  );
}