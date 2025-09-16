import { PRIEST_FAMILIES } from '../../data/calendarCalculations';
import styles from '../ZadokCalendar/PriestFamiliesList.module.css';

interface PriestFamiliesListProps {
  currentPriestFamilyIndex: number;
}

export function PriestFamiliesList({ currentPriestFamilyIndex }: PriestFamiliesListProps) {
  return (
    <div className={styles.priestFamiliesContainer}>

      <div style={{
        display: 'flex', alignItems: 'left', justifyContent: 'left', backgroundColor: '#333',
        color: 'white', paddingLeft: '12px'
      }}>
        <h2>Priest Families Rotation</h2>
      </div>

      <div className={styles.priestFamiliesGrid}>
        {PRIEST_FAMILIES.map((family, index) => (
          <div
            key={index}
            className={`${styles.priestFamilyItem} ${index === currentPriestFamilyIndex ? `${styles.selected}` : ''}`}
          >
            {index + 1}. {family}
          </div>
        ))}
      </div>
    </div>
  );
}