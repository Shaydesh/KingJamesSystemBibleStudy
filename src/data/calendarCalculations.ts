export const DAYS_IN_ZADOK_YEAR = 364;
export const YEARS_IN_JUBILEE_CYCLE = 6;
export const EXTRA_DAYS_AT_CYCLE_END = 7;
export const DAYS_IN_PRIEST_ROTATION = 7;
export const TOTAL_PRIEST_FAMILIES = 24;
export const STARTING_PRIEST_FAMILY_INDEX = 21; // Gamul (1-indexed in Bible, 0-indexed in code)
export const STARTING_DAY_IN_ROTATION = 5;
export const YEAR_START_WEEKDAY = 4; // 4th day of week

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
  "Jeshua",
  "Shecaniah",
  "Eliashib",
  "Jakim",
  "Huppah",
  "Jeshebeab",
  "Bilgah",
  "Immer",
  "Hezir",
  "Happizzez",
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
export const ZADOK_CALENDAR_START = new Date(2019, 2, 20);

// Calculate days since the start of the Zadok calendar
export function daysSinceStart(date: Date): number {
  const start = new Date(ZADOK_CALENDAR_START);
  const timeDiff = date.getTime() - start.getTime();
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
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

  // Compute the absolute year number from the calendar start:
  // Divide total days since epoch by the number of days in a Zadok year, then add 1
  const year = Math.floor(days / DAYS_IN_ZADOK_YEAR) + 1;

  // --- Handling the Pause Week (Extra 7 Days at the End of Each 7-Year Cycle) ---

  // Estimate what year we’re in based on total days (for pause calculation)
  const totalDays = daysSinceStart(gregDate);

  const sabbathYear = getSabbathCycleYear(totalDays);

  let estimatedYear = Math.floor(totalDays / DAYS_IN_ZADOK_YEAR) + 1;

  // Get the number of full years that have passed
  const completeYears = estimatedYear - 1;

  // Count how many 7-year cycles have been completed:
  // Every 7th year includes an extra pause week after year 6
  const pausesPassed = Math.floor(completeYears / 6);

  // Adjust total day count by subtracting the extra days from previous pause weeks
  const adjustedDays = totalDays - pausesPassed * EXTRA_DAYS_AT_CYCLE_END;

  // Recalculate which day of the year it is now that we’ve removed the extra days
  const dayOfYear = adjustedDays % DAYS_IN_ZADOK_YEAR;

  // Recalculate actual year number after removing pauses
  const actualYear = Math.floor(adjustedDays / DAYS_IN_ZADOK_YEAR) + 1;

  // Check if we’re currently inside a pause week:
  // If the next year is divisible by 7, then a pause week follows this year
  // Also, confirm that we’ve gone past the last regular day of the year (364)
  const isPauseWeek =
    ((actualYear + 1) % 7 === 0) && (dayOfYear >= DAYS_IN_ZADOK_YEAR);

  // Check if this is a jubilee year (every 7th year in the cycle is a jubilee)
  const isJubilee = actualYear % 7 === 0;

  // Calculate how many days into the current Zadok year we are (0 to 363)
  let daysIntoYear = daysInCurrentCycle % DAYS_IN_ZADOK_YEAR;

  // --- Handle the Special Case of the Pause Week ---
  let priestFamiliyIndex: number = calculatePriestFamilyIndex(days);
  let priestFamily = PRIEST_FAMILIES[priestFamiliyIndex]

  if (isPauseWeek) {
    // During the pause week, the "month" is still month 12, and we add the extra days to the last month's count
    return {
      year,
      month: 12,
      day: MONTH_DAYS[11] + (daysIntoYear - DAYS_IN_ZADOK_YEAR) + 1, // Add overflow to last month's day count
      isJubilee,
      jubileeCycle,
      yearInCycle,
      priestFamilyIndex: priestFamiliyIndex,
      dayInRotation: calculateDayInRotation(days),
      season: 3, // Season 3 = Winter
      sabbathcycleyear: sabbathYear,
      priestFamily: priestFamily
    };
  }

  // --- Convert Day of Year to Month and Day ---

  // Calculate how many days into the current Zadok year we are (0 to 363)
  //let daysIntoYear = daysInCurrentCycle % DAYS_IN_ZADOK_YEAR;

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
    priestFamilyIndex: priestFamiliyIndex,
    dayInRotation: calculateDayInRotation(days),
    season,
    sabbathcycleyear: sabbathYear,
    priestFamily: priestFamily
  };
}


