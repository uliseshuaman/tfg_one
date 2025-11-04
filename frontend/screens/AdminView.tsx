import { useEffect, useState } from 'react';
import { Button, FlatList, TextInput, View } from 'react-native';
import API from '../services/Api';

type Usuario = {
  id: number;
  nombre: string;
  correo: string;
  imagenUrl: string;
}

export default function AdminView() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    API.get('/usuarios/admin').then(res => setUsuarios(res.data));
  }, []);

  const handleUpdate = (id: number, campo: keyof Usuario, valor: string) => {
    const actualizado = usuarios.map(u =>
      u.id === id ? { ...u, [campo]: valor } : u
    );
    setUsuarios(actualizado);
  };

  const guardarCambios = (id: number) => {
    const usuario = usuarios.find(u => u.id === id);
    API.put(`/usuarios/${id}`, usuario);
  };

  return (
    <FlatList
      data={usuarios}
      keyExtractor={(item: Usuario) => item.id.toString()}
      renderItem={({ item }: {item: Usuario}) => (
        <View>
          <TextInput value={item.nombre} onChangeText={text => handleUpdate(item.id, 'nombre', text)} />
          <TextInput value={item.correo} onChangeText={text => handleUpdate(item.id, 'correo', text)} />
          <TextInput value={item.imagenUrl} onChangeText={text => handleUpdate(item.id, 'imagenUrl', text)} />
          <Button title="Guardar" onPress={() => guardarCambios(item.id)} />
        </View>
      )}
    />
  );
}