
interface CalendarHeaderProps {
  currentDate: string;
  cycleInfo: string;
}

export function CalendarHeader({ currentDate, cycleInfo }: CalendarHeaderProps) {
  return (
    <header>
      <div>
        <h1>Zadok Priestly Calendar</h1>
        <div>
          <div style={{ marginBottom: '20px' }}>
            <span id="current-date" ><b>{cycleInfo}</b></span>
          </div>
        </div>
      </div>
    </header>
  );
}
