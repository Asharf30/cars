import { CarProps } from "../types";

// ─── Constants ───────────────────────────────────────────────────
const BASE_URL = "https://www.fueleconomy.gov/ws/rest/vehicle";
const JSON_HEADERS = { Accept: "application/json" };

// ─── In-Memory Cache ─────────────────────────────────────────────
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// ─── Menu-item normalization ─────────────────────────────────────
// FuelEconomy.gov XML-to-JSON serializer returns menuItem as
// array OR single object depending on result count
export interface MenuItem {
  text: string;
  value: string;
}

function normalizeMenuItems(
  data: { menuItem?: MenuItem | MenuItem[] } | null,
): MenuItem[] {
  if (!data || !data.menuItem) return [];
  return Array.isArray(data.menuItem) ? data.menuItem : [data.menuItem];
}

// ─── Safe numeric parsing (EV edge cases) ────────────────────────
function safeParseInt(value: unknown, fallback: number): number {
  if (value === null || value === undefined || value === "") return fallback;
  const parsed = parseInt(String(value), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function safeParseFloat(value: unknown, fallback: number): number {
  if (value === null || value === undefined || value === "") return fallback;
  const parsed = parseFloat(String(value));
  return Number.isNaN(parsed) ? fallback : parsed;
}

// ─── Shared fetch helper ─────────────────────────────────────────
async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { headers: JSON_HEADERS });
    if (!response.ok) {
      console.error(`FuelEconomy API error: ${response.status} for ${url}`);
      return null;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(`FuelEconomy API fetch failed for ${url}:`, error);
    return null;
  }
}

// ─── Step 1: Get Available Years ─────────────────────────────────
export async function fetchYears(): Promise<MenuItem[]> {
  const cacheKey = "years";
  const cached = getCached<MenuItem[]>(cacheKey);
  if (cached) return cached;

  const data = await fetchJson<{ menuItem?: MenuItem | MenuItem[] }>(
    `${BASE_URL}/menu/year`,
  );
  const items = normalizeMenuItems(data);
  if (items.length > 0) setCache(cacheKey, items);
  return items;
}

// ─── Step 2: Get Makes for a Year ────────────────────────────────
export async function fetchMakes(year: string): Promise<MenuItem[]> {
  const cacheKey = `makes:${year}`;
  const cached = getCached<MenuItem[]>(cacheKey);
  if (cached) return cached;

  const data = await fetchJson<{ menuItem?: MenuItem | MenuItem[] }>(
    `${BASE_URL}/menu/make?year=${encodeURIComponent(year)}`,
  );
  const items = normalizeMenuItems(data);
  if (items.length > 0) setCache(cacheKey, items);
  return items;
}

// ─── Step 3: Get Models for a Year + Make ────────────────────────
export async function fetchModels(
  year: string,
  make: string,
): Promise<MenuItem[]> {
  const cacheKey = `models:${year}:${make}`;
  const cached = getCached<MenuItem[]>(cacheKey);
  if (cached) return cached;

  const data = await fetchJson<{ menuItem?: MenuItem | MenuItem[] }>(
    `${BASE_URL}/menu/model?year=${encodeURIComponent(year)}&make=${encodeURIComponent(make)}`,
  );
  const items = normalizeMenuItems(data);
  if (items.length > 0) setCache(cacheKey, items);
  return items;
}

// ─── Step 4: Get Vehicle Option IDs ──────────────────────────────
export async function fetchOptions(
  year: string,
  make: string,
  model: string,
): Promise<MenuItem[]> {
  const cacheKey = `options:${year}:${make}:${model}`;
  const cached = getCached<MenuItem[]>(cacheKey);
  if (cached) return cached;

  const data = await fetchJson<{ menuItem?: MenuItem | MenuItem[] }>(
    `${BASE_URL}/menu/options?year=${encodeURIComponent(year)}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`,
  );
  const items = normalizeMenuItems(data);
  if (items.length > 0) setCache(cacheKey, items);
  return items;
}

