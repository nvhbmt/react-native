import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabBar } from "../components/TabBar"; // ← Tab Bar giao diện đã dựng sẵn
import { useCart } from "../store/hooks";

const EMOJI: Record<string, string> = {
  Home: "🏠",
  Categories: "🗂️",
  Cart: "🛒",
  Account: "👤",
};

// Nối Tab Bar tự dựng với React Navigation: nhận { state, descriptors, navigation }
export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { totalQuantity } = useCart();
  // TODO BT7.1a: dựng mảng `items: TabItem[]` từ state.routes
  //   key = route.key · label = descriptors[route.key].options.title ?? route.name · emoji tra theo route.name
  const items = state.routes.map((route) => {
    const key = route.key;
    const label = descriptors[route.key].options.title ?? route.name;
    const badge = route.name == "Cart" ? totalQuantity : undefined; // TODO BT7.3e: gắn badge = totalQuantity (từ useCart) cho route "Cart"
    let emoji = "";
    if (route.name in EMOJI) {
      emoji = EMOJI[route.name];
    }
    return { key, label, emoji, badge };
  });
  // TODO BT7.1a: viết onPress(key): emit "tabPress" rồi navigation.navigate(route.name) nếu chưa focus
  const onPress = (key: string) => {
    const route = state.routes.find((r) => r.key === key);
    const isFocused = state.routes[state.index].key === key;
    if (!isFocused && route) {
      navigation.navigate(route.name);
    }
  };
  // TODO BT7.1a: return <TabBar items={items} activeKey={state.routes[state.index].key} onPress={onPress} />
  // TODO BT7.3e: gắn badge = totalQuantity (từ useCart) cho route "Cart"
  return (
    <TabBar
      items={items}
      activeKey={state.routes[state.index].key}
      onPress={onPress}
    />
  );
}
