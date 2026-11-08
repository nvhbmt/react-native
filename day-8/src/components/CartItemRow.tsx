import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

// TODO BT8.6: nút −/+ với STATE CỤC BỘ + debounce 300ms
//   1) const [qty, setQty] = useState(item.quantity); const debouncedQty = useDebounce(qty, 300);
//   2) useEffect: khi debouncedQty khác item.quantity → onChangeQty(item.bookId, debouncedQty)
//   3) useEffect: khi item.quantity đổi từ nơi khác → setQty(item.quantity)
//   4) canDec = qty > 1; canInc = qty < item.stock (không vượt tồn kho); nút bị mờ khi không bấm được
//   5) hiển thị "Còn {item.stock}"
// Hiện tại chỉ hiện số lượng tĩnh "x{quantity}".
export function CartItemRow({ item, onRemove, onChangeQty }: Props) {
  const [qty, setQty] = useState(item.quantity)
  const debouncedQty = useDebounce(qty, 300);

  useEffect(() => {
      if (debouncedQty !== item.quantity) {
        onChangeQty(item.bookId, debouncedQty)
      }
  }, [debouncedQty])

  useEffect(() => {
    if (item.quantity !== qty) {
      setQty(item.quantity)
    }
  }, [item.quantity])


  const canDec = qty > 1; 
  const canInc = qty < item.stock

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Pressable onPress={() => setQty(prev => prev - 1)} disabled={!canDec}>
            <Text style={canDec && styles.qty}>-</Text>
          </Pressable>
          <Text style={styles.qty}>{qty}</Text>
          <Pressable onPress={() => setQty(prev => prev + 1)} disabled={!canInc}>
            <Text style={canInc && styles.qty}>+</Text>
          </Pressable>
          Còn {item.stock - qty}
        </View>
      </View>
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  qty: { fontWeight: "800", color: colors.navy, fontSize: 16 },
  trash: { fontSize: 22 },
});
