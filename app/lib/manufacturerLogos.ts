export type ManufacturerLogo = {
  slug: string;
  source: "simple-icons" | "local";
  color?: string;
};

const manufacturerLogos: Record<string, ManufacturerLogo> = {
  "Acura": { slug: "acura", source: "simple-icons" },
  "Alfa Romeo": { slug: "alfa-romeo", source: "local" },
  "Aston Martin": { slug: "astonmartin", source: "simple-icons" },
  "Audi": { slug: "audi", source: "simple-icons", color: "#BB0A30" },
  "Bentley": { slug: "bentley", source: "simple-icons" },
  "BMW": { slug: "bmw", source: "simple-icons", color: "#0066B1" },
  "Bugatti": { slug: "bugatti", source: "simple-icons" },
  "Buick": { slug: "buick", source: "local" },
  "BYD": { slug: "byd", source: "local" },
  "Cadillac": { slug: "cadillac", source: "simple-icons" },
  "Changan": { slug: "changan", source: "local" },
  "Chery": { slug: "chery", source: "local" },
  "Chevrolet": { slug: "chevrolet", source: "simple-icons" },
  "Chrysler": { slug: "chrysler", source: "simple-icons" },
  "Citroen": { slug: "citroen", source: "simple-icons" },
  "Cupra": { slug: "cupra", source: "local" },
  "Dodge": { slug: "dodge", source: "local" },
  "Ferrari": { slug: "ferrari", source: "simple-icons", color: "#D40000" },
  "Fiat": { slug: "fiat", source: "simple-icons" },
  "Ford": { slug: "ford", source: "simple-icons", color: "#00274C" },
  "GAC": { slug: "gac", source: "local" },
  "Geely": { slug: "geely", source: "local" },
  "Genesis": { slug: "genesis", source: "simple-icons" },
  "GMC": { slug: "gmc", source: "local" },
  "Honda": { slug: "honda", source: "simple-icons", color: "#E52D27" },
  "Hyundai": { slug: "hyundai", source: "simple-icons", color: "#002C5F" },
  "Infiniti": { slug: "infiniti", source: "simple-icons" },
  "Jaguar": { slug: "jaguar", source: "local" },
  "Jeep": { slug: "jeep", source: "simple-icons" },
  "Kia": { slug: "kia", source: "simple-icons" },
  "Lamborghini": { slug: "lamborghini", source: "simple-icons" },
  "Lancia": { slug: "lancia", source: "local" },
  "Land Rover": { slug: "land-rover", source: "local" },
  "Lexus": { slug: "lexus", source: "local" },
  "Lincoln": { slug: "lincoln", source: "local" },
  "Lucid": { slug: "lucid", source: "simple-icons" },
  "Maserati": { slug: "maserati", source: "simple-icons" },
  "Mazda": { slug: "mazda", source: "simple-icons" },
  "McLaren": { slug: "mclaren", source: "simple-icons" },
  "Mercedes-Benz": { slug: "mercedes-benz", source: "local" },
  "Mercedes": { slug: "mercedes-benz", source: "local" },
  "MG": { slug: "mg", source: "simple-icons" },
  "MINI": { slug: "mini", source: "simple-icons" },
  "Mitsubishi": { slug: "mitsubishi", source: "simple-icons", color: "#E60012" },
  "NIO": { slug: "nio", source: "local" },
  "Nissan": { slug: "nissan", source: "simple-icons" },
  "Opel": { slug: "opel", source: "simple-icons" },
  "Peugeot": { slug: "peugeot", source: "simple-icons" },
  "Polestar": { slug: "polestar", source: "simple-icons" },
  "Porsche": { slug: "porsche", source: "simple-icons" },
  "Ram": { slug: "ram", source: "simple-icons" },
  "Renault": { slug: "renault", source: "simple-icons" },
  "Rivian": { slug: "rivian", source: "simple-icons" },
  "Rolls-Royce": { slug: "rollsroyce", source: "simple-icons" },
  "SEAT": { slug: "seat", source: "simple-icons" },
  "Skoda": { slug: "skoda", source: "simple-icons" },
  "Subaru": { slug: "subaru", source: "simple-icons" },
  "Suzuki": { slug: "suzuki", source: "simple-icons" },
  "Tesla": { slug: "tesla", source: "simple-icons", color: "#CC0000" },
  "Toyota": { slug: "toyota", source: "simple-icons", color: "#EB0A1E" },
  "Volkswagen": { slug: "volkswagen", source: "simple-icons", color: "#151F6D" },
  "VW": { slug: "volkswagen", source: "simple-icons", color: "#151F6D" },
  "Volvo": { slug: "volvo", source: "simple-icons", color: "#003057" },
  "Xiaomi": { slug: "xiaomi", source: "simple-icons", color: "#FF6900" },
  "Avatar": { slug: "avatar", source: "local" },
  "Li Auto": { slug: "li-auto", source: "local" }
};

const normalizeManufacturer = (manufacturer: string) =>
  manufacturer.toLowerCase().replace(/[^a-z0-9]/g, "");

const normalizedManufacturerLogos = new Map(
  Object.entries(manufacturerLogos).map(([manufacturer, logo]) => [
    normalizeManufacturer(manufacturer),
    logo,
  ]),
);

export const getManufacturerLogo = (manufacturer: string): ManufacturerLogo | null => {
  const trimmedManufacturer = manufacturer.trim();
  if (!trimmedManufacturer) return null;

  return (
    manufacturerLogos[trimmedManufacturer] ??
    normalizedManufacturerLogos.get(normalizeManufacturer(trimmedManufacturer)) ??
    null
  );
};

export const getManufacturerIconUrl = (manufacturer: string): string | null => {
  const logo = getManufacturerLogo(manufacturer);

  if (!logo) return null;
  
  if (logo.source === "local") {
    return `/logos/${logo.slug}.svg`;
  }
  return `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${logo.slug}.svg`;
};

export const getLocalFallbackUrl = (manufacturer: string): string | null => {
  const logo = getManufacturerLogo(manufacturer);
  if (logo) {
    return `/logos/${logo.slug}.svg`;
  }
  return null;
};

export const isSimpleIconsSource = (manufacturer: string): boolean => {
  const logo = getManufacturerLogo(manufacturer);
  return logo?.source === "simple-icons";
};

export const getManufacturerBrandColor = (manufacturer: string): string | null =>
  getManufacturerLogo(manufacturer)?.color ?? null;
