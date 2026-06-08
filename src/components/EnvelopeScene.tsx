import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Department } from '../data/departments';
import { Envelope, type EnvelopePhase } from './Envelope';
import { LetterCard } from './LetterCard';
import '../styles/envelope.css';

type EnvelopeSceneProps = {
  department: Department;
  onClose: () => void;
};

const OPEN_SEQUENCE_MS = 2400;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

export function EnvelopeScene({ department, onClose }: EnvelopeSceneProps) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<EnvelopePhase>('closed');

  const openEnvelope = useCallback(() => {
    if (phase !== 'closed') return;

    if (reducedMotion) {
      setPhase('open');
      return;
    }

    setPhase('opening');
    window.setTimeout(() => setPhase('open'), OPEN_SEQUENCE_MS);
  }, [phase, reducedMotion]);

  const skipToOpen = useCallback(() => {
    if (phase === 'opening') {
      setPhase('open');
    }
  }, [phase]);

  return (
    <AnimatePresence>
      <motion.div
        className="envelope-scene"
        style={{ '--dept-accent': department.accent } as React.CSSProperties}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={phase === 'opening' ? skipToOpen : undefined}
      >
        <div className="envelope-scene__bg" />

        <button
          type="button"
          className="btn btn--ghost envelope-scene__back-btn"
          onClick={onClose}
          aria-label="Вернуться к списку отделов"
        >
          ← Назад
        </button>

        {phase !== 'open' && (
          <>
            <Envelope department={department} phase={phase} />

            <p className="envelope-scene__hint">
              {phase === 'closed'
                ? 'Нажмите, чтобы открыть конверт'
                : 'Открываем…'}
            </p>

            <div
              className={`envelope-scene__cta ${phase !== 'closed' ? 'envelope-scene__cta--hidden' : ''}`}
            >
              <button
                type="button"
                className="btn btn--primary"
                onClick={openEnvelope}
                aria-label={`Открыть поздравление для ${department.name}`}
              >
                Открыть поздравление
              </button>
            </div>
          </>
        )}

        {phase === 'open' && <LetterCard department={department} onBack={onClose} />}
      </motion.div>
    </AnimatePresence>
  );
}
