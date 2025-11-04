import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import API from '../services/Api';

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { correo, contraseña });
      const { rol } = res.data;
      if (rol === 'ADMIN') navigation.navigate('AdminView');
      else if (rol === 'USER') navigation.navigate('UserView');
      else navigation.navigate('GuestView');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <TextInput placeholder="Correo" onChangeText={setCorreo} />
      <TextInput placeholder="Contraseña" secureTextEntry onChangeText={setContraseña} />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate('RegisterScreen')}>¿No tienes cuenta? Regístrate</Text>
    </View>
  );
}