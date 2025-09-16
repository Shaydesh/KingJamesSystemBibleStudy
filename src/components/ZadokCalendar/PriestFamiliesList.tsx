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
        <h2 style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
        }}>Priest Family Order</h2>
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