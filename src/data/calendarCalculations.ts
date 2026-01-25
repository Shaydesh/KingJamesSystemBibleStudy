export const DAYS_IN_ZADOK_YEAR = 364;
export const YEARS_IN_JUBILEE_CYCLE = 6;
export const EXTRA_DAYS_AT_CYCLE_END = 7;
export const DAYS_IN_PRIEST_ROTATION = 7;
export const TOTAL_PRIEST_FAMILIES = 24;
export const STARTING_PRIEST_FAMILY_INDEX = 21; // Gamul (1-indexed in Bible, 0-indexed in code)
export const STARTING_DAY_IN_ROTATION = 5;
export const ROTATION_DAY_OFFSET = 3; // Offset so Sunday = Day 1 of rotation (epoch was Wednesday = Day 4)
export const YEAR_START_WEEKDAY = 4; // 4th day of week

// 3862 BC is Year 1. March 20, 2019 is Year 5881 (start of 121st Jubilee cycle)
// 3862 + 2019 - 1 = 5880 years before 2019
export const EPOCH_YEAR_OFFSET = 5880;

// Months in Zadok calendar follow a pattern of 30, 30, 31 days for each season
export const MONTH_DAYS = [30, 30, 31, 30, 30, 31, 30, 30, 31, 30, 30, 31];

// Names of the 24 priest families from 1 Chronicles 24
export const PRIEST_FAMILIES = [
  "Jehoiarib",
  "Jedaiah",
  "Harim",
  "Seorim",
  "Malchijah",
  "Mijamin",
  "Hakkoz",
  "Abijah",
  "Jeshuah",
  "Shecaniah",
  "Eliashib",
  "Jakim",
  "Huppah",
  "Jeshebeab",
  "Bilgah",
  "Immer",
  "Hezir",
  "Aphses",
  "Pethahiah",
  "Jehezkel",
  "Jachin",
  "Gamul",
  "Delaiah",
  "Maaziah",
];

// Season names and their corresponding colors
export const SEASONS = [
  { name: "Spring", color: "bg-spring", months: [1, 2, 3] },
  { name: "Summer", color: "bg-summer", months: [4, 5, 6] },
  { name: "Autumn", color: "bg-autumn", months: [7, 8, 9] },
  { name: "Winter", color: "bg-winter", months: [10, 11, 12] },
];

// Starting date in Gregorian calendar (March 20, 2019 - Spring Equinox)
// Note: Using March 20 to align Day 5, Month 11, Year 5887 with January 20, 2026
export const ZADOK_CALENDAR_START = new Date(2019, 2, 20);

// Calculate days since the start of the Zadok calendar
export function daysSinceStart(date: Date): number {
  const start = new Date(ZADOK_CALENDAR_START);
  start.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const timeDiff = target.getTime() - start.getTime();
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}

// Get the current Zadok year
export function getCurrentZadokYear(): number {
  const today = new Date();
  const zadok = gregorianToZadok(today);
  return zadok.year;
}

function getSabbathCycleYear(totalDays: number): number {
  // Length of each year in the 7-year Sabbath cycle
  const sabbathYearLengths = [364, 364, 364, 364, 364, 371, 364]; // Year 6 has extra 7-day week

  const totalCycleDays = sabbathYearLengths.reduce((sum, days) => sum + days, 0); // 2555

  let dayInCycle = totalDays % totalCycleDays;

  for (let i = 0; i < sabbathYearLengths.length; i++) {
    if (dayInCycle < sabbathYearLengths[i]) {
      return i + 1; // Return 1-based year number
    }
    dayInCycle -= sabbathYearLengths[i];
  }

  // Fallback (should never happen)
  return 7;
}

