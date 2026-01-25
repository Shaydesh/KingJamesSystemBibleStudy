import { CalendarDay, ZadokDate } from "../../types/ZadokCalendar";
import styles from "./CalendarDetails.module.css";

interface CalendarDetailsProps {
  zadokDate: ZadokDate;
  daysSinceStart: number;
  selectedDate: CalendarDay | null,
  setSelectedDate: React.Dispatch<React.SetStateAction<CalendarDay | null>>
}

export function CalendarDetails({
  zadokDate,
  daysSinceStart,
  selectedDate,
  setSelectedDate
}: CalendarDetailsProps) {
  return (
    <div className={styles.row}>
      <div className={`${styles.col} ${styles.col4}`}>
        <h3 className={styles.sectionHeader}>
          Zadok Calendar Structure
        </h3>
        <ul className={styles.detailsList}>
          <li>
            Sabbath Year Cycle Pattern:<br />
            *Year 1 - 364 days<br />
            *Year 2 - 364 days<br />
            *Year 3 - 364 days<br />
            *Year 4 - 364 days<br />
            *Year 5 - 364 days<br />
            *Year 6 - 364 days<br />
            *7 day intercalation<br />
            *Sabbath Year - 364 days
          </li>
          <li>2555 Days and 365 weeks in one Sabbath Year Cycle</li>
          <li>49 years per Jubilee cycle with the 50th year being the Jubilee year. The Jubilee year is also the first year of the next Jubilee cycle</li>
        </ul>
      </div>

      <div className={`${styles.col} ${styles.col4}`}>
        <h3 className={styles.sectionHeader}>
          Priestly Rotation מִשְׁמָר (mishmar)
        </h3>
        <ul className={styles.detailsList}>
          <li>
            24 Divisions: 24 priest families serve for 7 days each in rotation. Specified by King David in 1 Chronicles 24.
          </li>
          <li>
            Starting point of this Calendar is Gamul's 4th day (March 20, 2019) Spring Equinox - with a Full Moon
          </li>
          <li>
            Priest Service Pause on the 7 day intercalation: a priest will serve days 28-31 Month 12 of Year 6 and days 1-3 Month 1 on the Sabbath Year
          </li>
        </ul>
      </div>

      <div className={`${styles.col} ${styles.col4}`}>
        <h3 className={styles.sectionHeader}>
          Cycles and Counts
        </h3>
        <ul className={styles.detailsList}>
          <li>
            <span className={styles.label}>Current Year:</span> {zadokDate.year}
          </li>
          <li>
            <span className={styles.label}>Sabbath Cycle (7 Years):</span>{" "}
            Year {zadokDate.sabbathcycleyear} of 7
          </li>
          <li>
            <span className={styles.label}>Jubilee Cycle (49 Years):</span>{" "}
            Year {(zadokDate.year % 49) || 49} of 49
          </li>
          <li>
            <span className={styles.label}>Grand Jubilee Cycle:</span>{" "}
            Cycle {Math.floor((zadokDate.year - 1) / 49) + 1}
          </li>
          <li>
            <span className={styles.label}>Priest Rotation Count:</span>{" "}
            {(selectedDate?.priestFamilyIndex ?? -1) + 1} of 24
          </li>
          <li>
            <span className={styles.label}>Current Priest Division:</span>{" "}
            {selectedDate?.priestFamilyName}
          </li>
        </ul>
      </div>
    </div>
  );
}
