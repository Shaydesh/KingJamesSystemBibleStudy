// components/SeasonWheel.tsx
import React from "react";
import { SEASONS } from "../../data/calendarCalculations";
import { ZadokDate } from "../../types/ZadokCalendar";
import styles from "../ZadokCalendar/SeasonWheel.module.css";

interface SeasonWheelProps {
  zadokDate: ZadokDate;
}

const RADIUS = 150;
const CENTER = RADIUS + 20;
const OUTER_RADIUS = RADIUS;
const MIDDLE_RADIUS = RADIUS * 0.75;
const INNER_RADIUS = RADIUS * 0.4;

const getSubSeasonLabel = (month: number): string => {
  const parts = ["Spring", "Mid Spring", "Late Spring", "Summer", "Mid Summer", "Late Summer", "Autumn", "Mid Autumn", "Late Autumn", "Winter", "Mid Winter", "Late Winter"];
  return parts[month - 1] || "";
};

const SeasonWheel: React.FC<SeasonWheelProps> = ({ zadokDate }) => {
  const currentMonth = zadokDate.month;

  const renderOuterRing = () => {
    const sectors = [];

    for (let i = 0; i < 12; i++) {
      const angle = (360 / 12) * i;
      const startAngle = (Math.PI / 180) * (angle - 90);
      const endAngle = (Math.PI / 180) * (angle + 30 - 90);

      const x1 = CENTER + OUTER_RADIUS * Math.cos(startAngle);
      const y1 = CENTER + OUTER_RADIUS * Math.sin(startAngle);
      const x2 = CENTER + OUTER_RADIUS * Math.cos(endAngle);
      const y2 = CENTER + OUTER_RADIUS * Math.sin(endAngle);

      const x3 = CENTER + MIDDLE_RADIUS * Math.cos(endAngle);
      const y3 = CENTER + MIDDLE_RADIUS * Math.sin(endAngle);
      const x4 = CENTER + MIDDLE_RADIUS * Math.cos(startAngle);
      const y4 = CENTER + MIDDLE_RADIUS * Math.sin(startAngle);

      const seasonIndex = Math.floor(i / 3);
      const color = SEASONS[seasonIndex].color;
      const isActive = i + 1 === currentMonth;

      sectors.push(
        <path
          key={`outer-${i}`}
          d={`M${x1},${y1} A${OUTER_RADIUS},${OUTER_RADIUS} 0 0 1 ${x2},${y2} L${x3},${y3} A${MIDDLE_RADIUS},${MIDDLE_RADIUS} 0 0 0 ${x4},${y4} Z`}
          // fill={isActive ? `var(--${color})` : "#f4f4f4"}
          fill={isActive ? '#333' : '#f4f4f4'}
          stroke="#333"
          strokeWidth="0.5"
        />
      );

      // Label
      const labelAngle = (angle + 15 - 90) * (Math.PI / 180);
      // const labelRadius = (OUTER_RADIUS + MIDDLE_RADIUS) / 2;
      //const labelRadius = OUTER_RADIUS + 15;
      //const labelRadius = OUTER_RADIUS + (i === 9 ? 5 : 15 : i === 8 ? 5 : 15);
      const labelRadius = OUTER_RADIUS + (i === 9 ? 5 : (i === 8 ? 5 : 15));

      const labelX = CENTER + labelRadius * Math.cos(labelAngle);
      const labelY = CENTER + labelRadius * Math.sin(labelAngle);

      sectors.push(
        <text
          key={`outer-label-${i}`}
          x={labelX}
          y={labelY}
          fontSize="10"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {getSubSeasonLabel(i + 1)}
        </text>
      );
    }

    return sectors;
  };

  const renderMiddleRing = () => {
    const sectors = [];

    for (let i = 0; i < 4; i++) {
      const angle = (360 / 4) * i;
      const startAngle = (Math.PI / 180) * (angle - 90);
      const endAngle = (Math.PI / 180) * (angle + 90 - 90);

      const x1 = CENTER + MIDDLE_RADIUS * Math.cos(startAngle);
      const y1 = CENTER + MIDDLE_RADIUS * Math.sin(startAngle);
      const x2 = CENTER + MIDDLE_RADIUS * Math.cos(endAngle);
      const y2 = CENTER + MIDDLE_RADIUS * Math.sin(endAngle);

      const x3 = CENTER + INNER_RADIUS * Math.cos(endAngle);
      const y3 = CENTER + INNER_RADIUS * Math.sin(endAngle);
      const x4 = CENTER + INNER_RADIUS * Math.cos(startAngle);
      const y4 = CENTER + INNER_RADIUS * Math.sin(startAngle);

      const season = SEASONS[i];

      sectors.push(
        <path
          key={`middle-${i}`}
          d={`M${x1},${y1} A${MIDDLE_RADIUS},${MIDDLE_RADIUS} 0 0 1 ${x2},${y2} L${x3},${y3} A${INNER_RADIUS},${INNER_RADIUS} 0 0 0 ${x4},${y4} Z`}
          fill="#ffffff"
          stroke="#333"
          strokeWidth="0.5"
        />
      );

      // Label
      const labelAngle = (angle + 45 - 90) * (Math.PI / 180);
      const labelRadius = (MIDDLE_RADIUS + INNER_RADIUS) / 2;
      const labelX = CENTER + labelRadius * Math.cos(labelAngle);
      const labelY = CENTER + labelRadius * Math.sin(labelAngle);

      sectors.push(
        <text
          key={`middle-label-${i}`}
          x={labelX}
          y={labelY}
          fontSize="12"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {season.name}
        </text>
      );
    }

    return sectors;
  };

  const renderInnerCircle = () => {
    return (
      <>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_RADIUS}
          fill="#fff"
          stroke="#333"
          strokeWidth="0.5"
        />
        <text
          x={CENTER}
          y={CENTER - 10}
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
        >
          Zadok Calendar
        </text>
        <text
          x={CENTER}
          y={CENTER + 10}
          fontSize="10"
          textAnchor="middle"
        >
          {`Year ${zadokDate.year}`}
        </text>
        {zadokDate.isJubilee && (
          <text
            x={CENTER}
            y={CENTER + 25}
            fontSize="10"
            textAnchor="middle"
          >
            (Sabbath Year)
          </text>
        )}
      </>
    );
  };

  return (
    <div className={styles.enochCalendarContainer}>
      <svg className={styles.enochCalendarSvg} viewBox={`0 0 ${CENTER * 2 + 18.5} ${CENTER * 2 + 18.5}`} preserveAspectRatio="xMidYMid meet">
        {renderOuterRing()}
        {renderMiddleRing()}
        {renderInnerCircle()}
      </svg>
    </div>
  );
};

export default SeasonWheel;
