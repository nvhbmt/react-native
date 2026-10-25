import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stars } from "../components/Stars";
import { PHONE_COLORS } from "../data/phones";
import { formatPrice } from "../theme";
import { ColorKey, Phone } from "../types";

interface Props {
  navigation: any;
  route: any;
  phone: Phone;
}

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color as ColorKey | undefined;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      {/* Ảnh sản phẩm */}
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Thông tin sản phẩm */}
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={[styles.row, styles.ratingRow]}>
          <Stars value={phone.rating} size={22} />

          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>

          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        <View style={styles.dealRow}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.questionCircle}>
            <Text style={styles.questionText}>?</Text>
          </View>
        </View>

        {/* Nút chuyển sang màn chọn màu */}
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            navigation.navigate("ChooseColor", {
              color: picked,
            })
          }
          style={({ pressed }) => [
            styles.chooseButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.chooseText}>
            {phone.colors.length} MÀU-
            {picked ? "CHỌN LOẠI" : "CHỌN MÀU"}
          </Text>

          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </View>

      {/* Nút mua */}
      <Pressable
        accessibilityRole="button"
        onPress={() => console.log("Chọn mua:", phone.id, shown)}
        style={({ pressed }) => [
          styles.buyButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },

  imageWrap: {
    flex: 1,
    minHeight: 260,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },

  image: {
    width: "76%",
    height: "100%",
    maxWidth: 300,
    maxHeight: 350,
  },

  info: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  name: {
    color: "#111111",
    fontSize: 15,
    marginBottom: 6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  ratingRow: {
    justifyContent: "flex-start",
    gap: 12,
  },

  review: {
    color: "#111111",
    fontSize: 14,
  },

  price: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 38,
  },

  oldPrice: {
    color: "#777777",
    fontSize: 14,
    textDecorationLine: "line-through",
  },

  dealRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  badge: {
    color: "#E51414",
    fontSize: 12,
    fontWeight: "bold",
  },

  questionCircle: {
    width: 20,
    height: 20,
    marginLeft: 10,
    borderWidth: 1.5,
    borderColor: "#444444",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  questionText: {
    color: "#444444",
    fontSize: 13,
    fontWeight: "bold",
  },

  chooseButton: {
    height: 38,
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  chooseText: {
    color: "#111111",
    fontSize: 15,
  },

  arrow: {
    position: "absolute",
    right: 14,
    color: "#111111",
    fontSize: 32,
    lineHeight: 32,
  },

  buyButton: {
    height: 48,
    marginHorizontal: 16,
    marginTop: 42,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#F30D0D",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 3,
  },

  buyText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },

  buttonPressed: {
    opacity: 0.75,
  },
});
