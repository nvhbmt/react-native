import { useCallback, useEffect, useState } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { SelectPhoneApp } from "./SelectPhoneApp";
import ErrorBox from "../components/ErrorBox";
import { Loading } from "../components/Loading";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    // TODO 1: setError(null); setPhone(null);
    setError(null);
    setPhone(null);
    // TODO 2: try { setPhone(await fetchPhone("1")) } catch (e) { setError(...) }
    try {
      setPhone(await fetchPhone("1"));
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  // TODO 3: useEffect gọi load() khi màn hình mở lần đầu
  useEffect(() => {
    load();
  }, [load]);

  // TODO 4: nếu có error → <ErrorBox message={error} onRetry={load} />
  if (error) {
    return <ErrorBox message={error} onRetry={load} />;
  }

  // TODO 5: nếu chưa có phone → <Loading />  (vòng xoay ActivityIndicator + chữ "Đang tải...")
  if (!phone) {
    return <Loading />;
  }

  return <SelectPhoneApp phone={phone} />;
}
