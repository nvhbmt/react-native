import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFavorites } from "./FavoritesContext";
import { RootProps } from "./types";
import { PHONE_COLORS, PHONES } from "../data/phones";
import { Stars } from "../components/Stars";
import { formatPrice } from "../theme";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params; // TODO 4: lấy id rồi tìm phone trong PHONES
  const { has, toggle } = useFavorites();
  // TODO 5: không tìm thấy → "Không tìm thấy sản phẩm #id"
  if (!PHONES.find((x) => x.id === id)) {
    return (
      <View style={styles.notFound}>
        <View style={styles.notFoundIcon}>
          <Ionicons name="search-outline" size={38} color="#7A8499" />
        </View>
        <Text style={styles.notFoundTitle}>Không tìm thấy sản phẩm</Text>
        <Text style={styles.notFoundMessage}>Mã sản phẩm: #{id}</Text>
      </View>
    );
  }

  const phone = PHONES.find((x) => x.id === id)!;
  const isFavorite = has(id);
  // TODO 6: hiển thị ảnh (màu mặc định), tên, sao, giá, nhà cung cấp
  // TODO 7: nút "♡ Lưu vào yêu thích" / "♥ Đã lưu" → toggle(phone.id)
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageCard}>
        <View style={styles.imageBadge}>
          <Ionicons name="shield-checkmark" size={15} color="#3B5CCC" />
          <Text style={styles.imageBadgeText}>Chính hãng</Text>
        </View>
        <Image
          source={PHONE_COLORS[phone.defaultColor].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.promoBadge}>
          <Text style={styles.promoBadgeText}>{phone.badge}</Text>
        </View>

        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.ratingRow}>
          <Stars value={phone.rating} size={19} />
          <Text style={styles.review}>{phone.reviewCount} đánh giá</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          {phone.oldPrice > phone.price && (
            <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <Ionicons name="storefront-outline" size={20} color="#4F63C8" />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Cung cấp bởi</Text>
            <Text style={styles.infoValue}>{phone.supplier}</Text>
          </View>
          <Ionicons name="checkmark-circle" size={20} color="#22A06B" />
        </View>

        <Text style={styles.colorTitle}>Màu sắc có sẵn</Text>
        <View style={styles.colorsRow}>
          {phone.colors.map((color) => (
            <View key={color} style={styles.colorItem}>
              <View
                style={[
                  styles.colorDot,
                  { backgroundColor: PHONE_COLORS[color].hex },
                  color === "silver" && styles.silverDot,
                ]}
              />
              <Text style={styles.colorLabel}>
                {PHONE_COLORS[color].label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          isFavorite ? "Xóa khỏi danh sách yêu thích" : "Lưu vào yêu thích"
        }
        onPress={() => toggle(id)}
        style={({ pressed }) => [
          styles.favoriteButton,
          isFavorite && styles.favoriteButtonActive,
          pressed && styles.favoriteButtonPressed,
        ]}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={22}
          color={isFavorite ? "#FFFFFF" : "#E45B78"}
        />
        <Text
          style={[
            styles.favoriteButtonText,
            isFavorite && styles.favoriteButtonTextActive,
          ]}
        >
          {isFavorite ? "Đã lưu vào yêu thích" : "Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  content: {
    width: "100%",
    maxWidth: 720,
    padding: 16,
    paddingBottom: 30,
    alignSelf: "center",
  },
  imageCard: {
    minHeight: 340,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E8EBF2",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  imageBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
    flexDirection: "row",
    alignItems: "center",
  },
  imageBadgeText: {
    marginLeft: 5,
    color: "#3B5CCC",
    fontSize: 12,
    fontWeight: "700",
  },
  image: {
    width: "82%",
    height: 290,
  },
  detailsCard: {
    marginTop: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E8EBF2",
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
  },
  promoBadge: {
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#FFF0F3",
    alignSelf: "flex-start",
  },
  promoBadgeText: {
    color: "#D93D60",
    fontSize: 10,
    fontWeight: "800",
  },
  name: {
    color: "#172033",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 30,
  },
  ratingRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  review: {
    marginLeft: 9,
    color: "#7A8499",
    fontSize: 13,
  },
  priceRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
  },
  price: {
    marginRight: 12,
    color: "#E63946",
    fontSize: 26,
    fontWeight: "900",
  },
  oldPrice: {
    color: "#9CA3AF",
    fontSize: 14,
    textDecorationLine: "line-through",
  },
  divider: {
    height: 1,
    marginVertical: 18,
    backgroundColor: "#EDF0F5",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    width: 42,
    height: 42,
    marginRight: 12,
    borderRadius: 13,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: "#7A8499",
    fontSize: 12,
  },
  infoValue: {
    marginTop: 3,
    color: "#172033",
    fontSize: 15,
    fontWeight: "700",
  },
  colorTitle: {
    marginTop: 22,
    marginBottom: 12,
    color: "#172033",
    fontSize: 15,
    fontWeight: "700",
  },
  colorsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorItem: {
    marginRight: 18,
    marginBottom: 8,
    alignItems: "center",
  },
  colorDot: {
    width: 30,
    height: 30,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    borderRadius: 15,
    shadowColor: "#172554",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  silverDot: {
    borderWidth: 1,
    borderColor: "#D6DBE6",
  },
  colorLabel: {
    marginTop: 5,
    color: "#7A8499",
    fontSize: 11,
    textTransform: "capitalize",
  },
  favoriteButton: {
    height: 54,
    marginTop: 14,
    borderWidth: 1.5,
    borderColor: "#E45B78",
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButtonActive: {
    backgroundColor: "#E45B78",
  },
  favoriteButtonPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },
  favoriteButtonText: {
    marginLeft: 9,
    color: "#D93D60",
    fontSize: 16,
    fontWeight: "800",
  },
  favoriteButtonTextActive: {
    color: "#FFFFFF",
  },
  notFound: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F5F7FB",
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundIcon: {
    width: 78,
    height: 78,
    marginBottom: 18,
    borderRadius: 39,
    backgroundColor: "#E9EDF5",
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundTitle: {
    color: "#172033",
    fontSize: 20,
    fontWeight: "800",
  },
  notFoundMessage: {
    marginTop: 7,
    color: "#7A8499",
    fontSize: 14,
  },
});
