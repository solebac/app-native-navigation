import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Cesta from './componentes/Cesta';
import Topo from '../../componentes/Topo';
import useTextos from '../../hooks/useTextos';
import topo from '../../assets/produtores/topo.png';

export default function Produtor() {
  const route = useRoute(); //assincrona
  console.log('Router.: ', route); //Desestruturando
  //const {nome, imagem, cestas} = route.params;
  const {tituloProdutor, tituloCestas} = useTextos();
  const [data, setData] = useState([]);
  const [nome, setNome] = useState('');
  const [imagem, setImagem] = useState('');

  React.useEffect(() => {
    if (route.params.item.cestas) {
      setNome(route.params.item.nome);
      setImagem(route.params.item.imagem);
      setData(route.params.item.cestas);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);
  const TopoLista = () => {
    return (
      <>
        <Topo titulo={tituloProdutor} imagem={topo} altura={150} />
        <View style={estilos.conteudo}>
          <View style={estilos.logo}>
            <Image source={imagem} style={estilos.produtorImage} />
            <Text style={estilos.produtor}>{nome}</Text>
          </View>
          <Text style={estilos.cestas}>{tituloCestas}</Text>
        </View>
      </>
    );
  };
  return (
    <FlatList
      ListHeaderComponent={TopoLista}
      data={data}
      renderItem={({item}) => <Cesta {...item} produtor={{nome, imagem}} />}
      style={estilos.lista}
    />
  );
}

const estilos = StyleSheet.create({
  lista: {
    backgroundColor: '#ffffff',
  },
  conteudo: {
    paddingHorizontal: 16,
  },
  logo: {
    flexDirection: 'row',
  },
  produtorImage: {
    width: 62,
    height: 62,

    marginTop: -23,

    borderRadius: 6,
  },
  produtor: {
    color: '#464646',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  cestas: {
    color: '#464646',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
    marginTop: 32,
  },
});
