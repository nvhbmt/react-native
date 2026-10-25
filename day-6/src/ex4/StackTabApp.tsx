import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, TabParamList } from "./types";
import { FavoritesProvider, useFavorites } from "./FavoritesContext";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { ProductsTab } from "./ProductsTab";
import { ProductDetailsScreen } from "./ProductDetailsScreen";
import { FavoritesTab } from "./FavoritesTab";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// TODO 1: function HomeTabs() — Tab.Navigator (headerShown:false) với 2 Tab.Screen:
//         "Products" (ProductsTab) và "Favorites" (FavoritesTab), mỗi tab có icon Ionicons.
function HomeTabs() {
  const { ids } = useFavorites();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4F63C8",
        tabBarInactiveTintColor: "#8A94A6",
        tabBarLabelStyle: {
          marginTop: 2,
          fontSize: 11,
          fontWeight: "700",
        },
        tabBarStyle: {
          height: 68,
          paddingTop: 7,
          paddingBottom: 8,
          borderTopWidth: 0,
          backgroundColor: "#FFFFFF",
          shadowColor: "#172554",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 12,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductsTab}
        options={{
          title: "Sản phẩm",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "bag" : "bag-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesTab}
        options={{
          title: "Yêu thích",
          tabBarBadge: ids.length > 0 ? ids.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: "#E45B78",
            color: "#FFFFFF",
            fontSize: 10,
            fontWeight: "800",
          },
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
// TODO 2: export function StackTabApp() — <FavoritesProvider><NavigationContainer><Stack.Navigator>
//         Stack.Screen "Home" (component HomeTabs, title "Cửa hàng")
//         Stack.Screen "ProductDetails" (component ProductDetailsScreen, title "Chi tiết sản phẩm")
function StackTabApp() {
  return (
    <FavoritesProvider>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: "#4F63C8",
            background: "#F5F7FB",
            card: "#FFFFFF",
            text: "#172033",
            border: "#E8EBF2",
          },
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#FFFFFF" },
            headerTintColor: "#172033",
            headerTitleStyle: { fontWeight: "800" },
            contentStyle: { backgroundColor: "#F5F7FB" },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ title: "Vsmart Store" }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: "Chi tiết sản phẩm" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}

export { StackTabApp };
