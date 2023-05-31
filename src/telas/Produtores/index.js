import React, {useState} from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';

import Produtor from './componentes/Produtor';
import Topo from './componentes/Topo';
import useProdutores from '../../hooks/useProdutores';
import useTextos from '../../hooks/useTextos';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function Produtores({melhoresProdutores}) {
  const navigation = useNavigation();
  const route = useRoute();
  const [compras, setCompras] = useState('');
  const [timestamp, setTimestamp] = useState(0);
  const lista = useProdutores(melhoresProdutores);
  const {tituloProdutores, mensagemCompra} = useTextos();
  //console.log(route.params);
  React.useEffect(() => {
    if (route.params) {
      console.log(route.params);
      const msgFull = mensagemCompra?.replace(
        '$NOME',
        route.params.compra.nome,
      );
      setCompras(msgFull);
      setTimestamp(route.params.timestamp);
      if (msgFull) {
        let timout;
        timout = setTimeout(() => {
          setCompras(false);
        }, 3000);
      }
    }
  }, [route.params, mensagemCompra]);

  const TopoLista = () => {
    return (
      <>
        <Topo melhoresProdutores={melhoresProdutores} />
        {!!compras && <Text style={estilos.compra}>{compras}</Text>}
        <Text style={estilos.titulo}>{tituloProdutores}</Text>
      </>
    );
  };

  return (
    <FlatList
      data={lista}
      renderItem={({item}) => (
        <Produtor
          {...item}
          aoPressionar={() => {
            navigation.navigate('Produtor', {item});
          }}
        />
      )}
      keyExtractor={({nome}) => nome}
      ListHeaderComponent={TopoLista}
      style={estilos.lista}
    />
  );
}

const estilos = StyleSheet.create({
  lista: {
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 20,
    lineHeight: 32,
    marginHorizontal: 16,
    marginTop: 16,
    fontWeight: 'bold',
    color: '#464646',
  },
  compra: {
    backgroundColor: '#EAF5F3',
    color: 'red',
    padding: 16,
    fontSize: 16,
    lineHeight: 26,
  },
});
