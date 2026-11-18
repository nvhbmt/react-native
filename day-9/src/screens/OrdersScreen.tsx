import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBadge } from "../components/StatusBadge";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getOrdersByUser } from "../services/orderService";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { formatDateTime } from "../utils/format";
import { showMessage } from "../utils/dialog";
import { RootScreenProps } from "../navigation/types";
import { Order, OrderStatus } from "../types";
import { colors, formatPrice, radius } from "../theme";

export const PAYMENT_LABEL = {
  cod: "Thanh toán khi nhận hàng (COD)",
  bank: "Chuyển khoản ngân hàng",
} as const;

const options: { label: string; value: "all" | OrderStatus }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Chờ xác nhận", value: "pending" },
  { label: "Đang giao", value: "shipping" },
  { label: "Hoàn tất", value: "completed" },
  { label: "Đã huỷ", value: "cancelled" },
];

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user, isLoggedIn } = useAuth();
  const { items: cartItems, add, setQty } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null); // đơn đang mở rộng (xem chi tiết ngay tại màn này)
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");

  const load = useCallback(async () => {
    // TODO BT9.3a: if (!user) return; bật loading, xoá error; gọi getOrdersByUser(user.id);
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getOrdersByUser(user.id);
      setOrders(data?.sort((a, b) => b.createdAt?.localeCompare(a.createdAt)));
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
    // SẮP XẾP LẠI ở client: mới nhất lên đầu (b.createdAt.localeCompare(a.createdAt)); catch → setError(getErrorMessage(e)); finally tắt loading
    setLoading(false);
  }, [user]);
  useEffect(() => {
    load();
  }, [load]);

  // TODO BT9.C1 (thử thách "Mua lại"): thêm lại toàn bộ sản phẩm của đơn vào giỏ hiện tại
  const reorder = async (order: Order) => {
    void order;
    void getBooks;
    void cartItems;
    void add;
    void setQty;
    void showMessage;
  };

  if (!isLoggedIn) {
    return (
      <EmptyState
        emoji="🔒"
        title="Bạn cần đăng nhập"
        actionLabel="Đăng nhập"
        onAction={() => navigation.navigate("Login")}
      />
    );
  }

  const filterdOrders = orders.filter(
    (o) => statusFilter === "all" || o.status === statusFilter
  );

  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ gap: 8, padding: 12 }}
      >
        {options.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => setStatusFilter(option.value)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor:
                statusFilter === option.value ? "#3B3FD8" : "#E5E7EB",
            }}
          >
            <Text
              style={{
                color: statusFilter === option.value ? "#FFFFFF" : "#111827",
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <FlatList
        data={filterdOrders}
        keyExtractor={(o) => String(o.id)}
        contentContainerStyle={{
          padding: 12,
          gap: 10,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <EmptyState
            emoji="🧾"
            title="Bạn chưa có đơn hàng nào"
            message="Đặt đơn đầu tiên để theo dõi tại đây."
            actionLabel="Mua sắm ngay"
            onAction={() =>
              navigation.navigate("Tabs", {
                screen: "Home",
              })
            }
          />
        }
        renderItem={({ item: o }) => {
          const open = openId === o.id;

          return (
            <View style={styles.card}>
              <Pressable
                onPress={() => setOpenId(open ? null : o.id)}
                style={styles.head}
              >
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={styles.code}>Đơn #{o.id}</Text>

                  <Text style={styles.date}>{formatDateTime(o.createdAt)}</Text>

                  <Text style={styles.total}>{formatPrice(o.total)}</Text>
                </View>

                <View
                  style={{
                    alignItems: "flex-end",
                    gap: 6,
                  }}
                >
                  <StatusBadge status={o.status} />

                  <Text style={styles.toggle}>
                    {open ? "Thu gọn ▲" : "Chi tiết ▼"}
                  </Text>
                </View>
              </Pressable>

              {open && (
                <View style={styles.detail}>
                  {o.items.map((it) => (
                    <View key={it.bookId} style={styles.itemRow}>
                      <Text style={styles.itemTitle} numberOfLines={1}>
                        {it.title} × {it.quantity}
                      </Text>

                      <Text style={styles.itemPrice}>
                        {formatPrice(it.price * it.quantity)}
                      </Text>
                    </View>
                  ))}

                  <View style={styles.addr}>
                    <Text style={styles.addrH}>Giao đến</Text>

                    <Text style={styles.addrT}>
                      {o.address.name} · {o.address.phone}
                    </Text>

                    <Text style={styles.addrT}>{o.address.address}</Text>

                    <Text style={styles.addrT}>
                      Thanh toán: {PAYMENT_LABEL[o.paymentMethod]}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  code: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },

  date: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
  },

  total: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3B3FD8",
    marginTop: 6,
  },

  toggle: {
    fontSize: 13,
    color: "#3B3FD8",
    fontWeight: "600",
  },

  detail: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 10,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  itemTitle: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },

  addr: {
    backgroundColor: "#F4F6FB",
    borderRadius: 8,
    padding: 12,
    gap: 5,
    marginTop: 4,
  },

  addrH: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },

  addrT: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 20,
  },
});
