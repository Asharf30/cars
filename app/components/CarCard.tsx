"use client";
import { useState } from "react";
import Image from "next/image";
import { CarProps } from "../types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
}

const getRentalPrice = ({
  year,
  city_mpg,
  transmission,
  drive,
  fuel_type,
  make,
  class: carClass,
  cylinders,
  displacement,
}: CarProps) => {
  const makeFactor = [
    "bmw",
    "mercedes",
    "audi",
    "tesla",
    "porsche",
    "lexus",
  ].includes(make.toLowerCase())
    ? 1.22
    : ["toyota", "honda", "hyundai", "kia", "nissan", "ford"].includes(
          make.toLowerCase(),
        )
      ? 0.96
      : 1.08;

  const classFactor = carClass.toLowerCase().includes("suv")
    ? 1.14
    : carClass.toLowerCase().includes("truck") ||
        carClass.toLowerCase().includes("pickup")
      ? 1.18
      : carClass.toLowerCase().includes("sport") ||
          carClass.toLowerCase().includes("coupe")
        ? 1.12
        : carClass.toLowerCase().includes("hybrid")
          ? 1.02
          : 1;

  const yearFactor = year >= 2020 ? 1.1 : year >= 2018 ? 1.03 : 0.95;
  const mpgFactor = Number(city_mpg) >= 30 ? 0.95 : 1.05;
  const cylinderFactor = cylinders >= 8 ? 1.12 : cylinders === 6 ? 1.05 : 0.95;
  const displacementFactor =
    displacement >= 3.5 ? 1.08 : displacement >= 2.5 ? 1.02 : 0.95;
  const transmissionFactor = transmission === "a" ? 1.06 : 0.98;
  const driveFactor = drive === "fwd" ? 0.97 : drive === "awd" ? 1.08 : 1.02;
  const fuelFactor =
    fuel_type === "electric" ? 0.92 : fuel_type === "hybrid" ? 0.97 : 1;

  const dailyPrice = Math.max(
    25,
    Math.round(
      40 *
        makeFactor *
        classFactor *
        yearFactor *
        mpgFactor *
        cylinderFactor *
        displacementFactor *
        transmissionFactor *
        driveFactor *
        fuelFactor,
    ),
  );
  const hourlyPrice = Math.max(8, Math.round(dailyPrice / 6));

  return { dailyPrice, hourlyPrice };
};

const CarCard = ({ car }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive, fuel_type } = car;
  const { dailyPrice, hourlyPrice } = getRentalPrice(car);
  const [isOpen, setIsOpen] = useState(false);

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
        <Image
          src="/hero.png"
          fill
          priority
          className="object-contain"
          alt="Car"
        />
      </div>{" "}
      <div className="flex relative w-full mt-2">
        <div className=" flex group-hover:invisible w-full justify-between text-gray-50">
          <div className="flex flex-col justify-center items-center gap-2 ">
            <Image
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
            <Image src="/tire.svg" alt="Tire" width={20} height={20} />
            <p className="text-[14px] ">{drive.toUpperCase()}</p>
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
            continerStyles="w-full py-[16px] rounded-full"
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
