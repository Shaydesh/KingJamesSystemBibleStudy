import styles from '../ZadokCalendar/CalendarNavigation.module.css';

interface CalendarNavigationProps {
  onPreviousYear: () => void;
  onPreviousMonth: () => void;
  onToday: () => void;
  onNextMonth: () => void;
  onNextYear: () => void;
}

export function CalendarNavigation({
  onPreviousYear,
  onPreviousMonth,
  onToday,
  onNextMonth,
  onNextYear
}: CalendarNavigationProps) {
  return (


    <div className={styles.bibleChapterDiv}>
      <button onClick={onPreviousMonth}
        className={styles.previousChapterButton}
      >
        Prev
      </button>

      <h2 className={styles.bibleChapterHeader} onClick={onToday}>
        Today
      </h2>

      <button className={styles.nextChapterButton}
        onClick={onNextMonth}
      >
        Next
      </button>

    </div>


  );
}
