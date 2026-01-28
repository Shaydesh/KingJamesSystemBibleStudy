import React, { useMemo } from "react";
import { getMoonPhaseForDate, getMoonPhaseName, getMoonIllumination } from "../../data/moonPhaseCalculations";
import { zadokToGregorian } from "../../data/calendarCalculations";
import { ZadokDate, CalendarDay } from "../../types/ZadokCalendar";
import styles from "./MoonPhase.module.css";

interface MoonPhaseProps {
  zadokDate: ZadokDate;
  selectedDate: CalendarDay | null;
}

const RADIUS = 60;
const CENTER = 75;

const MoonPhase: React.FC<MoonPhaseProps> = ({ zadokDate, selectedDate }) => {
  // Calculate the Gregorian date from selected Zadok date
  // Use end of day (23:00) for more accurate phase display
  const gregorianDate = useMemo(() => {
    const day = selectedDate?.day || zadokDate.day;
    const date = zadokToGregorian(zadokDate.year, zadokDate.month, day);
    date.setHours(23, 0, 0, 0); // Set to end of day for better accuracy
    return date;
  }, [zadokDate.year, zadokDate.month, zadokDate.day, selectedDate?.day]);

  // Calculate moon phase for the date
  const moonPhase = useMemo(() => {
    return getMoonPhaseForDate(gregorianDate);
  }, [gregorianDate]);

  const phaseName = getMoonPhaseName(moonPhase);
  const illumination = getMoonIllumination(moonPhase);

  // Generate the moon SVG - classic engraved style
  const renderMoon = () => {
    const phase = moonPhase;

    // Colors matching calendar and season wheel
    const darkColor = "#333";
    const lightColor = "#f4f4f4";
    const strokeColor = "#333";

    let illuminatedPath: JSX.Element | null = null;

    if (phase < 0.03 || phase > 0.97) {
      // New moon - dark circle with subtle border
      return (
        <>
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill={darkColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
        </>
      );
    } else if (Math.abs(phase - 0.5) < 0.03) {
      // Full moon - light circle
      return (
        <>
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill={lightColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
        </>
      );
    } else {
      // Partial illumination
      const isWaxing = phase < 0.5;
      const adjustedPhase = isWaxing ? phase * 2 : (phase - 0.5) * 2;
      const curveX = RADIUS * Math.cos(adjustedPhase * Math.PI);

      let pathD: string;

      if (isWaxing) {
        if (phase < 0.25) {
          pathD = `
            M ${CENTER} ${CENTER - RADIUS}
            A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER} ${CENTER + RADIUS}
            A ${Math.abs(curveX)} ${RADIUS} 0 0 1 ${CENTER} ${CENTER - RADIUS}
          `;
        } else {
          pathD = `
            M ${CENTER} ${CENTER - RADIUS}
            A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER} ${CENTER + RADIUS}
            A ${Math.abs(curveX)} ${RADIUS} 0 0 0 ${CENTER} ${CENTER - RADIUS}
          `;
        }
      } else {
        if (phase < 0.75) {
          pathD = `
            M ${CENTER} ${CENTER - RADIUS}
            A ${RADIUS} ${RADIUS} 0 0 0 ${CENTER} ${CENTER + RADIUS}
            A ${Math.abs(curveX)} ${RADIUS} 0 0 1 ${CENTER} ${CENTER - RADIUS}
          `;
        } else {
          pathD = `
            M ${CENTER} ${CENTER - RADIUS}
            A ${RADIUS} ${RADIUS} 0 0 0 ${CENTER} ${CENTER + RADIUS}
            A ${Math.abs(curveX)} ${RADIUS} 0 0 0 ${CENTER} ${CENTER - RADIUS}
          `;
        }
      }

      illuminatedPath = (
        <path
          d={pathD}
          fill={lightColor}
        />
      );

      return (
        <>
          {/* Dark base */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill={darkColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
          {/* Illuminated portion */}
          {illuminatedPath}
          {/* Clean border */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1.5"
          />
        </>
      );
    }
  };

  return (
    <div className={styles.moonPhaseContainer}>
      <h3 className={styles.title}>Moon Phase</h3>
      <svg
        className={styles.moonPhaseSvg}
        viewBox="0 0 150 150"
        preserveAspectRatio="xMidYMid meet"
      >
        {renderMoon()}
      </svg>
      <div className={styles.moonPhaseInfo}>
        <p className={styles.phaseName}>{phaseName}</p>
        <p className={styles.illumination}>{Math.round(illumination)}%</p>
      </div>
    </div>
  );
};

export default MoonPhase;