export function gregorianToZadok(gregDate: Date): {
  year: number;
  month: number;
  day: number;
  isJubilee: boolean;
  jubileeCycle: number;
  yearInCycle: number;
  priestFamilyIndex: number;
  dayInRotation: number;
  season: number;
  sabbathcycleyear: number;
  priestFamily: string;
} {
  // Step 1: Get the number of days from the Zadok calendar epoch to the given Gregorian date
  let days = daysSinceStart(gregDate);

  if (days < 0) {
    // The Zadok calendar hasn't started yet for this date
    throw new Error("Date is before the start of the Zadok calendar");
  }

  // --- Jubilee Cycle Calculations ---

  // Each jubilee cycle contains a number of years * the length of a Zadok year, plus a fixed number of extra days at the end of the cycle.
  // For example: 49 years * 364 days/year = 17,836 days + 7 extra days = 17,843 days
  const daysInNormalCycle = DAYS_IN_ZADOK_YEAR * YEARS_IN_JUBILEE_CYCLE + EXTRA_DAYS_AT_CYCLE_END;

  // There are 7 jubilee cycles in a 294-year "grand cycle", so:
  // Total days in a grand cycle = 7 * daysInNormalCycle
  const totalCycleDays = daysInNormalCycle * 7;

  // Calculate how far into the 294-year grand cycle the current date is:
  // This gives us the day offset **within** the grand cycle (0 to totalCycleDays-1)
  const grandCyclePosition = days % totalCycleDays;

  // Determine which jubilee cycle we are in (1 through 7):
  // We divide the day offset in the grand cycle by the number of days in one jubilee cycle
  const jubileeCycle = Math.floor(grandCyclePosition / daysInNormalCycle) + 1;

  // Now determine how many days have passed **within** the current jubilee cycle
  // This is the remainder after removing all previous jubilee cycles
  const daysInCurrentCycle = grandCyclePosition % daysInNormalCycle;

  // Figure out which year we are in within this jubilee cycle (1 through 49):
  // Divide the days in current cycle by the number of days in a single Zadok year
  // Add 1 to convert from zero-indexed year to human-readable (1-indexed)
  const yearInCycle = Math.min(
    Math.floor(daysInCurrentCycle / DAYS_IN_ZADOK_YEAR) + 1,
    YEARS_IN_JUBILEE_CYCLE,
  );

  // --- Handling the Pause Week and Year Calculation with Epoch Offset ---

  const totalDays = daysSinceStart(gregDate);

  const sabbathYear = getSabbathCycleYear(totalDays);

  // Use sabbath cycle approach for accurate year calculation
  const sabbathYearLengths = [364, 364, 364, 364, 364, 371, 364];
  const sabbathCycleTotalDays = sabbathYearLengths.reduce((sum, d) => sum + d, 0);

  const fullCycles = Math.floor(days / sabbathCycleTotalDays);
  const dayInCurrentCycle = days % sabbathCycleTotalDays;

  let sabbathYearInCycle = 0;
  let daysIntoYear = dayInCurrentCycle;
  let accumulated = 0;

  for (let i = 0; i < sabbathYearLengths.length; i++) {
    if (dayInCurrentCycle < accumulated + sabbathYearLengths[i]) {
      sabbathYearInCycle = i;
      daysIntoYear = dayInCurrentCycle - accumulated;
      break;
    }
    accumulated += sabbathYearLengths[i];
  }

  // Calculate actual year with epoch offset (Year 5881 = March 20, 2019)
  const year = fullCycles * 7 + sabbathYearInCycle + 1 + EPOCH_YEAR_OFFSET;

  // Check if we are in the pause week (year 6 has extra 7 days at the end)
  const isPauseWeek = sabbathYearInCycle === 5 && daysIntoYear >= 364;

  // Check if this is a jubilee year (every 7th year in the cycle is a jubilee)
  const isJubilee = (year - EPOCH_YEAR_OFFSET) % 7 === 0;

  // --- Handle the Special Case of the Pause Week ---
  let priestFamilyIndex: number = calculatePriestFamilyIndex(days);
  let priestFamily = PRIEST_FAMILIES[priestFamilyIndex]

  if (isPauseWeek) {
    // During the pause week, the "month" is still month 12, and we add the extra days to the last month's count
    return {
      year,
      month: 12,
      day: MONTH_DAYS[11] + (daysIntoYear - DAYS_IN_ZADOK_YEAR) + 1, // Add overflow to last month's day count
      isJubilee,
      jubileeCycle,
      yearInCycle,
      priestFamilyIndex: priestFamilyIndex,
      dayInRotation: calculateDayInRotation(days),
      season: 3, // Season 3 = Winter
      sabbathcycleyear: sabbathYear,
      priestFamily: priestFamily
    };
  }

  // --- Convert Day of Year to Month and Day ---

  // Start from day 1 (human-readable, not zero-based)
  let day = daysIntoYear + 1;

  // Determine which month the day falls in
  let month = 0;
  while (day > MONTH_DAYS[month]) {
    day -= MONTH_DAYS[month];
    month++;
  }

  // Determine which season this month belongs to:
  // Each season is 3 months long, so divide month index by 3
  const season = Math.floor(month / 3);

  return {
    year,
    month: month + 1, // Convert from 0-based index to 1-based month
    day,
    isJubilee,
    jubileeCycle,
    yearInCycle,
    priestFamilyIndex: priestFamilyIndex,
    dayInRotation: calculateDayInRotation(days),
    season,
    sabbathcycleyear: sabbathYear,
    priestFamily: priestFamily
  };
}

