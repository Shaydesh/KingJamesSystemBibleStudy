import { CalendarDay, PriestFamily, ZadokDate } from '../../types/ZadokCalendar';
import styles from '../ZadokCalendar/CalendarDisplay.module.css';

interface CalendarDisplayProps {
  monthYearTitle: string,
  calendarGrid: CalendarDay[][],
  isJubileeYear: boolean,
  currentDate: string,
  currentPriestFamily: PriestFamily,
  zadokDate: ZadokDate,
  selectedDate: CalendarDay | null,
  setSelectedDate: React.Dispatch<React.SetStateAction<CalendarDay | null>>

}

export function CalendarDisplay({
  monthYearTitle,
  calendarGrid,
  isJubileeYear,
  currentDate,
  currentPriestFamily,
  zadokDate,
  selectedDate,
  setSelectedDate

}: CalendarDisplayProps) {
  const weekdayLabels = ["1 יוֹם", "2 יוֹם", "3 יוֹם", "4 יוֹם", "5 יוֹם", "6 יוֹם", "שָׁבַת"];

  return (
    <div className="calendar-wrapper">

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#333',
        color: 'white'
      }}>
        <h2>Month {zadokDate.month}</h2>
      </div>

      <div>
        <h3>Priest Course : {selectedDate?.priestFamilyName}</h3>
      </div>



      <div className={styles.calendar}>

        <ul className={styles.weekdays}>
          {weekdayLabels.map((day) => (
            <li key={day} className=""><abbr title={day}>{day}</abbr></li>
          ))}
        </ul>

        <ol className={styles.dayGrid}>
          {calendarGrid.map((week, weekIndex) =>
            week.map((day, dayIndex) => {
              const isSelected =
                selectedDate &&
                selectedDate.day === day.day &&
                selectedDate.priestFamilyIndex === day.priestFamilyIndex;

              return (
                <li
                  key={`${weekIndex}-${dayIndex}`}
                  className={isSelected ? `${styles.currentDay}` : ''}
                  style={{ visibility: day.day === 0 ? 'hidden' : 'visible' }}
                  onClick={() => setSelectedDate(day)} // optional: make it clickable
                >
                  <span className={styles.dayNumber}>{day.day}</span>
                  <span className={styles.dayName} title={day.priestFamilyName}>
                    {day.priestFamilyName.slice(0, 3)}
                  </span>
                </li>
              );
            })
          )}
        </ol>

      </div>

      {/* <div className="p-4 border-t">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-spring mr-2"></div>
            <span className="text-sm">Spring</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-summer mr-2"></div>
            <span className="text-sm">Summer</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-autumn mr-2"></div>
            <span className="text-sm">Autumn</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-winter mr-2"></div>
            <span className="text-sm">Winter</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-jubilee mr-2"></div>
            <span className="text-sm">Jubilee</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
