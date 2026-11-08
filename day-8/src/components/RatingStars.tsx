import React from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import { colors } from "../theme";

interface Props {
  value: number; // 0–5 (có thể lẻ, làm tròn khi vẽ)
  size?: number;
  onChange?: (v: number) => void; // có truyền → cho phép bấm chọn sao
}

// TODO BT8.5a: component sao TÁI SỬ DỤNG
//   - vẽ 5 ngôi sao ★: sao <= Math.round(value) màu colors.warning, còn lại colors.line; cỡ chữ = size
//   - nếu có onChange: bọc mỗi sao trong Pressable, bấm sao n → onChange(n)
export function RatingStars({ value, size = 18, onChange }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Pressable onPress={() => onChange?.(index + 1)}>
          <Text
            style={{
              fontSize: size,
              color: value > index ? colors.warning : colors.line,
            }}
          >
            ★
          </Text>
        </Pressable>
      ))}
    </View>
  );
}