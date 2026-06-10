import { motion } from 'framer-motion';
import type { Department } from '../data/departments';
import { DepartmentIcon } from './DepartmentIcon';

type LetterCardProps = {
  department: Department;
  onBack: () => void;
  morphing?: boolean;
};

const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;

export function LetterCard({ department, onBack, morphing = false }: LetterCardProps) {
  return (
    <motion.div
      className="letter-card"
      style={{ '--dept-accent': department.accent } as React.CSSProperties}
      initial={
        morphing
          ? { scale: 0.36, y: -46, opacity: 0.88, borderRadius: 4, boxShadow: '0 2px 14px rgba(0,0,0,0.12)' }
          : { opacity: 0, y: 24, scale: 0.96 }
      }
      animate={{
        scale: 1,
        y: 0,
        opacity: 1,
        borderRadius: 8,
        boxShadow: '0 24px 80px rgba(0, 0, 0, 0.5)',
      }}
      transition={{
        duration: morphing ? 1.05 : 0.55,
        ease: smoothEase,
      }}
    >
      <motion.span
        className="letter-card__icon"
        aria-hidden="true"
        initial={{ opacity: morphing ? 0 : 1, scale: morphing ? 0.8 : 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: morphing ? 0.42 : 0, duration: 0.5, ease: smoothEase }}
      >
        <DepartmentIcon id={department.id} className="letter-card__icon-svg" />
      </motion.span>

      <motion.h2
        className="letter-card__title"
        initial={{ opacity: morphing ? 0.7 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: smoothEase }}
      >
        {department.name}
      </motion.h2>

      <motion.div
        className="letter-card__expandable"
        initial={{ opacity: 0, y: morphing ? 10 : 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: morphing ? 0.5 : 0.1,
          duration: 0.7,
          ease: smoothEase,
        }}
      >
        <p className="letter-card__body">{department.message}</p>
        <div className="letter-card__footer">
          <button type="button" className="btn btn--ghost" onClick={onBack}>
            К другим отделам
          </button>
        </div>
        <p className="letter-card__coords">АСК · 12 лет · 55.7558° N 37.6173° E</p>
      </motion.div>
    </motion.div>
  );
}
