"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";

const ResetFiltersButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filterKeys = ["year", "make", "model", "fuel"];
  const activeFilters = filterKeys.some((key) => searchParams.has(key));

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Clear only our known filter keys
    filterKeys.forEach((key) => params.delete(key));

    const newQuery = params.toString();
    const newPath = newQuery ? `${pathname}?${newQuery}` : pathname;
    
    // Use the same update mechanism with scroll: false to prevent jumping
    router.push(newPath, { scroll: false });
  };

  return (
    <motion.button
      onClick={handleReset}
      disabled={!activeFilters}
      whileHover={activeFilters ? { scale: 1.05 } : {}}
      whileTap={activeFilters ? { scale: 0.95 } : {}}
      className={`
        relative inline-flex items-center justify-center p-2 rounded-full
        transition-[background-color,border-color,color,box-shadow,opacity] duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neon-cyan)]
        focus-visible:ring-offset-2 focus-visible:ring-offset-primary-blue-100
        border bg-primary-blue-100 text-black-100
        h-[40px] w-[40px]
        ${
          !activeFilters
            ? "opacity-40 cursor-not-allowed border-[color-mix(in_srgb,var(--color-neon-cyan)_10%,transparent)]"
            : "cursor-pointer border-[color-mix(in_srgb,var(--color-neon-cyan)_20%,transparent)] hover:border-[color-mix(in_srgb,var(--color-neon-cyan)_50%,transparent)] hover:shadow-[0_0_12px_color-mix(in_srgb,var(--color-neon-cyan)_40%,transparent)]"
        }
      `}
      title="Reset Filters"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </motion.button>
  );
};

export default ResetFiltersButton;
