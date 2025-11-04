import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import API from '../services/Api';

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', {
        nombre,
        correo,
        contraseña,
        imagenUrl,
        rol: 'USER',
      });
      navigation.navigate('LoginScreen');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <TextInput placeholder="Nombre" onChangeText={setNombre} />
      <TextInput placeholder="Correo" onChangeText={setCorreo} />
      <TextInput placeholder="Contraseña" secureTextEntry onChangeText={setContraseña} />
      <TextInput placeholder="URL de imagen" onChangeText={setImagenUrl} />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}