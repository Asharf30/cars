"use client";

import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import ImageWithSkeleton from "./ImageWithSkeleton";
import CustomButton from "./CustomButton";

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isMounted,
  } = useCart();

  if (!isMounted) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <Transition appear show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#0f0518]/60 backdrop-blur-sm" />
        </TransitionChild>

        {/* Drawer container */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-y-0 right-0 flex max-w-full">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              {/*
                Drawer panel: fixed width on desktop, full width on mobile.
                flex flex-col h-full ensures header + scroll area + footer stack properly.
              */}
              <DialogPanel className="w-[90vw] sm:w-[420px] lg:w-[460px] flex flex-col h-full bg-[#1a0b2e] border-l border-[rgba(0,229,255,0.2)] shadow-[0_0_40px_rgba(0,0,0,0.5)] text-[#e0fbfc]">
                {/* ── HEADER ── shrink-0 keeps it always visible */}
                <div className="shrink-0 flex items-center justify-between px-6 py-5 border-b border-[rgba(0,229,255,0.1)]">
                  <DialogTitle className="text-xl font-bold flex items-center gap-2.5">
                    Your Cart
                    {totalItems > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-[var(--color-neon-cyan)] text-[#0f0518] text-xs font-bold">
                        {totalItems}
                      </span>
                    )}
                  </DialogTitle>
                  <button
                    type="button"
                    className="flex items-center justify-center w-9 h-9 rounded-lg text-[#a69cac] hover:text-[var(--color-neon-cyan)] hover:bg-[rgba(0,229,255,0.08)] transition-colors"
                    onClick={closeCart}
                    aria-label="Close cart"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* ── SCROLLABLE CART ITEMS ── flex-1 lets this region fill available space */}
                <div className="flex-1 overflow-y-auto neon-scrollbar">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[#a69cac] gap-4 py-16">
                      <svg
                        className="w-16 h-16 opacity-40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <p className="text-base font-medium">
                        Your cart is empty
                      </p>
                    </div>
                  ) : (
                    <ul className="px-5 py-5 flex flex-col gap-4">
                      <AnimatePresence>
                        {cartItems.map((item) => (
                          <motion.li
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-2xl bg-[rgba(15,5,24,0.7)] border border-[rgba(0,229,255,0.1)] hover:border-[rgba(0,229,255,0.28)] transition-colors overflow-hidden"
                          >
                            {/*
                              Item inner layout uses a 3-column grid:
                              [image 80px] [car info, grows] [total+delete 148px]
                              This keeps the total column fixed-width and flush-right
                              while the middle column grows/shrinks freely.
                            */}
                            <div className="grid grid-cols-[80px_minmax(0,1fr)_148px] gap-3 p-4">
                              {/* Column 1 — Image */}
                              <div className="relative h-[72px] w-[80px] rounded-xl overflow-hidden bg-[#0f0518] border border-[rgba(255,255,255,0.06)] self-center">
                                <ImageWithSkeleton
                                  src={item.imageUrl || "/final2.png"}
                                  alt={`${item.make} ${item.model}`}
                                  fill
                                  className="object-contain p-1.5"
                                  fallbackSrc="/final2.png"
                                />
                              </div>

                              {/* Column 2 — Car info + quantity */}
                              <div className="flex flex-col justify-between min-w-0 py-0.5">
                                <div className="min-w-0">
                                  <h3 className="font-semibold text-sm capitalize leading-snug text-[#e0fbfc] line-clamp-2">
                                    {item.make} {item.model}
                                  </h3>
                                  <p className="text-xs text-[#a69cac] mt-0.5">
                                    {item.year}
                                  </p>
                                </div>

                                {/* Quantity selector */}
                                <div className="inline-flex items-center mt-3 bg-[#0f0518] rounded-lg border border-[rgba(0,229,255,0.15)] self-start">
                                  <button
                                    type="button"
                                    disabled={item.quantity <= 1}
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="w-8 h-8 flex items-center justify-center text-[var(--color-neon-cyan)] hover:bg-[rgba(0,229,255,0.1)] disabled:opacity-30 disabled:hover:bg-transparent rounded-l-lg transition-colors text-base cursor-pointer font-medium"
                                  >
                                    −
                                  </button>
                                  <span className="w-8 text-center text-sm font-semibold text-[#e0fbfc]">
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="w-8 h-8 flex items-center justify-center text-[var(--color-neon-cyan)] hover:bg-[rgba(0,229,255,0.1)] rounded-r-lg transition-colors  cursor-pointer text-base font-medium"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              {/* Column 3 — total + Delete */}
                              <div className="flex min-w-0 flex-col items-end justify-between gap-3 py-2 pr-3">
                                {/* Delete at top-right */}
                                <motion.button
                                  type="button"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => removeFromCart(item.id)}
                                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-[#a69cac] transition-colors hover:bg-[rgba(245,166,35,0.1)] hover:text-[var(--color-neon-amber)]"
                                  aria-label="Remove item"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </motion.button>

                                {/* total at bottom-right */}
                                <div className="cart-drawer__total">
                                  <p className="text-[10px] uppercase leading-none tracking-widest text-[#a69cac]">
                                    total
                                  </p>
                                  <p className="text-sm font-bold leading-none text-[var(--color-neon-cyan)]">
                                    $
                                    {(
                                      item.price * item.quantity
                                    ).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}
                </div>

                {/* ── FOOTER ── shrink-0 keeps it always anchored at the bottom */}
                {cartItems.length > 0 && (
                  <div className="shrink-0 px-6 py-5 border-t border-[rgba(0,229,255,0.12)] bg-[rgba(15,5,24,0.6)]">
                    {/* Total row */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[#a69cac] font-medium text-base">
                        Total Price
                      </span>
                      <span className="text-xl font-extrabold text-white tracking-tight">
                        ${totalPrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Button row */}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={clearCart}
                        className="flex-1 h-11 flex items-center justify-center rounded-xl border cursor-pointer 
                        border-[rgba(245,166,35,0.5)] text-[#a69cac] text-sm font-semibold hover:bg-[rgba(245,166,35,0.1)] hover:text-white transition-colors"
                      >
                        Clear Cart
                      </button>
                      <CustomButton
                        title="Checkout"
                        continerStyles="flex-[2] h-11 rounded-xl border border-[#F5A623] bg-[var(--color-neon-amber)] text-white text-sm font-bold shadow-[0_10px_24px_rgba(245,166,35,0.24)] hover:bg-[#D97706] hover:shadow-[0_14px_30px_rgba(245,166,35,0.36)]"
                        handelClick={closeCart}
                      />
                    </div>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CartDrawer;
