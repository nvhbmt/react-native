import { FlatList, StyleSheet, Text, View } from "react-native";
import { TabProps } from "./types";
import { PHONES } from "../data/phones";
import { ProductRow } from "./ProductRow";

export function ProductsTab({ navigation }: TabProps<"Products">) {
  // TODO 3: FlatList data={PHONES}; mỗi dòng là <ProductRow phone={item} onPress={...} />
  //         onPress: navigation.navigate("ProductDetails", { id: item.id })

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={PHONES}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.eyebrow}>SMARTPHONE CHÍNH HÃNG</Text>
          <Text style={styles.title}>Chọn chiếc điện thoại phù hợp</Text>
          <Text style={styles.subtitle}>
            {PHONES.length} sản phẩm nổi bật dành cho bạn
          </Text>
        </View>
      }
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
  header: {
    marginBottom: 18,
  },
  eyebrow: {
    marginBottom: 6,
    color: "#4F63C8",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  title: {
    color: "#172033",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 31,
  },
  subtitle: {
    marginTop: 6,
    color: "#7A8499",
    fontSize: 14,
  },
  separator: {
    height: 12,
  },
});
