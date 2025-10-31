import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import API from '../services/api';

export default function GuestView() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/usuarios/publico').then(res => setUsers(res.data));
  }, []);

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Image source={{ uri: item.imagenUrl }} style={{ width: 100, height: 100 }} />
          <Text>{item.nombre}</Text>
        </View>
      )}
    />
  );
}