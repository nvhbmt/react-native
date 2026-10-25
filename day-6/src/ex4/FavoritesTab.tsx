// TODO 8: lấy ids từ useFavorites(); lọc PHONES theo ids; danh sách rỗng → "Chưa có sản phẩm nào được lưu."
//         bấm một dòng cũng mở ProductDetails như Tab1.

import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ProductRow } from "./ProductRow";
import { PHONES } from "../data/phones";
import { useFavorites } from "./FavoritesContext";
import { TabProps } from "./types";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const favorites = PHONES.filter((x) => ids.includes(x.id));
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={[
        styles.content,
        favorites.length === 0 && styles.emptyContent,
      ]}
      data={favorites}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        favorites.length > 0 ? (
          <View style={styles.header}>
            <Text style={styles.eyebrow}>BỘ SƯU TẬP CỦA BẠN</Text>
            <Text style={styles.title}>Sản phẩm yêu thích</Text>
            <Text style={styles.subtitle}>
              Bạn đã lưu {favorites.length} sản phẩm
            </Text>
          </View>
        ) : null
      }
      ListEmptyComponent={() => (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <Ionicons name="heart-outline" size={42} color="#E45B78" />
          </View>
          <Text style={styles.emptyTitle}>Chưa có sản phẩm yêu thích</Text>
          <Text style={styles.emptyMessage}>
            Hãy mở một sản phẩm và nhấn “Lưu vào yêu thích” để xem lại tại
            đây.
          </Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  content: {
    width: "100%",
    maxWidth: 720,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 28,
    alignSelf: "center",
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    marginBottom: 18,
  },
  eyebrow: {
    marginBottom: 6,
    color: "#E45B78",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  title: {
    color: "#172033",
    fontSize: 24,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 6,
    color: "#7A8499",
    fontSize: 14,
  },
  separator: {
    height: 12,
  },
  emptyCard: {
    paddingHorizontal: 28,
    paddingVertical: 38,
    borderWidth: 1,
    borderColor: "#E8EBF2",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    shadowColor: "#172554",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  emptyIcon: {
    width: 82,
    height: 82,
    marginBottom: 20,
    borderRadius: 41,
    backgroundColor: "#FFF0F3",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: "#172033",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  emptyMessage: {
    maxWidth: 320,
    marginTop: 10,
    color: "#7A8499",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
});
