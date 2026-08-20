type ManufacturerLogo = {
  slug: string;
  color?: string;
};

const manufacturerLogos: Record<string, ManufacturerLogo> = {
  "Acura": { slug: "acura" },
  "Alfa Romeo": { slug: "alfaromeo" },
  "Aston Martin": { slug: "astonmartin" },
  "Audi": { slug: "audi", color: "#BB0A30" },
  "Bentley": { slug: "bentley" },
  "BMW": { slug: "bmw", color: "#0066B1" },
  "Bugatti": { slug: "bugatti" },
  "Buick": { slug: "buick" },
  "BYD": { slug: "byd" },
  "Cadillac": { slug: "cadillac" },
  "Changan": { slug: "changan" },
  "Chery": { slug: "chery" },
  "Chevrolet": { slug: "chevrolet" },
  "Chrysler": { slug: "chrysler" },
  "Citroen": { slug: "citroen" },
  "Cupra": { slug: "cupra" },
  "Dodge": { slug: "dodge" },
  "Ferrari": { slug: "ferrari", color: "#D40000" },
  "Fiat": { slug: "fiat" },
  "Ford": { slug: "ford", color: "#00274C" },
  "GAC": { slug: "gac" },
  "Geely": { slug: "geely" },
  "Genesis": { slug: "genesis" },
  "GMC": { slug: "gmc" },
  "Honda": { slug: "honda", color: "#E52D27" },
  "Hyundai": { slug: "hyundai", color: "#002C5F" },
  "Infiniti": { slug: "infiniti" },
  "Jaguar": { slug: "jaguar" },
  "Jeep": { slug: "jeep" },
  "Kia": { slug: "kia" },
  "Lamborghini": { slug: "lamborghini" },
  "Lancia": { slug: "lancia" },
  "Land Rover": { slug: "landrover" },
  "Lexus": { slug: "lexus" },
  "Lincoln": { slug: "lincoln" },
  "Lucid": { slug: "lucid" },
  "Maserati": { slug: "maserati" },
  "Mazda": { slug: "mazda" },
  "McLaren": { slug: "mclaren" },
  "Mercedes-Benz": { slug: "mercedes" },
  "Mercedes": { slug: "mercedes" },
  "MG": { slug: "mg" },
  "MINI": { slug: "mini" },
  "Mitsubishi": { slug: "mitsubishi", color: "#E60012" },
  "NIO": { slug: "nio" },
  "Nissan": { slug: "nissan" },
  "Opel": { slug: "opel" },
  "Peugeot": { slug: "peugeot" },
  "Polestar": { slug: "polestar" },
  "Porsche": { slug: "porsche" },
  "Ram": { slug: "ram" },
  "Renault": { slug: "renault" },
  "Rivian": { slug: "rivian" },
  "Rolls-Royce": { slug: "rollsroyce" },
  "SEAT": { slug: "seat" },
  "Skoda": { slug: "skoda" },
  "Subaru": { slug: "subaru" },
  "Suzuki": { slug: "suzuki" },
  "Tesla": { slug: "tesla", color: "#CC0000" },
  "Toyota": { slug: "toyota", color: "#EB0A1E" },
  "Volkswagen": { slug: "volkswagen", color: "#151F6D" },
  "VW": { slug: "volkswagen", color: "#151F6D" },
  "Volvo": { slug: "volvo", color: "#003057" },
  "Xiaomi": { slug: "xiaomi", color: "#FF6900" },
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

  return logo
    ? `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${logo.slug}.svg`
    : null;
};

export const getManufacturerBrandColor = (manufacturer: string): string | null =>
  getManufacturerLogo(manufacturer)?.color ?? null;
