import { AtonementNotCompleted, ChristLordOfSabbath, ChristOurPassover, DayOfAtonement, FeastOfFirstfruits, FeastOfTabernacles, FeastOfTrumpets, FeastOfUnleavenedBread, FeastOfWeeks, LastPassoverFirstSupper, PurgeOutOldLeaven, RestOfTheLand, SacredTimesSection, ThePassover, TheSabbath, YearOfJubilee } from '../components/SacredTimes';
import styles from './SacredTimes.module.css';

export default function SacredTimes() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Sacred Times</h1>

      <SacredTimesSection title="The Sabbath">
        <TheSabbath />
      </SacredTimesSection>

      <SacredTimesSection title="Christ is Lord of the Sabbath">
        <ChristLordOfSabbath />
      </SacredTimesSection>

      <SacredTimesSection title="The Rest of the Land in the Seventh Year">
        <RestOfTheLand />
      </SacredTimesSection>

      <SacredTimesSection title="The Fiftieth Year, the year of Jubilee">
        <YearOfJubilee />
      </SacredTimesSection>

      <SacredTimesSection title="The Passover">
        <ThePassover />
      </SacredTimesSection>

      <SacredTimesSection title="The Last Passover and the First Supper of Our Lord">
        <LastPassoverFirstSupper />
      </SacredTimesSection>

      <SacredTimesSection title="Christ our Passover">
        <ChristOurPassover />
      </SacredTimesSection>

      <SacredTimesSection title="The Feast of Unleavened Bread">
        <FeastOfUnleavenedBread />
      </SacredTimesSection>

      <SacredTimesSection title="Purge Out the Old Leaven">
        <PurgeOutOldLeaven />
      </SacredTimesSection>

      <SacredTimesSection title="The Feast of Firstfruits">
        <FeastOfFirstfruits />
      </SacredTimesSection>

      <SacredTimesSection title="The Feast of Weeks, or Pentecost">
        <FeastOfWeeks />
      </SacredTimesSection>

      <SacredTimesSection title="The Feast of Trumpets">
        <FeastOfTrumpets />
      </SacredTimesSection>

      <SacredTimesSection title="The Day of Atonement">
        <DayOfAtonement />
      </SacredTimesSection>

      <SacredTimesSection title="Atonement Not Completed Under the Law">
        <AtonementNotCompleted />
      </SacredTimesSection>

      <SacredTimesSection title="The Feast of Tabernacles or Booths">
        <FeastOfTabernacles />
      </SacredTimesSection>
    </div>
  );
}
