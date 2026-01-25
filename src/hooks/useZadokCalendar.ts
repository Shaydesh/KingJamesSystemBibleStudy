import { useCallback, useEffect, useState } from "react";
import {
  getDaysInMonth,
  getNextPriestFamily,
  getSeasonForMonth,
  getWeekday,
  gregorianToZadok,
  PRIEST_FAMILIES,
  ZADOK_CALENDAR_START,
  zadokToGregorian
} from "../data/calendarCalculations";
import { CalendarDay, PriestFamily, ZadokDate } from "../types/ZadokCalendar";

export function useZadokCalendar() {
  // Current date in Gregorian calendar
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // Current date in Zadok calendar
  const [zadokDate, setZadokDate] = useState<ZadokDate>(() =>
    gregorianToZadok(currentDate),
  );

  // Current month's calendar grid
  const [calendarGrid, setCalendarGrid] = useState<CalendarDay[][]>([]);

  const [selectedDate, setSelectedDate] = useState<CalendarDay | null>(null);
  // Current priest family
  const [currentPriestFamily, setCurrentPriestFamily] = useState<PriestFamily>({
    name: PRIEST_FAMILIES[zadokDate.priestFamilyIndex],
    index: zadokDate.priestFamilyIndex,
  });

  // Next priest family
  const [nextPriestFamily, setNextPriestFamily] = useState<PriestFamily>(() =>
    getNextPriestFamily(zadokDate.priestFamilyIndex),
  );

  // Days until next priest family
  const [daysUntilNextPriest, setDaysUntilNextPriest] = useState<number>(
    8 - zadokDate.dayInRotation,
  );

  // Generate the calendar grid for the current month
  const generateCalendarGrid = useCallback(() => {
    const { month, year, day, yearInCycle } = zadokDate;
    const daysInMonth = getDaysInMonth(month);
    const grid: CalendarDay[][] = [];
    let weekRow: CalendarDay[] = [];
    let todayCalendarDay: CalendarDay | null = null;

    // Calculate the weekday for the first day of the month (1-7)
    const firstDayWeekday = getWeekday(year, month, 1);

    // Add empty cells for days before the first day of the month
    for (let i = 1; i < firstDayWeekday; i++) {
      weekRow.push({
        day: 0,
        priestFamilyName: "",
        priestFamilyIndex: -1,
        isCurrentDay: false,
        seasonColor: "bg-transparent",
        weekday: i,
      });
    }

    // Generate all days for the month
    for (let d = 1; d <= daysInMonth; d++) {
      // Calculate the weekday for this date (1-7)
      const weekday = getWeekday(year, month, d);

      // If we're starting a new week
      if (weekRow.length === 7) {
        grid.push(weekRow);
        weekRow = [];
      }

      // Calculate the priest family for this day
      const gregDate = zadokToGregorian(year, month, d);
      const tempZadokDate = gregorianToZadok(gregDate);
      const priestFamilyIndex = tempZadokDate.priestFamilyIndex;
      const priestFamilyName = PRIEST_FAMILIES[priestFamilyIndex];

      // Get the season color
      const { color: seasonColor } = getSeasonForMonth(month);

      const today = new Date();
      const isToday = gregDate.getFullYear() === today.getFullYear() && gregDate.getMonth() === today.getMonth() && gregDate.getDate() === today.getDate();

      // Create calendar day object
      const calendarDay: CalendarDay = {
        day: d,
        priestFamilyName,
        priestFamilyIndex,
        isCurrentDay: isToday,
        seasonColor: d === day ? seasonColor : "bg-gray-100",
        weekday,
      };

      if (isToday) {
        todayCalendarDay = calendarDay;
      }

      weekRow.push(calendarDay);
    }

    // Add the last week if there are any days left
    if (weekRow.length > 0) {
      // Fill the remaining cells in the last week with empty cells
      while (weekRow.length < 7) {
        weekRow.push({
          day: 0,
          priestFamilyName: "",
          priestFamilyIndex: -1,
          isCurrentDay: false,
          seasonColor: "bg-transparent",
          weekday: weekRow.length + 1,
        });
      }
      grid.push(weekRow);
    }

    setCalendarGrid(grid);

    if (todayCalendarDay) {
      setSelectedDate(todayCalendarDay);
    }
  }, [zadokDate]);

  // Update all the state when zadokDate changes
  useEffect(() => {
    // Update current priest family
    setCurrentPriestFamily({
      name: PRIEST_FAMILIES[zadokDate.priestFamilyIndex],
      index: zadokDate.priestFamilyIndex,
    });

    // Update next priest family
    setNextPriestFamily(getNextPriestFamily(zadokDate.priestFamilyIndex));

    // Update days until next priest
    setDaysUntilNextPriest(8 - zadokDate.dayInRotation);

    // Generate calendar grid
    generateCalendarGrid();
  }, [zadokDate, generateCalendarGrid]);

  // Navigate to the previous month
  const goToPreviousMonth = useCallback(() => {
    const { year, month } = zadokDate;

    let newMonth = month - 1;
    let newYear = year;

    if (newMonth < 1) {
      newMonth = 12;
      newYear = year - 1;

      if (newYear < 1) {
        // Don't go before the start of the calendar
        return;
      }
    }

    // Convert to gregorian and back to update all zadok date fields
    const newDate = zadokToGregorian(newYear, newMonth, 1);
    const newZadokDate = gregorianToZadok(newDate);

    const firstDay: CalendarDay = {
      day: newZadokDate.day,
      priestFamilyName: PRIEST_FAMILIES[newZadokDate.priestFamilyIndex],
      priestFamilyIndex: newZadokDate.priestFamilyIndex,
      isCurrentDay: true,
      seasonColor: "green",
      weekday: getWeekday(newZadokDate.year, newZadokDate.month, newZadokDate.day)

    };

    setSelectedDate(firstDay);
    setCurrentDate(newDate);
    setZadokDate(newZadokDate);
  }, [zadokDate]);

  // Navigate to the next month
  const goToNextMonth = useCallback(() => {
    const { year, month } = zadokDate;

    let newMonth = month + 1;
    let newYear = year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear = year + 1;
    }

    // Convert to gregorian and back to update all zadok date fields
    const newDate = zadokToGregorian(newYear, newMonth, 1);
    const newZadokDate = gregorianToZadok(newDate);

    const firstDay: CalendarDay = {
      day: newZadokDate.day,
      priestFamilyName: PRIEST_FAMILIES[newZadokDate.priestFamilyIndex],
      priestFamilyIndex: newZadokDate.priestFamilyIndex,
      isCurrentDay: true,
      seasonColor: "green",
      weekday: getWeekday(newZadokDate.year, newZadokDate.month, newZadokDate.day)

    };

    setSelectedDate(firstDay);
    setCurrentDate(newDate);
    setZadokDate(newZadokDate);
  }, [zadokDate]);

  // Navigate to the previous year
  const goToPreviousYear = useCallback(() => {
    const { year, month, day } = zadokDate;

    if (year <= 1) {
      // Don't go before the start of the calendar
      return;
    }

    const newYear = year - 1;

    // Convert to gregorian and back to update all zadok date fields
    const newDate = zadokToGregorian(
      newYear,
      month,
      Math.min(day, getDaysInMonth(month)),
    );
    const newZadokDate = gregorianToZadok(newDate);

    setCurrentDate(newDate);
    setZadokDate(newZadokDate);
  }, [zadokDate]);

  // Navigate to the next year
  const goToNextYear = useCallback(() => {
    const { year, month, day } = zadokDate;

    const newYear = year + 1;

    // Convert to gregorian and back to update all zadok date fields
    const newDate = zadokToGregorian(
      newYear,
      month,
      Math.min(day, getDaysInMonth(month)),
    );
    const newZadokDate = gregorianToZadok(newDate);

    setCurrentDate(newDate);
    setZadokDate(newZadokDate);
  }, [zadokDate]);

  // Navigate to today
  const goToToday = useCallback(() => {
    const today = new Date();
    const todayZadokDate = gregorianToZadok(today);

    setCurrentDate(today);
    setZadokDate(todayZadokDate);
  }, []);

  // Navigate to a specific Zadok date
  const goToDate = useCallback(
    (year: number, month: number, day: number) => {
      if (
        year < 1 ||
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > getDaysInMonth(month)
      ) {
        return;
      }

      const newDate = zadokToGregorian(year, month, day);
      const newZadokDate = gregorianToZadok(newDate);

      setCurrentDate(newDate);
      setZadokDate(newZadokDate);
    },
    [],
  );

  // Format current date string for display
  const formattedDate = useCallback(() => {
    const { month, day, year, isJubilee } = zadokDate;
    return `Month ${month}, Day ${day}, Year ${year}${isJubilee ? " (Sabbath Year)" : ""}`;
  }, [zadokDate]);

  // Format current month-year string for display
  const formattedMonthYear = useCallback(() => {
    const { month, year } = zadokDate;
    return `Month ${month}, Year ${year}`;
  }, [zadokDate]);

  // Calculate days since start of calendar
  const daysSinceCalendarStart = useCallback(() => {
    const diff = currentDate.getTime() - ZADOK_CALENDAR_START.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }, [currentDate]);

  return {
    selectedDate,
    currentDate,
    zadokDate,
    calendarGrid,
    currentPriestFamily,
    nextPriestFamily,
    daysUntilNextPriest,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousYear,
    goToNextYear,
    goToToday,
    goToDate,
    formattedDate,
    formattedMonthYear,
    daysSinceCalendarStart,
    setSelectedDate
  };
}
