// Pricing logic for Ghar Bar Cafe rooms.
//
// Seasons (per management):
//   On-season:  10 Apr → 5 Jul  AND  20 Nov → 20 Jan
//   Off-season: 5 Jul  → 1 Oct  AND  20 Jan → 10 Apr
// The 1 Oct → 20 Nov gap defaults to off-season.

export type RoomType = "premium" | "standard";
export type Plan = "ep" | "cp" | "map";
export type Season = "on" | "off";

export const ROOM_TYPES: { id: RoomType; label: string }[] = [
  { id: "premium", label: "Premium Room" },
  { id: "standard", label: "Standard Room" },
];

export const PLANS: {
  id: Plan;
  label: string;
  short: string;
  description: string;
}[] = [
  {
    id: "ep",
    label: "EP — Room Only",
    short: "EP",
    description: "Stay only. No meals included.",
  },
  {
    id: "cp",
    label: "CP — Room + Breakfast",
    short: "CP",
    description: "Includes breakfast for two.",
  },
  {
    id: "map",
    label: "MAP — Room + Breakfast + Dinner",
    short: "MAP",
    description: "Both breakfast and dinner included for two.",
  },
];

export const PRICING: Record<RoomType, Record<Season, Record<Plan, number>>> = {
  premium: {
    on: { ep: 3400, cp: 3800, map: 4500 },
    off: { ep: 2800, cp: 3200, map: 3800 },
  },
  standard: {
    on: { ep: 2200, cp: 2500, map: 2900 },
    off: { ep: 1700, cp: 1900, map: 2200 },
  },
};

/** Returns the season for a given calendar date (uses local Y/M/D). */
export function getSeason(date: Date): Season {
  const m = date.getMonth() + 1; // 1-12
  const d = date.getDate();

  // 10 Apr → 5 Jul (start inclusive, end exclusive)
  if (
    (m === 4 && d >= 10) ||
    m === 5 ||
    m === 6 ||
    (m === 7 && d < 5)
  ) {
    return "on";
  }

  // 20 Nov → 20 Jan (start inclusive, end exclusive)
  if ((m === 11 && d >= 20) || m === 12 || (m === 1 && d < 20)) {
    return "on";
  }

  return "off";
}

/** Returns the per-night rate for a given date / room / plan. */
export function rateFor(
  date: Date,
  roomType: RoomType,
  plan: Plan
): { rate: number; season: Season } {
  const season = getSeason(date);
  return { rate: PRICING[roomType][season][plan], season };
}

export type StayBreakdownNight = {
  date: string; // ISO yyyy-mm-dd
  season: Season;
  rate: number;
};

export type StayQuote = {
  nights: number;
  total: number;
  perNightAverage: number;
  breakdown: StayBreakdownNight[];
};

/** Inclusive of `checkIn`, exclusive of `checkOut`. Returns null on invalid range. */
export function quoteStay(
  checkIn: Date,
  checkOut: Date,
  roomType: RoomType,
  plan: Plan,
  rooms: number = 1
): StayQuote | null {
  if (
    !(checkIn instanceof Date) ||
    !(checkOut instanceof Date) ||
    Number.isNaN(checkIn.getTime()) ||
    Number.isNaN(checkOut.getTime())
  ) {
    return null;
  }
  const ms = checkOut.getTime() - checkIn.getTime();
  const nights = Math.round(ms / (1000 * 60 * 60 * 24));
  if (nights <= 0) return null;

  const breakdown: StayBreakdownNight[] = [];
  let total = 0;

  for (let i = 0; i < nights; i++) {
    const d = new Date(checkIn);
    d.setDate(d.getDate() + i);
    const { rate, season } = rateFor(d, roomType, plan);
    breakdown.push({
      date: toISODate(d),
      season,
      rate,
    });
    total += rate;
  }

  total *= Math.max(1, rooms);

  return {
    nights,
    total,
    perNightAverage: Math.round(total / Math.max(1, nights * rooms)),
    breakdown,
  };
}

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Parse a yyyy-mm-dd string into a local Date at 00:00. */
export function fromISODate(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatINR(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}
