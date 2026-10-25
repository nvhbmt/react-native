import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Stars } from "../components/Stars";
import { PHONE_COLORS } from "../data/phones";
import { formatPrice } from "../theme";
import { Phone } from "../types";

export function ProductRow({
  phone,
  onPress,
}: {
  phone: Phone;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Xem chi tiết ${phone.name}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[phone.defaultColor].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText} numberOfLines={1}>
            {phone.badge}
          </Text>
        </View>

        <Text style={styles.name} numberOfLines={2}>
          {phone.name}
        </Text>

        <View style={styles.ratingRow}>
          <Stars value={phone.rating} size={14} />
          <Text style={styles.review}>({phone.reviewCount})</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          {phone.oldPrice > phone.price && (
            <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
          )}
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 142,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E8EBF2",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#172554",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },
  imageWrap: {
    width: 106,
    height: 118,
    marginRight: 14,
    borderRadius: 14,
    backgroundColor: "#F4F7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 88,
    height: 106,
  },
  content: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  badge: {
    maxWidth: 180,
    marginBottom: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#3B5CCC",
    fontSize: 9,
    fontWeight: "800",
  },
  name: {
    color: "#172033",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  ratingRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  review: {
    marginLeft: 6,
    color: "#7A8499",
    fontSize: 12,
  },
  priceRow: {
    marginTop: 7,
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
  },
  price: {
    marginRight: 8,
    color: "#E63946",
    fontSize: 17,
    fontWeight: "800",
  },
  oldPrice: {
    color: "#9CA3AF",
    fontSize: 11,
    textDecorationLine: "line-through",
  },
});
