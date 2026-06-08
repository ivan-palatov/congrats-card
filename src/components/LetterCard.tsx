import { motion } from 'framer-motion';
import type { Department } from '../data/departments';
import { DepartmentIcon } from './DepartmentIcon';

type LetterCardProps = {
  department: Department;
  onBack: () => void;
};

export function LetterCard({ department, onBack }: LetterCardProps) {
  return (
    <motion.div
      className="letter-card"
      style={{ '--dept-accent': department.accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <span className="letter-card__icon" aria-hidden="true">
        <DepartmentIcon id={department.id} className="letter-card__icon-svg" />
      </span>
      <h2 className="letter-card__title">{department.name}</h2>
      <p className="letter-card__body">{department.message}</p>
      <div className="letter-card__footer">
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          К другим отделам
        </button>
      </div>
      <p className="letter-card__coords">АСК · 17 лет · 55.7558° N 37.6173° E</p>
    </motion.div>
  );
}
