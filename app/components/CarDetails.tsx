"use client";

import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { motion, type Variants } from "framer-motion";
import { CarProps } from "../types";
import Image from "next/image";

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
    boxShadow: "0px 10px 24px rgba(0, 229, 255, 0.15)"
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
                    className="object-contain cursor-pointer"
                  />
                </button>
                <div className="car-details__media">
                  <div className="car-details__main-image">
                    <Image
                      src="/final2.png"
                      alt={`${car.make} ${car.model}`}
                      fill
                      priority
                      className="car-details__vehicle"
                      sizes="(max-width: 640px) min(70vw, 216px), 260px"
                    />
                  </div>
                  <div className="car-details__thumbnails">
                    {[0, 1, 2].map((thumbnailIndex) => (
                      <div className="car-details__thumbnail" key={thumbnailIndex}>
                        <Image
                          src="/final2.png"
                          alt=""
                          fill
                          className="car-details__thumbnail-image"
                          sizes="(max-width: 640px) calc((100vw - 104px) / 3), 136px"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="car-details__specifications"
                  initial="hidden"
                  animate={isOpen ? "visible" : "hidden"}
                  variants={specificationsAnimation}
                >
                  <motion.h2
                    className="car-details__title"
                    variants={specificationContentAnimation}
                  >
                    {car.make} {car.model}
                  </motion.h2>

                  <motion.dl
                    className="car-details__specification-list"
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
                          transition: { duration: 0.2, ease: "easeOut" }
                        }}
                      >
                        <dt>{label}</dt>
                        <dd>{car[key]}</dd>
                      </motion.div>
                    ))}
                  </motion.dl>
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
