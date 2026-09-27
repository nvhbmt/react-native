// GIỜ 4 — Layout toàn màn hình: ScrollView & SafeAreaView
// Minh hoạ riêng: Bài 1 (HomeScreen hoàn chỉnh) + Bài 2 (BookDetailScreen).
// Chuyển qua lại bằng useState — tách khỏi TabBar (đó là nội dung của Giờ 5).
import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HomeScreen } from "./screens/HomeScreen";
import { BookDetailScreen } from "./screens/BookDetailScreen";
import { Book, BOOKS, CART_ITEMS, CartItem } from "./data";
import { TabBar, TabKey } from "./components/TabBar";
import { CartScreen } from "./screens/CartScreen";

export default function App() {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  const handleAddToCart = (book: Book) => {
    const existingItem = cart.find((item) => item.book.id === book.id);
    if (existingItem) {
      // Nếu sách đã có trong giỏ, tăng số lượng
      setCart(
        cart.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      // Nếu sách chưa có trong giỏ, thêm mới với số lượng 1
      setCart([...cart, { book, quantity: 1 }]);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return selectedBook ? (
          <BookDetailScreen
            book={selectedBook}
            onBack={() => setSelectedBookId(null)}
            onAddToCart={() => handleAddToCart(selectedBook)}
          />
        ) : (
          <HomeScreen
            cartCount={cart.length}
            onPressBook={(id) => setSelectedBookId(id)}
            onPressCart={() => setActiveTab("cart")}
          />
        );
      case "cart":
        return <CartScreen items={cart} />;
      case "category":
      case "account":
        return <Placeholder tab={activeTab} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        <View style={styles.container}>{renderContent()}</View>
        <TabBar
          active={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
            setSelectedBookId(null); // reset selected book khi đổi tab
          }}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function Placeholder({ tab }: { tab: TabKey }) {
  const note: Record<TabKey, string> = {
    home: 'Nội dung tab "Trang chủ" thuộc Giờ 4 — xem project bookstore-online-gio4.',
    category:
      'Nội dung tab "Danh mục" thuộc Giờ 2 — xem project bookstore-online-gio2.',
    cart: "",
    account: "Tài liệu gốc không mô tả tab này, để trống.",
  };
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{note[tab]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFFFFF" },
  body: { flex: 1, display: "flex", flexDirection: "column" },
  container: { flex: 1, marginBottom: 64 }, // 64px = chiều cao TabBar, để nội dung không bị che mất
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  placeholderText: { textAlign: "center", color: "#5B6B7F" },
});
