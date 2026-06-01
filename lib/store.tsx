"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById, type Product } from "./catalog";

export type CartLine = {
  key: string; // unique per product + engraving
  product: Product;
  qty: number;
  engraving?: string;
  lineTotal: number;
};

type CartItem = { id: string; qty: number; engraving?: string };
type State = { cart: CartItem[]; wishlist: string[]; recent: string[] };

type StoreValue = {
  hydrated: boolean;
  cart: CartLine[];
  cartCount: number;
  subtotal: number;
  addToCart: (id: string, qty?: number, engraving?: string) => void;
  removeFromCart: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  wishlist: Product[];
  wishlistCount: number;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  appointmentOpen: boolean;
  openAppointment: () => void;
  closeAppointment: () => void;
  pushRecent: (id: string) => void;
  recentProducts: (excludeId?: string) => Product[];
};

const KEY = "rogue-store-v1";
const StoreCtx = createContext<StoreValue | null>(null);

const lineKey = (i: CartItem) => `${i.id}|${i.engraving ?? ""}`;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({
    cart: [],
    wishlist: [],
    recent: [],
  });
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openAppointment = useCallback(() => setAppointmentOpen(true), []);
  const closeAppointment = useCallback(() => setAppointmentOpen(false), []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = JSON.parse(raw) as Partial<State>;
        setState({
          cart: Array.isArray(p.cart) ? p.cart : [],
          wishlist: Array.isArray(p.wishlist) ? p.wishlist : [],
          recent: Array.isArray(p.recent) ? p.recent : [],
        });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const addToCart = useCallback(
    (id: string, qty = 1, engraving?: string) => {
      const clean = engraving?.trim() || undefined;
      setState((s) => {
        const k = lineKey({ id, qty, engraving: clean });
        const existing = s.cart.find((c) => lineKey(c) === k);
        const cart = existing
          ? s.cart.map((c) =>
              lineKey(c) === k ? { ...c, qty: c.qty + qty } : c
            )
          : [...s.cart, { id, qty, engraving: clean }];
        return { ...s, cart };
      });
      setCartOpen(true);
    },
    []
  );

  const removeFromCart = useCallback((key: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((c) => lineKey(c) !== key) }));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setState((s) => ({
      ...s,
      cart:
        qty <= 0
          ? s.cart.filter((c) => lineKey(c) !== key)
          : s.cart.map((c) => (lineKey(c) === key ? { ...c, qty } : c)),
    }));
  }, []);

  const clearCart = useCallback(() => setState((s) => ({ ...s, cart: [] })), []);

  const toggleWishlist = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      wishlist: s.wishlist.includes(id)
        ? s.wishlist.filter((w) => w !== id)
        : [...s.wishlist, id],
    }));
  }, []);

  const pushRecent = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      recent: [id, ...s.recent.filter((r) => r !== id)].slice(0, 8),
    }));
  }, []);

  const cart = useMemo<CartLine[]>(() => {
    const lines: CartLine[] = [];
    for (const c of state.cart) {
      const product = getProductById(c.id);
      if (product) {
        lines.push({
          key: lineKey(c),
          product,
          qty: c.qty,
          engraving: c.engraving,
          lineTotal: product.price * c.qty,
        });
      }
    }
    return lines;
  }, [state.cart]);

  const cartCount = useMemo(
    () => state.cart.reduce((n, c) => n + c.qty, 0),
    [state.cart]
  );
  const subtotal = useMemo(
    () => cart.reduce((s, l) => s + l.lineTotal, 0),
    [cart]
  );

  const wishlist = useMemo<Product[]>(
    () =>
      state.wishlist
        .map(getProductById)
        .filter((p): p is Product => p !== undefined),
    [state.wishlist]
  );

  const isWishlisted = useCallback(
    (id: string) => state.wishlist.includes(id),
    [state.wishlist]
  );

  const recentProducts = useCallback(
    (excludeId?: string) =>
      state.recent
        .filter((id) => id !== excludeId)
        .map(getProductById)
        .filter((p): p is Product => p !== undefined),
    [state.recent]
  );

  const value: StoreValue = {
    hydrated,
    cart,
    cartCount,
    subtotal,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    wishlist,
    wishlistCount: wishlist.length,
    toggleWishlist,
    isWishlisted,
    cartOpen,
    openCart,
    closeCart,
    appointmentOpen,
    openAppointment,
    closeAppointment,
    pushRecent,
    recentProducts,
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used within <StoreProvider>");
  return ctx;
}
