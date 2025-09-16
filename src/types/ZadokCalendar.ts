export interface ZadokDate {
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
}

export interface PriestFamily {
  name: string;
  index: number;
}

export interface CalendarDay {
  day: number;
  priestFamilyName: string;
  priestFamilyIndex: number;
  isCurrentDay: boolean;
  seasonColor: string;
  weekday: number;
}


