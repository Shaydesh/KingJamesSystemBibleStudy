import { CalendarDay, ZadokDate } from "../../types/ZadokCalendar";
import styles from "../ZadokCalendar/CalendarDetails.module.css";

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
      <div className="col col-4">

        <h3 className="bibleBookHeader">
          Zadok Calendar Structure
        </h3>

        <ul style={{ fontSize: "20px" }}>
          <li style={{ paddingBottom: "10px" }}>Sabbath Year Cycle Pattern :<br /> *Year 1 - 364 days<br /> *Year 2 - 364 days<br /> *Year 3 - 364 days <br /> *Year 4 - 364 days<br /> *Year 5 - 364 days<br /> *Year 6 - 364 days <br /> *7 day intercallation <br /> *Sabbath Year - 364 days</li>
          <li style={{ paddingBottom: "10px" }}>2555 Days and 365 weeks in one Sabbath Year Cycle</li>
          <li style={{ paddingBottom: "10px" }}>49 years per Jubilee cycle with the 50th year being the Jubilee year. The Jubilee year is also the first year of the next Jubilee cycle</li>
        </ul>
      </div>

      <div className="col col-4">
        <h3 className="bibleBookHeader">
          Priestly Rotation מִשְׁמָר (mishmar)
        </h3>
        <ul style={{ fontSize: "20px" }}>
          <li style={{ paddingBottom: "10px" }}>
            24 Divisions: 24 priest families serve for 7 days each in rotation.  Specified by King David in 1 Chronicles 24.
          </li>
          <li style={{ paddingBottom: "10px" }}>
            Starting point of this Calendar is Gamul's 4th day (March 20, 2019) Spring Equinox - with a Full Moon
          </li>
          <li style={{ paddingBottom: "10px" }}>
            Priest Service Pause on the 7 day intercallation: a priest will serve days 28-31 Month 12 of Year 6 and days 1-3 Month 1 on the Sabbath Year
          </li>
        </ul>
      </div>

      <div className="col col-4">
        <h3 className="bibleBookHeader">
          Cycles and Counts
        </h3>
        <ul style={{ fontSize: "20px" }}>
          <li style={{ paddingBottom: "10px" }}>
            <span className="">Current Year:</span> {zadokDate.year}
          </li>
          <li style={{ paddingBottom: "10px" }}>
            <span className="">Sabbath Cycle (7 Years):</span>{" "}
            Year {zadokDate.sabbathcycleyear} of 7
          </li>
          <li style={{ paddingBottom: "10px" }}>
            <span className="">Jubilee Cycle (49 Years):</span>{" "}
            Year {(zadokDate.year % 49) || 49} of 49
          </li>
          <li style={{ paddingBottom: "10px" }}>
            <span className="">Grand Jubilee Cycle:</span>{" "}
            Cycle {Math.floor((zadokDate.year - 1) / 49) + 1}
          </li>
          <li style={{ paddingBottom: "10px" }}>
            <span className="">Priest Rotation Count:</span>{" "}
            {(selectedDate?.priestFamilyIndex ?? -1) + 1} of 24
          </li>
          <li style={{ paddingBottom: "10px" }}>
            <span className="">Current Priest Division:</span>{" "}
            {selectedDate?.priestFamilyName}
          </li>
        </ul>
      </div>
    </div>
  );
}
