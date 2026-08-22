"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { motion, type Variants } from "framer-motion";
import { CarProps } from "../types";
import Image from "next/image";
import ImageWithSkeleton from "./ImageWithSkeleton";
import { useCart } from "../contexts/CartContext";
import { getTotalCarPrice } from "../utlis";
import CustomButton from "./CustomButton";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const specificationLabels: { key: keyof CarProps; label: string }[] = [
  { key: "city_mpg", label: "City mpg" },
  { key: "class", label: "Class" },
  { key: "combination_mpg", label: "Combination mpg" },
  { key: "cylinders", label: "Cylinders" },
  { key: "displacement", label: "Displacement" },
  { key: "drive", label: "Drive" },
  { key: "fuel_type", label: "Fuel type" },
  { key: "highway_mpg", label: "Highway mpg" },
  { key: "make", label: "Make" },
  { key: "model", label: "Model" },
  { key: "transmission", label: "Transmission" },
  { key: "year", label: "Year" },
];

const specificationsAnimation: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.06, staggerChildren: 0.05 } },
};

const specificationListAnimation: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const specificationContentAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.94,
    filter: "blur(4px)",
    boxShadow: "0px 10px 24px rgba(0, 229, 255, 0.15)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    boxShadow: "0px 0px 0px rgba(0, 229, 255, 0)",
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  const detailImageUrls = car.imageUrls?.length
    ? car.imageUrls
    : [car.imageUrl || "/final2.png"];
  const [mainImageUrl, setMainImageUrl] = useState(detailImageUrls[0]);
  const secondaryImageUrls = detailImageUrls.slice(1);

  const { cartItems, addToCart, updateQuantity, isMounted } = useCart();

  // Find if car is already in cart
  const cartItem = cartItems.find((item) => item.id === car.id);
  const isInCart = !!cartItem;

  const handleAddToCart = () => {
    addToCart({
      id: car.id,
      make: car.make,
      model: car.model,
      year: car.year,
      imageUrl: car.imageUrl || null,
      price: getTotalCarPrice(car),
      quantity: 1,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 car-details__backdrop" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-6">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-3 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-2 scale-95"
            >
              <DialogPanel className="car-details__dialog-panel">
                <button
                  type="button"
                  onClick={closeModal}
                  className="car-details__close-btn"
                  aria-label="Close car details"
                >
                  <Image
                    src="/close.svg"
                    width={24}
                    alt="close"
                    height={24}
                    className="object-contain cursor-pointer "
                  />
                </button>
                <div className="car-details__media">
                  <div className="car-details__main-image">
                    <ImageWithSkeleton
                      key={mainImageUrl}
                      src={mainImageUrl}
                      alt={`${car.make} ${car.model}`}
                      fill
                      priority
                      className="car-details__vehicle"
                      style={car.imageColorFilter && car.imageColorFilter !== "none" ? { filter: car.imageColorFilter } : undefined}
                      sizes="(max-width: 640px) min(70vw, 216px), 260px"
                      fallbackSrc="/final2.png"
                    />
                  </div>
                  <div className="car-details__thumbnails">
                    {secondaryImageUrls.map((imageUrl, thumbnailIndex) => (
                      <button
                        type="button"
                        className={`car-details__thumbnail ${mainImageUrl === imageUrl ? "car-details__thumbnail--active" : ""}`}
                        key={imageUrl}
                        onClick={() => setMainImageUrl(imageUrl)}
                        aria-label={`Show ${car.make} ${car.model} view ${thumbnailIndex + 2}`}
                      >
                        <ImageWithSkeleton
                          src={imageUrl}
                          alt={`${car.make} ${car.model} view ${thumbnailIndex + 2}`}
                          fill
                          className="car-details__thumbnail-image"
                          style={car.imageColorFilter && car.imageColorFilter !== "none" ? { filter: car.imageColorFilter } : undefined}
                          sizes="(max-width: 640px) calc((100vw - 104px) / 3), 136px"
                          fallbackSrc="/final2.png"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="car-details__specifications flex flex-col justify-between h-full"
                  initial="hidden"
                  animate={isOpen ? "visible" : "hidden"}
                  variants={specificationsAnimation}
                >
                  <div>
                    <motion.div
                      className="flex items-center gap-3"
                      variants={specificationContentAnimation}
                    >
                      <h2 className="car-details__title min-w-0">
                        {car.make} {car.model}
                      </h2>
                    </motion.div>

                    <motion.dl
                      className="car-details__specification-list mt-4"
                      variants={specificationListAnimation}
                    >
                      {specificationLabels.map(({ key, label }) => (
                        <motion.div
                          className="car-details__specification"
                          key={key}
                          variants={specificationContentAnimation}
                          whileHover={{
                            y: -3,
                            scale: 1.02,
                            boxShadow: "0px 6px 16px rgba(0, 229, 255, 0.12)",
                            borderColor: "rgba(0, 229, 255, 0.3)",
                            transition: { duration: 0.2, ease: "easeOut" },
                          }}
                        >
                          <dt>{label}</dt>
                          <dd>{car[key]}</dd>
                        </motion.div>
                      ))}
                    </motion.dl>
                  </div>

                  {isMounted && (
                    <motion.div
                      className="mt-6 w-full"
                      variants={specificationContentAnimation}
                    >
                      {isInCart && cartItem ? (
                        <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(0,229,255,0.08)] border border-[var(--color-neon-cyan)] shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                          <span className="text-sm font-bold text-white flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-[var(--color-neon-cyan)]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Added to Cart
                          </span>
                          <div className="flex items-center gap-3 bg-[#0f0518] rounded-lg p-1 border border-[rgba(0,229,255,0.2)]">
                            <button
                              type="button"
                              disabled={cartItem.quantity <= 1}
                              onClick={() =>
                                updateQuantity(car.id, cartItem.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center rounded text-[var(--color-neon-cyan)] hover:bg-[rgba(0,229,255,0.15)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors font-bold text-lg"
                            >
                              -
                            </button>
                            <span className="text-base font-bold w-6 text-center text-white">
                              {cartItem.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(car.id, cartItem.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center rounded text-[var(--color-neon-cyan)] hover:bg-[rgba(0,229,255,0.15)] transition-colors font-bold text-lg"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ) : (
                        <CustomButton
                          title="Add to Cart"
                          continerStyles="w-full min-h-[48px] rounded-xl border border-[#F5A623] bg-[var(--color-neon-amber)] px-5 py-3 text-white font-bold shadow-[0_10px_24px_rgba(245,166,35,0.24)] hover:bg-[#D97706] hover:shadow-[0_14px_30px_rgba(245,166,35,0.36)]"
                          handelClick={handleAddToCart}
                        />
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CarDetails;
