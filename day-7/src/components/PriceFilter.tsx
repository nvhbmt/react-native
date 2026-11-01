import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../theme";
import { PriceRange } from "../utils/filters";

interface Props {
  value: PriceRange;
  onChange: (v: PriceRange) => void;
}

// THỬ THÁCH: 3 nút lọc khoảng giá (bấm lần nữa để bỏ chọn)
export function PriceFilter({ value, onChange }: Props) {
  // TODO BT7.C2: render 3 nút từ PRICE_RANGES (import từ utils/filters); nút đang chọn có nền cyan (colors.cyan)
  //   active = value === r.key · onPress = onChange(active ? null : r.key)   (mẫu: xem CategoryChips)

  const PRICE_RANGES: { label: string; key: PriceRange }[] = [
    {
      label: "Dưới 100k",
      key: "lt100",
    },
    {
      label: "100k–300k",
      key: "100to300",
    },
    {
      label: "Trên 300k",
      key: "gt300",
    },
  ];
  const active = (r: { key: PriceRange }) => value === r.key;
  return (
    <View style={styles.row}>
      {PRICE_RANGES.map((r) => (
        <Pressable
          key={r.key}
          style={({ pressed }) => [
            styles.price,
            (active(r) || pressed) && styles.priceActive,
          ]}
          onPress={() => onChange(active(r) ? null : r.key)}
        >
          <Text style={[styles.text, active(r) && styles.textActive]}>
            {r.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    flexDirection: "row",
  },
  price: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.cyan,
  },
  priceActive: { backgroundColor: colors.cyan, borderColor: colors.cyan },
  text: { color: colors.text, fontWeight: "600" },
  textActive: { color: "#fff" },
});
