import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Department } from '../data/departments';
import { Envelope, type EnvelopePhase } from './Envelope';
import { LetterCard } from './LetterCard';
import '../styles/envelope.css';

type EnvelopeSceneProps = {
  department: Department;
  onClose: () => void;
};

const OPEN_DURATION_MS = 2200;

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
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const reveal = useCallback(() => {
    clearTimer();
    setPhase('revealed');
  }, [clearTimer]);

  const openEnvelope = useCallback(() => {
    if (phase !== 'closed') return;

    if (reducedMotion) {
      reveal();
      return;
    }

    setPhase('opening');
    timerRef.current = window.setTimeout(reveal, OPEN_DURATION_MS);
  }, [phase, reducedMotion, reveal]);

  const skipToReveal = useCallback(() => {
    if (phase === 'opening') {
      reveal();
    }
  }, [phase, reveal]);

  const showLetter = phase === 'revealed';

  return (
    <AnimatePresence>
      <motion.div
        className="envelope-scene"
        style={{ '--dept-accent': department.accent } as React.CSSProperties}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={phase === 'opening' ? skipToReveal : undefined}
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

        <Envelope department={department} phase={phase} />

        {!showLetter && (
          <>
            <p className="envelope-scene__hint">
              {phase === 'closed' ? 'Нажмите, чтобы открыть конверт' : 'Открываем…'}
            </p>

            <div
              className={`envelope-scene__cta${phase !== 'closed' ? ' envelope-scene__cta--hidden' : ''}`}
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

        <AnimatePresence>
          {showLetter && (
            <div className="envelope-scene__letter-wrap">
              <LetterCard key={department.id} department={department} onBack={onClose} />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