// ─── Step 5: Get Vehicle Details by ID ───────────────────────────
export async function fetchVehicleById(id: number): Promise<CarProps | null> {
  const cacheKey = `vehicle:${id}`;
  const cached = getCached<CarProps>(cacheKey);
  if (cached) return cached;

  const raw = await fetchJson<Record<string, unknown>>(`${BASE_URL}/${id}`);
  if (!raw) return null;

  const car = mapVehicleResponse(raw, id);
  setCache(cacheKey, car);
  return car;
}

// ─── Field Mapping / Normalization ───────────────────────────────
function mapVehicleResponse(
  raw: Record<string, unknown>,
  id: number,
): CarProps {
  return {
    id,
    year: safeParseInt(raw.year, 0),
    make: String(raw.make ?? ""),
    model: String(raw.model ?? ""),
    class: String(raw.VClass ?? ""),
    cylinders: safeParseInt(raw.cylinders, 0),
    displacement: safeParseFloat(raw.displ, 0),
    drive: String(raw.drive ?? ""),
    fuel_type: String(raw.fuelType ?? ""),
    transmission: String(raw.trany ?? ""),
    city_mpg: safeParseInt(raw.city08, 0),
    highway_mpg: safeParseInt(raw.highway08, 0),
    combination_mpg: safeParseInt(raw.comb08, 0),
  };
}

// ─── Composite Fetch (main entry point) ──────────────────────────
export async function fetchCars(
  year?: string,
  make?: string,
  model?: string,
): Promise<CarProps[]> {
  try {
    // Resolve year: use latest available if not provided
    let resolvedYear = year;
    if (!resolvedYear) {
      const years = await fetchYears();
      if (years.length === 0) return [];
      resolvedYear = years[0].value; // API returns years descending
    }

    // Resolve make: use first available if not provided
    let resolvedMake = make;
    if (!resolvedMake) {
      const makes = await fetchMakes(resolvedYear);
      if (makes.length === 0) return [];
      resolvedMake = makes[0].value;
    }

    // If no model specified, get all models for the year+make
    const modelsList = model
      ? [{ text: model, value: model }]
      : await fetchModels(resolvedYear, resolvedMake);

    if (modelsList.length === 0) return [];

    // For each model, get option IDs and fetch vehicle details
    const allCars: CarProps[] = [];

    for (const m of modelsList) {
      const options = await fetchOptions(resolvedYear, resolvedMake, m.value);

      for (const option of options) {
        const vehicleId = safeParseInt(option.value, 0);
        if (vehicleId === 0) continue;

        try {
          const car = await fetchVehicleById(vehicleId);
          if (car) allCars.push(car);
        } catch (error) {
          // Skip individual bad records, don't fail the whole batch
          console.error(`Failed to fetch vehicle ${vehicleId}:`, error);
        }
      }
    }

    return allCars;
  } catch (error) {
    console.error("fetchCars failed:", error);
    return [];
  }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};


// ─── Car Image API (imagin.studio) ──────────────────────────────
// Constructs a CDN URL for a car image using the imagin.studio API.
//
// DIAGNOSIS (confirmed by live API tests):
//   The IMAGIN.studio CDN returns an X-Imaginstudio-Error response header when
//   the customer key is disabled — and still returns HTTP 200 with a generic
//   covered-car placeholder image (242 628 bytes, identical for every request).
//   This is how we detected that the original ci_e47ec261... key was disabled.
//
//   Fix: use the configured CAR_IMAGE_API_KEY or existing
//   NEXT_PUBLIC_CAR_IMAGE_API_KEY setting from .env.
//
// MODEL NORMALIZATION:
//   Tested "envision fwd" vs "envision", "f-150 4wd" vs "f-150", etc.
//   All returned identical byte counts — the API silently ignores drivetrain
//   suffixes. No normalization is needed.
//
// KEY VALIDATION:
//   validateCarImageKey() performs one HEAD request on server startup and
//   checks for the X-Imaginstudio-Error header. The result is cached with the
//   same TTL used everywhere else in this file. If the key is disabled, every
//   subsequent generateCarImageUrl call returns null so the catalogue falls
//   back to the local placeholder rather than silently showing the wrong image.

