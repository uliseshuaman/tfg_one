import { useEffect, useState } from 'react';
import { Button, FlatList, Image, Text, TextInput, View } from 'react-native';
import API from '../services/Api';

type Usuario = {
  id: number;
  nombre: string;
  correo: string;
  imagenUrl: string;
};

export default function UserView() {
  const [perfil, setPerfil] = useState<Usuario | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    API.get('/usuarios/me').then(res => setPerfil(res.data));
    API.get('/usuarios/publico').then(res => setUsuarios(res.data));
  }, []);

  const handleUpdate = () => {
    if(perfil){
        API.put(`/usuarios/${perfil.id}`, perfil).then(res => setPerfil(res.data));
    }
       
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 18, marginBottom: 10}}>Tu perfil</Text>
       {perfil && (
        <>
          <TextInput
            value={perfil.nombre}
            onChangeText={text => setPerfil({ ...perfil, nombre: text })}
            placeholder="Nombre"
            style={{ marginBottom: 10 }}
          />
          <TextInput
            value={perfil.imagenUrl}
            onChangeText={text => setPerfil({ ...perfil, imagenUrl: text })}
            placeholder="URL de imagen"
            style={{ marginBottom: 10 }}
          />
          <Button title="Actualizar perfil" onPress={handleUpdate} />
        </>
      )}

      <Text style={{ fontSize: 18, marginVertical: 20 }}>Otros usuarios</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item: Usuario) => item.id.toString()}
        renderItem={({ item }: { item: Usuario }) => (
          <View style={{ marginBottom: 15 }}>
            <Image source={{ uri: item.imagenUrl }} style={{ width: 100, height: 100 }} />
            <Text>{item.nombre}</Text>
          </View>
        )}
      />
    </View>
  );
}