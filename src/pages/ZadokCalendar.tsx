import { CalendarDetails } from '../components/ZadokCalendar/CalendarDetails';
import { CalendarDisplay } from '../components/ZadokCalendar/CalendarDisplay';
import { CalendarHeader } from '../components/ZadokCalendar/CalendarHeader';
import { CalendarNavigation } from '../components/ZadokCalendar/CalendarNavigation';
import { PriestFamiliesList } from '../components/ZadokCalendar/PriestFamiliesList';
import SeasonWheel from '../components/ZadokCalendar/SeasonWheel';
import { useZadokCalendar } from '../hooks/useZadokCalendar';


export default function ZadokCalendar() {
  const {
    selectedDate,
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
    formattedDate,
    formattedMonthYear,
    daysSinceCalendarStart,
    setSelectedDate
  } = useZadokCalendar();

  const cycleInfo = zadokDate.isJubilee
    ? `Year: ${zadokDate.year}, Month: ${zadokDate.month} Day: ${zadokDate.day} (Sabbath Year)`
    : `Year: ${zadokDate.year}, Month: ${zadokDate.month} Day: ${zadokDate.day}`;

  return (
    <>

      <div className="bibleBookHeader">


        <CalendarNavigation
          onPreviousYear={goToPreviousYear}
          onPreviousMonth={goToPreviousMonth}
          onToday={goToToday}
          onNextMonth={goToNextMonth}
          onNextYear={goToNextYear}
        />

        <CalendarHeader
          currentDate={formattedDate()}
          cycleInfo={cycleInfo}
        />
      </div>


      <div className="container">
        <div className="row">
          <div className="col col-6">

            <CalendarDisplay
              monthYearTitle={formattedMonthYear()}
              calendarGrid={calendarGrid}
              isJubileeYear={zadokDate.isJubilee}
              currentDate={formattedDate()}
              currentPriestFamily={currentPriestFamily}
              zadokDate={zadokDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}

            />
          </div>

          <div className="col col-6">
            <SeasonWheel zadokDate={zadokDate} />
          </div>

        </div>

        <PriestFamiliesList
          // currentPriestFamilyIndex={currentPriestFamily.index}
          currentPriestFamilyIndex={Number(selectedDate?.priestFamilyIndex)}
        />

        <CalendarDetails
          zadokDate={zadokDate}
          daysSinceStart={daysSinceCalendarStart()}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

      </div>

      {/* </div>
      </main> */}
    </>
  );
}

