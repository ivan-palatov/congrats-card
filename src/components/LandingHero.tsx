import { motion } from 'framer-motion';
import './LandingHero.css';

type LandingHeroProps = {
  onSelectDepartment: () => void;
};

export function LandingHero({ onSelectDepartment }: LandingHeroProps) {
  return (
    <section className="hero" id="top">
      <motion.div
        className="hero__compass"
        initial={{ opacity: 0, rotate: -30 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <div className="hero__compass-ring" />
        <div className="hero__compass-needle" />
        <div className="hero__compass-center" />
      </motion.div>

      <motion.p
        className="mono hero__coords"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        55.7558° N · 17 лет на курсе
      </motion.p>

      <motion.h1
        className="hero__title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.7 }}
      >
        17 лет <span className="hero__ask">АСК</span>
      </motion.h1>

      <motion.p
        className="hero__subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        Спасибо каждому отделу — вы ведёте нас верным курсом
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <button type="button" className="btn btn--primary" onClick={onSelectDepartment}>
          Выбрать отдел
        </button>
      </motion.div>

      <motion.div
        className="hero__radar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-hidden="true"
      >
        <div className="hero__radar-sweep" />
      </motion.div>
    </section>
  );
}