// Convert gregorian date to Zadok date
// export function gregorianToZadok(gregDate: Date): {
//   year: number;
//   month: number;
//   day: number;
//   isJubilee: boolean;
//   jubileeCycle: number;
//   yearInCycle: number;
//   priestFamilyIndex: number;
//   dayInRotation: number;
//   season: number;
// } {
//   // Calculate days since start of Zadok calendar
//   let days = daysSinceStart(gregDate);

//   if (days < 0) {
//     // Handle dates before calendar start
//     throw new Error("Date is before the start of the Zadok calendar");
//   }

//   // Calculate jubilee cycle information
//   const daysInNormalCycle = DAYS_IN_ZADOK_YEAR * YEARS_IN_JUBILEE_CYCLE + EXTRA_DAYS_AT_CYCLE_END;

//   const totalCycleDays = daysInNormalCycle * 7; // 7 priest cycles = 294 years

//   // Position within the 294-year grand cycle (7 jubilee cycles)
//   const grandCyclePosition = days % totalCycleDays;

//   // Current jubilee cycle (1-7)
//   const jubileeCycle = Math.floor(grandCyclePosition / daysInNormalCycle) + 1;

//   // Days within current jubilee cycle
//   const daysInCurrentCycle = grandCyclePosition % daysInNormalCycle;

//   // Calculate year within the current jubilee cycle
//   const yearInCycle = Math.min(Math.floor(daysInCurrentCycle / DAYS_IN_ZADOK_YEAR) + 1, YEARS_IN_JUBILEE_CYCLE,);

//   // Year number (counting from 1)
//   const year = Math.floor(days / DAYS_IN_ZADOK_YEAR) + 1;

//   // Determine if this is a jubilee year (first year of a jubilee cycle)
//   //const isJubilee = yearInCycle === 1;



//   // Calculate days into current year, accounting for the 7 extra days at end of cycle
//   let daysIntoYear = daysInCurrentCycle % DAYS_IN_ZADOK_YEAR;


//   const totalDays = daysSinceStart(gregDate);
//   let estimatedYear = Math.floor(totalDays / DAYS_IN_ZADOK_YEAR) + 1;
//   const completeYears = estimatedYear - 1;
//   const pausesPassed = Math.floor(completeYears / 6); // every 7th year has a pause after year 6
//   const adjustedDays = totalDays - pausesPassed * EXTRA_DAYS_AT_CYCLE_END;
//   const dayOfYear = adjustedDays % DAYS_IN_ZADOK_YEAR;
//   const actualYear = Math.floor(adjustedDays / DAYS_IN_ZADOK_YEAR) + 1;
//   const isPauseWeek = ((actualYear + 1) % 7 === 0) && (dayOfYear >= DAYS_IN_ZADOK_YEAR);
//   const isJubilee = actualYear % 7 === 0;

//   // If we're in the extra week at the end of cycle
//   if (isPauseWeek) {
//     // We're in the extra week
//     return {
//       year,
//       month: 12,
//       day: MONTH_DAYS[11] + (daysIntoYear - DAYS_IN_ZADOK_YEAR) + 1,
//       isJubilee,
//       jubileeCycle,
//       yearInCycle,
//       priestFamilyIndex: calculatePriestFamilyIndex(days),
//       dayInRotation: calculateDayInRotation(days),
//       season: 3, // Winter
//     };
//   }

//   // Calculate month and day
//   let month = 0;

//   // Days are numbered normally (1, 2, 3, etc.)
//   // but the first day of the year falls on the 4th day of the week
//   let day = daysIntoYear + 1; // +1 because days are 1-indexed

//   while (day > MONTH_DAYS[month]) {
//     day -= MONTH_DAYS[month];
//     month++;
//   }

//   // Calculate season (0-based)
//   const season = Math.floor(month / 3);

//   return {
//     year,
//     month: month + 1, // +1 because months are 1-indexed
//     day,
//     isJubilee,
//     jubileeCycle,
//     yearInCycle,
//     priestFamilyIndex: calculatePriestFamilyIndex(days),
//     dayInRotation: calculateDayInRotation(days),
//     season,
//   };
// }

