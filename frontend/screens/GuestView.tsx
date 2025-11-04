import { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import API from '../services/Api';

type UsuarioPublico = {
    id: number;
    nombre: string;
    imageUrl: string;
};

export default function GuestView() {
  const [users, setUsers] = useState<UsuarioPublico[]>([]);

  useEffect(() => {
    API.get('/usuarios/publico').then(res => setUsers(res.data));
  }, []);

  return (
    <FlatList
      data={users}
      keyExtractor={(item: UsuarioPublico) => item.id.toString()}
      renderItem={({ item }: {item: UsuarioPublico}) => (
        <View style={{marginBottom: 15}}>
          <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />
          <Text>{item.nombre}</Text>
        </View>
      )}
    />
  );
}