import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBookById } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useCart, useWishlist } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { Book } from "../types";
import { colors, formatPrice, radius } from "../theme";

// gọi getBookById thay cho mảng tĩnh; có loading + lỗi + thử lại
export function BookDetailScreen({ route }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params;
  const { add } = useCart();
  const { toggle, isFavorite } = useWishlist();

  // TODO BT7.5d: tạo state book / loading / error và hàm load() gọi getBookById(bookId); chạy trong useEffect([bookId])
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const book = await getBookById(bookId);
      setBook(book);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [bookId]);

  // TODO BT7.5e: if (loading) return <LoadingView/>;  if (error || !book) return <ErrorView message onRetry={load}/>
  // Tạm thời lấy sách từ dữ liệu giả để màn hình có nội dung:
  if (loading) return <LoadingView />;
  if (error || !book)
    return (
      <ErrorView message={error || "Không tìm thấy sách"} onRetry={load} />
    );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.emoji}>{book.emoji}</Text>
      </View>
      <View>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <View style={{ position: "absolute", right: 0, top: 0 }}>
          <Pressable onPress={() => toggle(book.id)}>
            <Text
              style={[
                styles.favorite,
                isFavorite(book.id) && styles.favoriteActive,
              ]}
            >
              {isFavorite(book.id) ? "❤️" : "🤍"}
            </Text>
          </Pressable>
        </View>
      </View>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
      <Text style={styles.stock}>Còn {book.stock} cuốn</Text>
      <Text style={styles.desc}>{book.description}</Text>

      {/* TODO BT7.3c: nút "Thêm vào giỏ" → add({ bookId, title, price, emoji, color, stock }) từ book */}
      <Pressable
        style={styles.btn}
        onPress={() =>
          add({
            bookId: book.id,
            title: book.title,
            price: book.price,
            emoji: book.emoji,
            color: book.color,
            stock: book.stock,
          })
        }
      >
        <Text style={styles.btnText}>Thêm vào giỏ</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 8 },
  cover: {
    height: 220,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { fontSize: 90 },
  title: { fontSize: 22, fontWeight: "800", color: colors.text, marginTop: 8 },
  author: { color: colors.muted, fontSize: 15 },
  price: { fontSize: 20, fontWeight: "800", color: colors.indigo },
  stock: { color: colors.muted },
  desc: { color: colors.text, lineHeight: 22, marginTop: 4 },
  btn: {
    backgroundColor: colors.indigo,
    padding: 14,
    borderRadius: radius.md,
    alignItems: "center",
    marginTop: 12,
  },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  favorite: { fontSize: 28, marginTop: 4 },
  favoriteActive: { color: colors.heart },
});
