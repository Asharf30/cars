"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CustomListbox from "./CustomListbox";

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

  const mappedOptions = options.map(opt => ({ text: opt.title, value: opt.value }));

  return (
    <div className="w-fit">
      <CustomListbox
        value={currentValue}
        options={mappedOptions}
        placeholder={title}
        onChange={handleChange}
        buttonClassName="custom-filter__btn"
      />
    </div>
  );
};

export default CustomFilter;