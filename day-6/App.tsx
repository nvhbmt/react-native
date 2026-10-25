import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { PHONES } from "./src/data/phones";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <SelectPhoneApp phone={PHONES[0]} /> */}
      {/* <SelectPhoneApi /> */}
      {/* <BottomTabApp /> */}
      {/* <StackTabApp /> */}
      <DrawerApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
