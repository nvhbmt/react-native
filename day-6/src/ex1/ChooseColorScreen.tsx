import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

interface Props {
  navigation: any;
  route: any;
  phone: Phone;
}

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(
    route.params?.color,
  );
  const [line1, line2] = phone.name.split(" - "); // "Điện Thoại Vsmart Joy 3" / "Hàng chính hãng"
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
          {picked && (
            <>
              <Text style={styles.detail}>
                Màu:{" "}
                <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>

              <Text style={styles.detail}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>

              <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate("Product", { color: picked }, { merge: true })
          }
          style={({ pressed }) => [
            styles.doneButton,
            pressed && styles.doneButtonPressed,
          ]}
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// TODO 3: CHỈ KHI đã chọn màu (picked khác undefined) hiện thêm 3 dòng dưới tên sản phẩm:
//           Màu: <PHONE_COLORS[picked].label>        ← tên màu IN ĐẬM
//           Cung cấp bởi <phone.supplier>            ← nhà cung cấp IN ĐẬM
//           <formatPrice(phone.price)>               ← giá, chữ đậm
//         (dùng toán tử &&  hoặc  ? :  trong JSX; Fragment <>...</> để gộp nhiều dòng)

// TODO 4: nút "XONG": nền colors.blue, bo góc 4, chữ trắng đậm.
//         Bấm → navigation.navigate("Product", { color: picked }, { merge: true })

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  thumb: {
    width: 105,
    height: 125,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  small: {
    color: "#111",
    fontSize: 14,
  },
  detail: {
    color: "#111",
    fontSize: 14,
    marginTop: 8,
  },

  bold: {
    fontWeight: "bold",
  },

  price: {
    color: "#111",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#C4C4C4",
  },
  hint: {
    fontSize: 16,
    marginBottom: 8,
  },
  swatches: {
    flex: 1,
    alignItems: "center",
  },
  swatch: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  swatchOn: {
    borderWidth: 4,
    borderColor: "#333",
  },
  doneButton: {
    height: 48,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
  },

  doneButtonPressed: {
    opacity: 0.75,
  },

  doneText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
