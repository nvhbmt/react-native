import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import { colors } from "../theme";
import { Ionicons } from "@expo/vector-icons";

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};
const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeScreen() {
  return (
    <View style={s.center}>
      <Text style={s.big}>Xin chào 👋</Text>
    </View>
  );
}
function ProfileScreen() {
  return (
    <View style={s.center}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NV</Text>
      </View>
      <Text style={s.big}>Nguyễn Việt Hoàng</Text>
      <Text style={s.muted}>hoangnguyen1157@gmail.com</Text>
    </View>
  );
}

// TODO 1: SettingsScreen — 2 state: notify (mặc định true) và dark (mặc định false).
//         Mỗi dòng: <Text>Nhận thông báo</Text> <Switch value={notify} onValueChange={setNotify} />
//         Dòng cuối hiển thị: "Thông báo: BẬT/TẮT · Giao diện: tối/sáng".

function SettingsScreen() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <View style={s.center}>
      <View style={s.notificationRow}>
        <Text style={s.notificationText}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={s.notificationRow}>
        <Text style={s.notificationText}>Giao diện tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={s.statusText}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

// TODO 2: export function DrawerApp() — NavigationContainer > Drawer.Navigator
//         drawerIcon: Ionicons theo tên route (home-outline / person-outline / settings-outline)
//         drawerActiveTintColor: colors.red; 3 Drawer.Screen với title tiếng Việt.
export function DrawerApp() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "settings-outline";
            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "Profile") {
              iconName = "person-outline";
            } else if (route.name === "Settings") {
              iconName = "settings-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          drawerActiveTintColor: colors.red,
        })}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Trang chủ" }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Hồ sơ" }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Cài đặt" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// TODO 3 (nâng cao): đưa notify/dark lên Context để chế độ tối đổi nền cả màn Home và Profile.

const s = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  big: {
    fontSize: 24,
    fontWeight: "700",
  },
  muted: {
    fontSize: 14,
    color: "#6B7280",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4F63C8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
  },
  notificationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  notificationText: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#6B7280",
  },
});
