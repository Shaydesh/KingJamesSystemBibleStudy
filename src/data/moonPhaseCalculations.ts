/**
 * Moon Phase Calculations using Meeus Algorithm
 * Based on Jean Meeus' "Astronomical Algorithms" (2nd Edition)
 * Accurate to within minutes over thousands of years
 */

// Constants
const SYNODIC_MONTH = 29.530588861; // Mean length of synodic month in days
const J2000 = 2451550.09766; // JDE of a known new moon (Jan 6, 2000)

/**
 * Convert a calendar date to Julian Day Number
 */
export function dateToJulian(year: number, month: number, day: number, hour: number = 0): number {
  // Adjust for January/February being months 13/14 of previous year
  if (month <= 2) {
    year -= 1;
    month += 12;
  }

  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);

  const JD = Math.floor(365.25 * (year + 4716)) +
             Math.floor(30.6001 * (month + 1)) +
             day + hour / 24 + B - 1524.5;

  return JD;
}

/**
 * Convert Julian Day Number to calendar date
 */
export function julianToDate(jd: number): { year: number; month: number; day: number; hour: number } {
  const Z = Math.floor(jd + 0.5);
  const F = jd + 0.5 - Z;

  let A: number;
  if (Z < 2299161) {
    A = Z;
  } else {
    const alpha = Math.floor((Z - 1867216.25) / 36524.25);
    A = Z + 1 + alpha - Math.floor(alpha / 4);
  }

  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);

  const day = B - D - Math.floor(30.6001 * E);
  const month = E < 14 ? E - 1 : E - 13;
  const year = month > 2 ? C - 4716 : C - 4715;
  const hour = F * 24;

  return { year, month, day: Math.floor(day), hour };
}

/**
 * Normalize angle to 0-360 range
 */
