import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View  style={{ padding: 20}} >
      <Text style={{fontSize: 24}}>Bienvenido a la app de gestión de usuarios</Text>
      <Button title="Iniciar sesión" onPress={() => router.push('../screens/LoginScreen')} />      
      <Button title="Registrarse" onPress={() => router.push('../screens/RegisterScreen')} />
      <Button title="Continuar como invitado" onPress={() => router.push('../screens/GuestView')} />
    </View>
  );
}