// export function gregorianToZadok(gregDate: Date): {
//   year: number;
//   month: number;
//   day: number;
//   isJubilee: boolean;
//   isPauseWeek: boolean;
//   priestFamilyIndex: number;
//   dayInRotation: number;
//   season: number;
// } {
//   // Calculate total days since start of calendar
//   const totalDays = daysSinceStart(gregDate);
//   if (totalDays < 0) throw new Error("Date is before the start of the Zadok calendar");

//   // Estimate Zadok year without accounting for pauses
//   let estimatedYear = Math.floor(totalDays / DAYS_IN_ZADOK_YEAR) + 1;

//   // Calculate how many 7-year cycles have passed (for pause insertion)
//   const completeYears = estimatedYear - 1;
//   const pausesPassed = Math.floor(completeYears / 6); // every 7th year has a pause after year 6
//   const adjustedDays = totalDays - pausesPassed * EXTRA_DAYS_AT_CYCLE_END;

//   // Recalculate the actual year based on adjustedDays
//   const actualYear = Math.floor(adjustedDays / DAYS_IN_ZADOK_YEAR) + 1;
//   const dayOfYear = adjustedDays % DAYS_IN_ZADOK_YEAR;

//   const isJubilee = actualYear % 7 === 0;
//   const isPauseWeek = ((actualYear + 1) % 7 === 0) && (dayOfYear >= DAYS_IN_ZADOK_YEAR);

//   let days = daysSinceStart(gregDate);
//   const daysInNormalCycle = DAYS_IN_ZADOK_YEAR * 7 + EXTRA_DAYS_AT_CYCLE_END;
//   const totalCycleDays = daysInNormalCycle * 7;
//   const grandCyclePosition = days % totalCycleDays;
//   const daysInCurrentCycle = grandCyclePosition % daysInNormalCycle;
//   const yearInCycle = Math.min(Math.floor(daysInCurrentCycle / DAYS_IN_ZADOK_YEAR) + 1, YEARS_IN_JUBILEE_CYCLE,);


//   // Handle pause week
//   if (isPauseWeek) {
//     return {
//       year: actualYear,
//       month: 12,
//       day: MONTH_DAYS[11] + (dayOfYear - DAYS_IN_ZADOK_YEAR) + 1, // day 365–371 as day 1–7 of pause
//       isJubilee,
//       isPauseWeek: true,
//       priestFamilyIndex: calculatePriestFamilyIndex(totalDays),
//       dayInRotation: calculateDayInRotation(totalDays),
//       season: 3, // Winter
//     };
//   }

//   // Convert dayOfYear to month/day
//   let remainingDays = dayOfYear;
//   let monthIndex = 0;
//   while (remainingDays >= MONTH_DAYS[monthIndex]) {
//     remainingDays -= MONTH_DAYS[monthIndex];
//     monthIndex++;
//   }

//   const season = Math.floor(monthIndex / 3);

//   return {
//     year: actualYear,
//     month: monthIndex + 1,
//     day: remainingDays + 1,
//     isJubilee,
//     isPauseWeek: false,
//     priestFamilyIndex: calculatePriestFamilyIndex(totalDays),
//     dayInRotation: calculateDayInRotation(totalDays),
//     season,
//   };
// }


// Calculate the priest family index for a given day
// function calculatePriestFamilyIndex(days: number): number {
//   const daysInNormalCycle = DAYS_IN_ZADOK_YEAR * YEARS_IN_JUBILEE_CYCLE + EXTRA_DAYS_AT_CYCLE_END;
//   const cyclePosition = days % daysInNormalCycle;

//   const year6CompleteDays = DAYS_IN_ZADOK_YEAR * YEARS_IN_JUBILEE_CYCLE;
//   const extraDaysStart = year6CompleteDays;
//   const extraDaysEnd = year6CompleteDays + EXTRA_DAYS_AT_CYCLE_END;

//   // Check if current day is within the extra 7-day pause
//   if (cyclePosition >= extraDaysStart && cyclePosition < extraDaysEnd) {
//     // Return same priest as the one who served the last regular day (day 364 of year 6)
//     const adjustedDays = days - (cyclePosition - extraDaysStart + 1); // go back to the last counted day
//     return calculatePriestFamilyIndex(adjustedDays);
//   }

