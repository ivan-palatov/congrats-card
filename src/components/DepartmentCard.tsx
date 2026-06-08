import { motion } from 'framer-motion';
import type { Department } from '../data/departments';
import { DepartmentIcon } from './DepartmentIcon';
import './DepartmentCard.css';

type DepartmentCardProps = {
  department: Department;
  index: number;
  onSelect: (department: Department) => void;
};

export function DepartmentCard({ department, index, onSelect }: DepartmentCardProps) {
  return (
    <motion.button
      type="button"
      className="dept-card"
      style={{ '--dept-accent': department.accent } as React.CSSProperties}
      onClick={() => onSelect(department)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      aria-label={`Открыть поздравление для отдела: ${department.name}`}
    >
      <span className="dept-card__icon" aria-hidden="true">
        <DepartmentIcon id={department.id} className="dept-card__icon-svg" />
      </span>
      <span className="dept-card__content">
        <span className="dept-card__name">{department.name}</span>
        <span className="dept-card__teaser">{department.teaser}</span>
      </span>
      <span className="dept-card__arrow" aria-hidden="true">
        →
      </span>
    </motion.button>
  );
}
