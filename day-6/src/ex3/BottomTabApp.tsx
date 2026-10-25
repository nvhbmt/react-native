import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text, View, StyleSheet, TextInput } from "react-native";
import { PHONES } from "../data/phones";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

// tên icon: [khi chọn, khi không chọn]
const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text>{item.name.split(" - ")[0]}</Text>
        </View>
      )}
    />
  );
}
// TODO 1: SearchTab — const [keyword, setKeyword] = useState("");
//         <TextInput value={keyword} onChangeText={setKeyword} placeholder="Nhập từ khóa" style={s.input} />
//         Lọc PHONES theo keyword (không phân biệt hoa/thường: toLowerCase + includes), hiển thị kết quả.
//         Không có kết quả → hiện "Không có kết quả cho “...”".

function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const filtered = PHONES.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <View>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        style={styles.input}
      />
      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name.split(" - ")[0]}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={{ padding: 16 }}>
            <Text>Không có kết quả cho “{keyword}”</Text>
          </View>
        )}
      />
    </View>
  );
}
// TODO 2: ProfileTab — vòng tròn Avatar (View bo tròn width=height=96, borderRadius=48, hiện chữ cái đầu)
//         + Name (chữ lớn, đậm) + 1 dòng email. Canh giữa màn hình.

function ProfileTab() {
  const user = {
    name: "Nguyễn Việt Hoàng",
    email: "hoangnguyen1157@gmail.com",
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
      </View>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
}
// TODO 3: export function BottomTabApp() — NavigationContainer > Tab.Navigator với screenOptions:
//         tabBarActiveTintColor: colors.red,
//         tabBarIcon: ({ focused, color, size }) => <Ionicons name={ICONS[route.name][focused ? 0 : 1]} .../>
//         3 Tab.Screen, đặt title tiếng Việt (Trang chủ / Tìm kiếm / Cá nhân).

function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "red",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={ICONS[route.name][focused ? 0 : 1]}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{ title: "Trang chủ" }}
        />
        <Tab.Screen
          name="Search"
          component={SearchTab}
          options={{ title: "Tìm kiếm" }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{ title: "Cá nhân" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    margin: 16,
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
});

export { BottomTabApp };