//   // Count how many full extra day blocks we've passed (i.e., per 6-year cycle)
//   const fullCycles = Math.floor(days / daysInNormalCycle);
//   const extraDaysPassed = fullCycles * EXTRA_DAYS_AT_CYCLE_END;

//   // Also check if we’re *after* the extra week in the current cycle
//   const passedExtraThisCycle = cyclePosition >= extraDaysEnd ? EXTRA_DAYS_AT_CYCLE_END : 0;

//   const effectiveDays = days - extraDaysPassed - passedExtraThisCycle;

//   const adjustedDays = effectiveDays + (STARTING_DAY_IN_ROTATION - 1);
//   const totalRotations = Math.floor(adjustedDays / DAYS_IN_PRIEST_ROTATION);
//   const familyIndex = (STARTING_PRIEST_FAMILY_INDEX + totalRotations) % TOTAL_PRIEST_FAMILIES;

//   return familyIndex;
// }

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
  const adjustedDays = effectiveDays + (STARTING_DAY_IN_ROTATION - 1);
  const rotationIndex = Math.floor(adjustedDays / DAYS_IN_PRIEST_ROTATION);
  const priestIndex = (STARTING_PRIEST_FAMILY_INDEX + rotationIndex) % TOTAL_PRIEST_FAMILIES;

  return priestIndex;
}


// Calculate the day in rotation (1-7)
// function calculateDayInRotation(days: number): number {
//   const daysInNormalCycle = DAYS_IN_ZADOK_YEAR * YEARS_IN_JUBILEE_CYCLE + EXTRA_DAYS_AT_CYCLE_END;
//   const cyclePosition = days % daysInNormalCycle;

//   const year6CompleteDays = DAYS_IN_ZADOK_YEAR * YEARS_IN_JUBILEE_CYCLE;
//   const extraDaysStart = year6CompleteDays;
//   const extraDaysEnd = year6CompleteDays + EXTRA_DAYS_AT_CYCLE_END;

//   if (cyclePosition >= extraDaysStart && cyclePosition < extraDaysEnd) {
//     // Pause rotation — just return the last day's rotation
//     const adjustedDays = days - (cyclePosition - extraDaysStart + 1);
//     return calculateDayInRotation(adjustedDays);
//   }

//   const fullCycles = Math.floor(days / daysInNormalCycle);
//   const extraDaysPassed = fullCycles * EXTRA_DAYS_AT_CYCLE_END;
//   const passedExtraThisCycle = cyclePosition >= extraDaysEnd ? EXTRA_DAYS_AT_CYCLE_END : 0;

//   const effectiveDays = days - extraDaysPassed - passedExtraThisCycle;
//   const dayPosition = (effectiveDays + STARTING_DAY_IN_ROTATION - 1) % DAYS_IN_PRIEST_ROTATION;

//   return dayPosition + 1;
// }

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

  // Step 5: Compute rotation day (1–7)
  const adjustedRotationStart = effectiveDays + (STARTING_DAY_IN_ROTATION - 1);
  const dayInRotation = (adjustedRotationStart % DAYS_IN_PRIEST_ROTATION) + 1;

  return dayInRotation;
}


// Convert Zadok date back to Gregorian date
export function zadokToGregorian(
  year: number,
  month: number,
  day: number,
  yearInCycle: number,
): Date {
  // Total days since start of calendar
  let totalDays = 0;

  // Complete jubilee cycles
  const completeCycles = Math.floor((year - 1) / YEARS_IN_JUBILEE_CYCLE);
  totalDays += completeCycles * (DAYS_IN_ZADOK_YEAR * YEARS_IN_JUBILEE_CYCLE + EXTRA_DAYS_AT_CYCLE_END);

  // Complete years in current cycle
  const completeYearsInCycle = yearInCycle - 1;
  totalDays += completeYearsInCycle * DAYS_IN_ZADOK_YEAR;

  // Complete months in current year
  for (let m = 0; m < month - 1; m++) {
    totalDays += MONTH_DAYS[m];
  }

  // Days in current month
  totalDays += day - 1; // -1 because days are 1-indexed

  // Create new date by adding total days to start date
  const result = new Date(ZADOK_CALENDAR_START);
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