function calculatePriestFamilyIndex(days: number): number {
  // Step 1: Estimate Zadok year
  const estimatedYear = Math.floor(days / DAYS_IN_ZADOK_YEAR) + 1;

  // Step 2: Count how many pause weeks have occurred before this day
  const completedYears = estimatedYear - 1;
  const pausesPassed = Math.floor(completedYears / 6);
  const extraDaysPassed = pausesPassed * EXTRA_DAYS_AT_CYCLE_END;

  // Step 3: Adjust effective day count for rotations (remove pause weeks)
  const effectiveDays = days - extraDaysPassed;

  // Step 4: Determine if the current day is within a pause week
  const dayOfYear = effectiveDays % DAYS_IN_ZADOK_YEAR;
  const isPauseWeek = ((estimatedYear + 1) % 7 === 0) && (dayOfYear >= DAYS_IN_ZADOK_YEAR);

  if (isPauseWeek) {
    // If in pause week, reuse the priest from the last valid rotation day
    const daysIntoPause = dayOfYear - DAYS_IN_ZADOK_YEAR + 1;
    const adjustedDays = days - daysIntoPause;
    return calculatePriestFamilyIndex(adjustedDays);
  }

  // Step 5: Calculate total weeks since start, adjusted for pauses
  // Use ROTATION_DAY_OFFSET so priest changes align with Sunday (Day 1)
  const adjustedDays = effectiveDays + ROTATION_DAY_OFFSET;
  const rotationIndex = Math.floor(adjustedDays / DAYS_IN_PRIEST_ROTATION);
  const priestIndex = (STARTING_PRIEST_FAMILY_INDEX + rotationIndex) % TOTAL_PRIEST_FAMILIES;

  return priestIndex;
}

function calculateDayInRotation(days: number): number {
  // Step 1: Estimate Zadok year
  const estimatedYear = Math.floor(days / DAYS_IN_ZADOK_YEAR) + 1;

  // Step 2: Count how many pause weeks have occurred before this day
  const completedYears = estimatedYear - 1;
  const pausesPassed = Math.floor(completedYears / 6); // every 7th year has a pause after year 6
  const extraDaysPassed = pausesPassed * EXTRA_DAYS_AT_CYCLE_END;

  // Step 3: Adjust effective days (subtracting pause weeks)
  const effectiveDays = days - extraDaysPassed;

  // Step 4: Check if this day falls within a current pause week
  const dayOfYear = effectiveDays % DAYS_IN_ZADOK_YEAR;
  const isPauseWeek = ((estimatedYear + 1) % 7 === 0) && (dayOfYear >= DAYS_IN_ZADOK_YEAR);

  if (isPauseWeek) {
    // Freeze rotation — repeat last valid day's rotation
    const daysIntoPause = dayOfYear - DAYS_IN_ZADOK_YEAR + 1;
    const adjustedDays = days - daysIntoPause;
    return calculateDayInRotation(adjustedDays);
  }

  // Step 5: Compute rotation day (1–7) with Sunday = Day 1
  const adjustedRotationStart = effectiveDays + ROTATION_DAY_OFFSET;
  const dayInRotation = (adjustedRotationStart % DAYS_IN_PRIEST_ROTATION) + 1;

  return dayInRotation;
}

// Convert Zadok date back to Gregorian date
export function zadokToGregorian(
  year: number,
  month: number,
  day: number,
): Date {
  const sabbathYearLengths = [364, 364, 364, 364, 364, 371, 364];
  const totalCycleDays = sabbathYearLengths.reduce((sum, d) => sum + d, 0);

  // Adjust for epoch offset (year 5881 = first year after March 20, 2019)
  const adjustedYear = year - EPOCH_YEAR_OFFSET;

  const fullCycles = Math.floor((adjustedYear - 1) / 7);
  const yearInCycle = (adjustedYear - 1) % 7;

  let totalDays = fullCycles * totalCycleDays;

  for (let i = 0; i < yearInCycle; i++) {
    totalDays += sabbathYearLengths[i];
  }

  for (let m = 0; m < month - 1; m++) {
    totalDays += MONTH_DAYS[m];
  }

  totalDays += day - 1;

  const result = new Date(ZADOK_CALENDAR_START);
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() + totalDays);

  return result;
}

// Get the next priest family
export function getNextPriestFamily(currentIndex: number): {
  name: string;
  index: number;
} {
  const nextIndex = (currentIndex + 1) % TOTAL_PRIEST_FAMILIES;
  return {
    name: PRIEST_FAMILIES[nextIndex],
    index: nextIndex,
  };
}

// Get current weekday for a Zadok date
export function getWeekday(year: number, month: number, day: number): number {
  // First day of the year always falls on the 4th day of the week (YEAR_START_WEEKDAY)
  // Calculate days since start of year
  let daysSinceYearStart = 0;

  for (let m = 0; m < month - 1; m++) {
    daysSinceYearStart += MONTH_DAYS[m];
  }

  // Calculate days since start of year (using 1-indexed days)
  daysSinceYearStart += day - 1;

  // If we're at the first day (daysSinceYearStart == 0), we return YEAR_START_WEEKDAY directly
  if (daysSinceYearStart === 0) {
    return YEAR_START_WEEKDAY;
  }

  // Otherwise, we calculate the weekday based on how many days have passed
  return ((YEAR_START_WEEKDAY + daysSinceYearStart - 1) % 7) + 1;
}

// Get the total days for a given month
export function getDaysInMonth(month: number): number {
  return MONTH_DAYS[(month - 1) % 12];
}

// Get the season for a given month
export function getSeasonForMonth(month: number): {
  name: string;
  color: string;
} {
  const index = Math.floor((month - 1) / 3);
  return SEASONS[index];
}