function normalizeAngle(angle: number): number {
  let result = angle % 360;
  if (result < 0) result += 360;
  return result;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

/**
 * Calculate the Julian Ephemeris Day of a moon phase
 * @param k - The lunation number (0 = new moon on Jan 6, 2000)
 * @param phase - 0 = new moon, 0.25 = first quarter, 0.5 = full moon, 0.75 = last quarter
 */
function calculatePhaseJDE(k: number, phase: number): number {
  const kPhase = k + phase;
  const T = kPhase / 1236.85; // Time in Julian centuries from J2000
  const T2 = T * T;
  const T3 = T2 * T;
  const T4 = T3 * T;

  // Mean phase time
  let JDE = 2451550.09766 +
            SYNODIC_MONTH * kPhase +
            0.00015437 * T2 -
            0.000000150 * T3 +
            0.00000000073 * T4;

  // Sun's mean anomaly
  const M = normalizeAngle(
    2.5534 +
    29.10535670 * kPhase -
    0.0000014 * T2 -
    0.00000011 * T3
  );

  // Moon's mean anomaly
  const Mprime = normalizeAngle(
    201.5643 +
    385.81693528 * kPhase +
    0.0107582 * T2 +
    0.00001238 * T3 -
    0.000000058 * T4
  );

  // Moon's argument of latitude
  const F = normalizeAngle(
    160.7108 +
    390.67050284 * kPhase -
    0.0016118 * T2 -
    0.00000227 * T3 +
    0.000000011 * T4
  );

  // Longitude of ascending node of lunar orbit
  const Omega = normalizeAngle(
    124.7746 -
    1.56375588 * kPhase +
    0.0020672 * T2 +
    0.00000215 * T3
  );

  // Convert to radians for trig functions
  const Mrad = toRadians(M);
  const Mprimerad = toRadians(Mprime);
  const Frad = toRadians(F);
  const Omegarad = toRadians(Omega);

  // Eccentricity correction factor
  const E = 1 - 0.002516 * T - 0.0000074 * T2;
  const E2 = E * E;

  // Planetary arguments
  const A1 = normalizeAngle(299.77 + 0.107408 * kPhase - 0.009173 * T2);
  const A2 = normalizeAngle(251.88 + 0.016321 * kPhase);
  const A3 = normalizeAngle(251.83 + 26.651886 * kPhase);
  const A4 = normalizeAngle(349.42 + 36.412478 * kPhase);
  const A5 = normalizeAngle(84.66 + 18.206239 * kPhase);
  const A6 = normalizeAngle(141.74 + 53.303771 * kPhase);
  const A7 = normalizeAngle(207.14 + 2.453732 * kPhase);
  const A8 = normalizeAngle(154.84 + 7.306860 * kPhase);
  const A9 = normalizeAngle(34.52 + 27.261239 * kPhase);
  const A10 = normalizeAngle(207.19 + 0.121824 * kPhase);
  const A11 = normalizeAngle(291.34 + 1.844379 * kPhase);
  const A12 = normalizeAngle(161.72 + 24.198154 * kPhase);
  const A13 = normalizeAngle(239.56 + 25.513099 * kPhase);
  const A14 = normalizeAngle(331.55 + 3.592518 * kPhase);

  let correction = 0;

  if (phase === 0 || phase === 0.5) {
    // New Moon or Full Moon corrections
    correction =
      -0.40720 * Math.sin(Mprimerad) +
       0.17241 * E * Math.sin(Mrad) +
       0.01608 * Math.sin(2 * Mprimerad) +
       0.01039 * Math.sin(2 * Frad) +
       0.00739 * E * Math.sin(Mprimerad - Mrad) -
       0.00514 * E * Math.sin(Mprimerad + Mrad) +
       0.00208 * E2 * Math.sin(2 * Mrad) -
       0.00111 * Math.sin(Mprimerad - 2 * Frad) -
       0.00057 * Math.sin(Mprimerad + 2 * Frad) +
       0.00056 * E * Math.sin(2 * Mprimerad + Mrad) -
       0.00042 * Math.sin(3 * Mprimerad) +
       0.00042 * E * Math.sin(Mrad + 2 * Frad) +
       0.00038 * E * Math.sin(Mrad - 2 * Frad) -
       0.00024 * E * Math.sin(2 * Mprimerad - Mrad) -
       0.00017 * Math.sin(Omegarad) -
       0.00007 * Math.sin(Mprimerad + 2 * Mrad) +
       0.00004 * Math.sin(2 * Mprimerad - 2 * Frad) +
       0.00004 * Math.sin(3 * Mrad) +
       0.00003 * Math.sin(Mprimerad + Mrad - 2 * Frad) +
       0.00003 * Math.sin(2 * Mprimerad + 2 * Frad) -
       0.00003 * Math.sin(Mprimerad + Mrad + 2 * Frad) +
       0.00003 * Math.sin(Mprimerad - Mrad + 2 * Frad) -
       0.00002 * Math.sin(Mprimerad - Mrad - 2 * Frad) -
       0.00002 * Math.sin(3 * Mprimerad + Mrad) +
       0.00002 * Math.sin(4 * Mprimerad);

    if (phase === 0.5) {
      // Additional correction for full moon
      correction += 0.00026 * Math.cos(Mprimerad) -
                    0.00002 * Math.cos(Mprimerad - Mrad) -
                    0.00002 * Math.cos(Mprimerad + Mrad);
    }
  } else {
    // First Quarter or Last Quarter corrections
    correction =
      -0.62801 * Math.sin(Mprimerad) +
       0.17172 * E * Math.sin(Mrad) -
       0.01183 * E * Math.sin(Mprimerad + Mrad) +
       0.00862 * Math.sin(2 * Mprimerad) +
       0.00804 * Math.sin(2 * Frad) +
       0.00454 * E * Math.sin(Mprimerad - Mrad) +
       0.00204 * E2 * Math.sin(2 * Mrad) -
       0.00180 * Math.sin(Mprimerad - 2 * Frad) -
       0.00070 * Math.sin(Mprimerad + 2 * Frad) -
       0.00040 * Math.sin(3 * Mprimerad) -
       0.00034 * E * Math.sin(2 * Mprimerad - Mrad) +
       0.00032 * E * Math.sin(Mrad + 2 * Frad) +
       0.00032 * E * Math.sin(Mrad - 2 * Frad) -
       0.00028 * E2 * Math.sin(Mprimerad + 2 * Mrad) +
       0.00027 * E * Math.sin(2 * Mprimerad + Mrad) -
       0.00017 * Math.sin(Omegarad) -
       0.00005 * Math.sin(Mprimerad - Mrad - 2 * Frad) +
       0.00004 * Math.sin(2 * Mprimerad + 2 * Frad) -
       0.00004 * Math.sin(Mprimerad + Mrad + 2 * Frad) +
       0.00004 * Math.sin(Mprimerad - 2 * Mrad) +
       0.00003 * Math.sin(Mprimerad + Mrad - 2 * Frad) +
       0.00003 * Math.sin(3 * Mrad) +
       0.00002 * Math.sin(2 * Mprimerad - 2 * Frad) +
       0.00002 * Math.sin(Mprimerad - Mrad + 2 * Frad) -
       0.00002 * Math.sin(3 * Mprimerad + Mrad);

    // W correction for quarters
    const W = 0.00306 -
              0.00038 * E * Math.cos(Mrad) +
              0.00026 * Math.cos(Mprimerad) -
              0.00002 * Math.cos(Mprimerad - Mrad) +
              0.00002 * Math.cos(Mprimerad + Mrad) +
              0.00002 * Math.cos(2 * Frad);

    if (phase === 0.25) {
      correction += W;
    } else {
      correction -= W;
    }
  }

  JDE += correction;

  // Additional corrections from planetary arguments
  const additionalCorrections =
    0.000325 * Math.sin(toRadians(A1)) +
    0.000165 * Math.sin(toRadians(A2)) +
    0.000164 * Math.sin(toRadians(A3)) +
    0.000126 * Math.sin(toRadians(A4)) +
    0.000110 * Math.sin(toRadians(A5)) +
    0.000062 * Math.sin(toRadians(A6)) +
    0.000060 * Math.sin(toRadians(A7)) +
    0.000056 * Math.sin(toRadians(A8)) +
    0.000047 * Math.sin(toRadians(A9)) +
    0.000042 * Math.sin(toRadians(A10)) +
    0.000040 * Math.sin(toRadians(A11)) +
    0.000037 * Math.sin(toRadians(A12)) +
    0.000035 * Math.sin(toRadians(A13)) +
    0.000023 * Math.sin(toRadians(A14));

  JDE += additionalCorrections;

  return JDE;
}

/**
 * Calculate the lunation number (k) for a given date
 * k = 0 corresponds to the new moon of January 6, 2000
 */
function getLunationNumber(year: number, month: number): number {
  const decimalYear = year + (month - 1) / 12;
  return Math.floor((decimalYear - 2000) * 12.3685);
}

/**
 * Moon phase types
 */
export type MoonPhaseType = 'new' | 'first_quarter' | 'full' | 'last_quarter';

export interface MoonPhaseEvent {
  type: MoonPhaseType;
  julianDay: number;
  date: Date;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

/**
 * Get all moon phases for a given year
 */
export function getMoonPhasesForYear(year: number): MoonPhaseEvent[] {
  const phases: MoonPhaseEvent[] = [];
  const startK = getLunationNumber(year, 1) - 1;
  const endK = getLunationNumber(year + 1, 1) + 1;

  for (let k = startK; k <= endK; k++) {
    const phaseTypes: { type: MoonPhaseType; value: number }[] = [
      { type: 'new', value: 0 },
      { type: 'first_quarter', value: 0.25 },
      { type: 'full', value: 0.5 },
      { type: 'last_quarter', value: 0.75 }
    ];

    for (const { type, value } of phaseTypes) {
      const jde = calculatePhaseJDE(k, value);
      const dateInfo = julianToDate(jde);

      if (dateInfo.year === year) {
        const hour = Math.floor(dateInfo.hour);
        const minute = Math.round((dateInfo.hour - hour) * 60);

        phases.push({
          type,
          julianDay: jde,
          date: new Date(dateInfo.year, dateInfo.month - 1, dateInfo.day, hour, minute),
          year: dateInfo.year,
          month: dateInfo.month,
          day: dateInfo.day,
          hour,
          minute
        });
      }
    }
  }

  // Sort by Julian Day
  phases.sort((a, b) => a.julianDay - b.julianDay);

  return phases;
}

/**
 * Get the moon phase for a specific date
 * Returns a value from 0 to 1:
 * 0.00 = New Moon
 * 0.25 = First Quarter
 * 0.50 = Full Moon
 * 0.75 = Last Quarter
 */
export function getMoonPhaseForDate(date: Date): number {
  const jd = dateToJulian(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours() + date.getMinutes() / 60
  );

  // Find the nearest new moon
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const k = getLunationNumber(year, month);

  // Check surrounding lunations to find the one containing this date
  for (let kOffset = -1; kOffset <= 1; kOffset++) {
    const currentK = k + kOffset;
    const newMoonJDE = calculatePhaseJDE(currentK, 0);
    const nextNewMoonJDE = calculatePhaseJDE(currentK + 1, 0);

    if (jd >= newMoonJDE && jd < nextNewMoonJDE) {
      // Calculate phase as fraction of lunation
      const phase = (jd - newMoonJDE) / (nextNewMoonJDE - newMoonJDE);
      return phase;
    }
  }

  return 0;
}

/**
 * Get moon phase name from phase value
 */
export function getMoonPhaseName(phase: number): string {
  // Normalize to 0-1 range
  const p = ((phase % 1) + 1) % 1;

  if (p < 0.0625 || p >= 0.9375) return 'New Moon';
  if (p < 0.1875) return 'Waxing Crescent';
  if (p < 0.3125) return 'First Quarter';
  if (p < 0.4375) return 'Waxing Gibbous';
  if (p < 0.5625) return 'Full Moon';
  if (p < 0.6875) return 'Waning Gibbous';
  if (p < 0.8125) return 'Last Quarter';
  return 'Waning Crescent';
}

/**
 * Get moon illumination percentage (approximate)
 */
export function getMoonIllumination(phase: number): number {
  // Normalize to 0-1 range
  const p = ((phase % 1) + 1) % 1;
  // Illumination follows a cosine curve
  return (1 - Math.cos(p * 2 * Math.PI)) / 2 * 100;
}

/**
 * Find the next occurrence of a specific moon phase after a given date
 */
export function getNextPhase(date: Date, phaseType: MoonPhaseType): MoonPhaseEvent {
  const phaseValues: Record<MoonPhaseType, number> = {
    'new': 0,
    'first_quarter': 0.25,
    'full': 0.5,
    'last_quarter': 0.75
  };

  const jd = dateToJulian(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );

  let k = getLunationNumber(date.getFullYear(), date.getMonth() + 1);

  // Search for the next occurrence
  for (let i = 0; i < 15; i++) {
    const phaseJDE = calculatePhaseJDE(k + i, phaseValues[phaseType]);
    if (phaseJDE > jd) {
      const dateInfo = julianToDate(phaseJDE);
      const hour = Math.floor(dateInfo.hour);
      const minute = Math.round((dateInfo.hour - hour) * 60);

      return {
        type: phaseType,
        julianDay: phaseJDE,
        date: new Date(dateInfo.year, dateInfo.month - 1, dateInfo.day, hour, minute),
        year: dateInfo.year,
        month: dateInfo.month,
        day: dateInfo.day,
        hour,
        minute
      };
    }
  }

  throw new Error('Could not find next phase');
}

/**
 * Test function to validate the algorithm against known dates
 */
export function validateMoonPhases(): { date: string; expected: string; calculated: string; diff: string }[] {
  // Known full moon dates (UTC) for validation
  const knownFullMoons = [
    { year: 2019, month: 3, day: 21, hour: 1, minute: 43 },   // March 21, 2019
    { year: 2020, month: 4, day: 8, hour: 2, minute: 35 },    // April 8, 2020
    { year: 2021, month: 4, day: 27, hour: 3, minute: 31 },   // April 27, 2021
    { year: 2024, month: 9, day: 18, hour: 2, minute: 34 },   // September 18, 2024
    { year: 2000, month: 1, day: 21, hour: 4, minute: 40 },   // January 21, 2000
    { year: 1999, month: 12, day: 22, hour: 17, minute: 31 }, // December 22, 1999
  ];

  const results = [];

  for (const known of knownFullMoons) {
    const testDate = new Date(known.year, known.month - 1, 15);
    const k = getLunationNumber(known.year, known.month);

    // Find the full moon for this lunation
    const calculatedJDE = calculatePhaseJDE(k, 0.5);
    const calculated = julianToDate(calculatedJDE);

    const expectedMinutes = known.hour * 60 + known.minute;
    const calculatedMinutes = calculated.hour * 60 + Math.round((calculated.hour % 1) * 60);

    const diffMinutes = Math.abs(
      (known.day * 1440 + expectedMinutes) -
      (calculated.day * 1440 + calculated.hour * 60)
    );

    results.push({
      date: `${known.year}-${known.month}-${known.day}`,
      expected: `${known.day} ${known.hour}:${known.minute.toString().padStart(2, '0')}`,
      calculated: `${calculated.day} ${Math.floor(calculated.hour)}:${Math.round((calculated.hour % 1) * 60).toString().padStart(2, '0')}`,
      diff: `${diffMinutes} minutes`
    });
  }

  return results;
}