const IMAGE_BASE_URL = "https://cdn.imagin.studio/getImage";
const CAR_IMAGE_ANGLES = ["01", "09", "23", "29"];
const CAR_IMAGE_PAINTS = [
  { id: "Imagin-black", description: "black" },
  { id: "Imagin-red", description: "red" },
  { id: "Imagin-blue", description: "blue" },
  { id: "Imagin-green", description: "green" },
  { id: "Imagin-yellow", description: "yellow" },
  { id: "Imagin-orange", description: "orange" },
];

function getCarImageApiKey(): string | null {
  // Keep supporting the existing project setting while allowing deployments to
  // provide a server-only name instead.
  return (
    process.env.CAR_IMAGE_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_CAR_IMAGE_API_KEY?.trim() ||
    null
  );
}

async function validateCarImageKey(apiKey: string): Promise<boolean> {
  const cacheKey = `image-key-valid:${apiKey}`;
  const cached = getCached<boolean>(cacheKey);
  if (cached !== null) return cached;

  try {
    // Use a known-good vehicle as a probe request (HEAD to avoid downloading image)
    const probeUrl = `${IMAGE_BASE_URL}?customer=${encodeURIComponent(apiKey)}&make=toyota&modelFamily=camry&modelYear=2023&zoomType=fullscreen`;
    const res = await fetch(probeUrl, { method: "HEAD" });
    const errorHeader = res.headers.get("x-imaginstudio-error");
    if (errorHeader) {
      console.error(
        `[CarImageAPI] Key validation failed — X-Imaginstudio-Error: "${errorHeader}". ` +
        `Car images will not be shown. Update CAR_IMAGE_API_KEY in .env.`
      );
      setCache(cacheKey, false);
      return false;
    }
    setCache(cacheKey, true);
    return true;
  } catch (err) {
    console.error("[CarImageAPI] Key validation request failed:", err);
    // Treat network error as unknown — don't suppress images permanently
    return true;
  }
}

export const generateCarImageUrl = (
  car: Pick<CarProps, "make" | "model" | "year">,
  angle?: string,
  paint?: { id: string; description: string },
): string | null => {
  const apiKey = getCarImageApiKey();
  if (!apiKey) {
    console.warn("[CarImageAPI] CAR_IMAGE_API_KEY is not set — skipping car image.");
    return null;
  }

  const params = new URLSearchParams({
    customer: apiKey,
    make: car.make.toLowerCase(),
    // modelFamily: send the full model string — API ignores drive-train suffixes
    // (confirmed: "envision fwd" === "envision" byte-for-byte in API response)
    modelFamily: car.model.toLowerCase(),
    modelYear: String(car.year),
    zoomType: "fullscreen",
  });

  if (angle) {
    params.set("angle", angle);
  }
  if (paint) {
    params.set("paintId", paint.id);
    params.set("paintDescription", paint.description);
  }

  return `${IMAGE_BASE_URL}?${params.toString()}`;
};

// ─── Batch image attachment ───────────────────────────────────────
// Validates the API key once per cache window, then attaches imageUrl to
// every car. Returns null imageUrls if the key is disabled so the catalogue
// falls back to local placeholders instead of showing the covered-car image.
// Follows the same async pattern as the rest of this file.
export async function attachCarImages(cars: CarProps[]): Promise<CarProps[]> {
  const apiKey = getCarImageApiKey();

  // Skip image attachment entirely if the key is missing or disabled
  if (!apiKey) {
    console.warn("[CarImageAPI] CAR_IMAGE_API_KEY is not set — cars will render without images.");
    return cars;
  }

  const keyIsValid = await validateCarImageKey(apiKey);
  if (!keyIsValid) {
    // Key is disabled: return cars with imageUrl: null so fallback renders
    return cars.map((car) => ({ ...car, imageUrl: null }));
  }

  return cars.map((car) => {
    const paint = CAR_IMAGE_PAINTS[car.id % CAR_IMAGE_PAINTS.length];
    const imageUrls = CAR_IMAGE_ANGLES.map((angle) =>
      generateCarImageUrl(car, angle, paint),
    ).filter((imageUrl): imageUrl is string => imageUrl !== null);

    return { ...car, imageUrl: imageUrls[0] ?? null, imageUrls };
  });
}
