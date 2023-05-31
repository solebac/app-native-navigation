import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import Texto from '../../componentes/Texto';

import Topo from '../../componentes/Topo';
import useTextos from '../../hooks/useTextos';
import Detalhes from './componentes/Detalhes';
import Item from './componentes/Item';

export default function Cesta() {
  const route = useRoute();
  //detalhes, itens, produtor
  const [detalhes, setDetalhes] = useState('');
  const [itens, setItens] = useState('');
  const [produtor, setProdutor] = useState('');
  const {topoCesta, tituloItens} = useTextos();

  React.useEffect(() => {
    if (route.params) {
      setDetalhes(route.params.detalhes);
      setItens(route.params.itens);
      setProdutor(route.params.produtor);
    }
  }, [route.params]);

  return (
    <>
      <FlatList
        data={itens}
        renderItem={Item}
        keyExtractor={({nome}) => nome}
        ListHeaderComponent={() => {
          return (
            <>
              <Topo titulo={topoCesta} />
              <View style={estilos.cesta}>
                <Detalhes {...detalhes} produtor={produtor} />
                <Texto style={estilos.titulo}>{tituloItens}</Texto>
              </View>
            </>
          );
        }}
        style={estilos.lista}
      />
    </>
  );
}

const estilos = StyleSheet.create({
  lista: {
    backgroundColor: '#ffffff',
  },
  titulo: {
    color: '#464646',
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 8,
    fontSize: 20,
    lineHeight: 32,
  },
  cesta: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
