"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../contexts/CartContext";

const CartIcon = () => {
  const { cartItems, isMounted, toggleCart } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.button
      type="button"
      onClick={toggleCart}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[rgba(0,229,255,0.38)] bg-[rgba(15,5,24,0.58)] text-[#E0FBFC] shadow-[0_6px_18px_rgba(0,0,0,0.20)] transition-colors duration-200 hover:border-[var(--color-neon-cyan)] hover:bg-[rgba(0,229,255,0.10)] hover:text-white hover:shadow-[0_8px_22px_rgba(0,229,255,0.18)]"
      aria-label="Open Cart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="h-6 w-6 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      {isMounted && totalItems > 0 && (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={totalItems} // Key change forces re-render/animation
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] rounded-full bg-[var(--color-neon-amber)] text-white text-xs font-bold px-1"
          >
            {totalItems}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.button>
  );
};

export default CartIcon;
