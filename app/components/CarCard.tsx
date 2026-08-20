"use client";
import { useState } from "react";
import ImageWithSkeleton from "./ImageWithSkeleton";
import { CarProps } from "../types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";
import { getRentalPrice, getTotalCarPrice } from "../utlis";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, make, model, transmission, imageUrl } = car;
  const { dailyPrice, hourlyPrice } = getRentalPrice(car);
  const totalPrice = getTotalCarPrice(car);
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(imageUrl || "/hero.png");

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2>
          {make} {model}
        </h2>
      </div>
      <div className="mt-6  flex w-fit flex-col">
        <p className="flex items-center text-[32px] font-extrabold">
          {city_mpg} MPG
          <span className="self-end mb-6 text-[12px] text-gray-400">/day</span>
          <svg
            className="ml-8 text-blue-500"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </p>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[14px] text-gray-400">
        <svg
          className="text-blue-500"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" x2="15" y1="22" y2="22"></line>
          <line x1="4" x2="14" y1="9" y2="9"></line>
          <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"></path>
          <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"></path>
        </svg>
        <p>Fuel consumption per day</p>
      </div>
      <div className="w-full relative h-40 my-3 object-contain">
        <ImageWithSkeleton
          key={imgSrc}
          src={imgSrc}
          fill
          priority
          className="object-contain"
          alt={`${make} ${model}`}
          fallbackSrc="/hero.png"
          onError={() => setImgSrc("/hero.png")}
        />
      </div>{" "}
      <div className="flex relative w-full mt-2">
        <div className=" flex group-hover:invisible w-full justify-between text-gray-50">
          <div className="flex flex-col justify-center items-center gap-2 ">
            <ImageWithSkeleton
              src="/steering-wheel.svg"
              alt="Steering Wheel"
              width={20}
              height={20}
            />
            <p className="text-[14px] ">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 ">
            <svg
              className="text-blue-500"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            <p className="text-[14px] font-semibold text-white">
              ${totalPrice.toLocaleString()}
            </p>
            <p className="text-[12px] text-gray-400">Total Price</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2 ">
            <svg
              className="text-blue-500"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20" />
              <path d="M17 5H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H7" />
            </svg>
            <p className="text-[20px] font-semibold text-white">
              ${dailyPrice}/day
            </p>
            <p className="text-[14px] text-gray-400">${hourlyPrice}/hr</p>
          </div>
        </div>
        <div className="car-card__btn-container">
          <CustomButton
            title="View More"
            continerStyles="w-full min-h-12 rounded-xl border border-[#C45AFF] bg-[var(--color-neon-violet)] px-5 py-[16px] text-white font-bold shadow-[0_10px_24px_rgba(176,38,255,0.24)] hover:bg-[#C34AFF] hover:shadow-[0_14px_30px_rgba(176,38,255,0.36)]"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handelClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;

