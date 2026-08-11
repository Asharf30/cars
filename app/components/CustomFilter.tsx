"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface CustomFilterProps {
  title: string;
  options: { title: string; value: string }[];
  paramKey: string;
}

const CustomFilter = ({ title, options, paramKey }: CustomFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentValue = searchParams.get(paramKey) || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(paramKey, value);
    } else {
      params.delete(paramKey);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <select
      value={currentValue}
      onChange={(e) => handleChange(e.target.value)}
      className="custom-filter__btn"
    >
      {options.map((opt) => (
        <option key={opt.title} value={opt.value}>
          {opt.title}
        </option>
      ))}
    </select>
  );
};

export default CustomFilter;