// FALLBACK: static list for backward compatibility with SearchManufacturer.tsx.
// For dynamic, year-specific makes, use fetchManufacturers() below.
export const manufacturers = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "BYD",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Porsche",
  "Ram",
  "Rolls-Royce",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "Renault",
  "Opel",
  "Skoda",
  "SEAT",
  "Cupra",
  "Lancia",
  "Avatar",
  "Geely",
  "NIO",
  "Xiaomi",
  "Li Auto",
  "Changan",
  "Chery",
  "MG",
  "GAC",
];

// PRIMARY: fetches real makes for a given year from FuelEconomy.gov
export async function fetchManufacturers(year: string): Promise<string[]> {
  const { fetchMakes } = await import("../utlis");
  const items = await fetchMakes(year);
  return items.map((item) => item.text);
}

// FALLBACK: static list for immediate use before async fetch completes.
// For dynamic, always-current years, use fetchAvailableYears() below.
export const yearsOfProduction = [
  { title: "Year", value: "" },
  { title: "2015", value: "2015" },
  { title: "2016", value: "2016" },
  { title: "2017", value: "2017" },
  { title: "2018", value: "2018" },
  { title: "2019", value: "2019" },
  { title: "2020", value: "2020" },
  { title: "2021", value: "2021" },
  { title: "2022", value: "2022" },
  { title: "2023", value: "2023" },
];

// PRIMARY: fetches real year list from FuelEconomy.gov
export async function fetchAvailableYears(): Promise<{ title: string; value: string }[]> {
  const { fetchYears } = await import("../utlis");
  const items = await fetchYears();
  return [
    { title: "Year", value: "" },
    ...items.map((item) => ({ title: item.text, value: item.value })),
  ];
}

export const fuels = [
  { title: "Fuel", value: "" },
  { title: "Regular Gasoline", value: "Regular" },
  { title: "Premium Gasoline", value: "Premium" },
  { title: "Diesel", value: "Diesel" },
  { title: "Electricity", value: "Electricity" },
  { title: "Gasoline or E85", value: "Gasoline or E85" },
  { title: "CNG", value: "CNG" },
  { title: "Hydrogen", value: "Hydrogen" },
  { title: "Regular Gas and Electricity", value: "Regular Gas and Electricity" },
  { title: "Premium and Electricity", value: "Premium and Electricity" },
];

export const footerLinks = [
  {
    title: "About",
    links: [
      { title: "How it works", url: "/" },
      { title: "Featured", url: "/" },
      { title: "Partnership", url: "/" },
      { title: "Bussiness Relation", url: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Events", url: "/" },
      { title: "Blog", url: "/" },
      { title: "Podcast", url: "/" },
      { title: "Invite a friend", url: "/" },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Discord", url: "/" },
      { title: "Instagram", url: "/" },
      { title: "Twitter", url: "/" },
      { title: "Facebook", url: "/" },
    ],
  },
];
