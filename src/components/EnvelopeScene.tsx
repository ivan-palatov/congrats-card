import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Department } from '../data/departments';
import { Envelope, type EnvelopePhase } from './Envelope';
import { Fireworks } from './Fireworks';
import { LetterCard } from './LetterCard';
import '../styles/envelope.css';

type EnvelopeSceneProps = {
  department: Department;
  onClose: () => void;
};

const LETTER_RISE_END_MS = 1680;
const EXPAND_DURATION_MS = 1100;

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
  const expandTimerRef = useRef<number | null>(null);
  const revealTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (expandTimerRef.current !== null) {
      window.clearTimeout(expandTimerRef.current);
      expandTimerRef.current = null;
    }
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const reveal = useCallback(() => {
    clearTimers();
    setPhase('revealed');
  }, [clearTimers]);

  const startExpanding = useCallback(() => {
    setPhase('expanding');
    revealTimerRef.current = window.setTimeout(reveal, EXPAND_DURATION_MS);
  }, [reveal]);

  const openEnvelope = useCallback(() => {
    if (phase !== 'closed') return;

    if (reducedMotion) {
      reveal();
      return;
    }

    setPhase('opening');
    expandTimerRef.current = window.setTimeout(startExpanding, LETTER_RISE_END_MS);
  }, [phase, reducedMotion, reveal, startExpanding]);

  const skipToReveal = useCallback(() => {
    if (phase === 'opening' || phase === 'expanding') {
      reveal();
    }
  }, [phase, reveal]);

  const showMorphCard = phase === 'expanding' || phase === 'revealed';
  const showFireworks =
    !reducedMotion && (phase === 'opening' || phase === 'expanding' || phase === 'revealed');

  return (
    <AnimatePresence>
      <motion.div
        className="envelope-scene"
        style={{ '--dept-accent': department.accent } as React.CSSProperties}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={phase === 'opening' || phase === 'expanding' ? skipToReveal : undefined}
      >
        <div className="envelope-scene__bg" />

        <Fireworks active={showFireworks} accent={department.accent} />

        <button
          type="button"
          className="btn btn--ghost envelope-scene__back-btn"
          onClick={onClose}
          aria-label="Вернуться к списку отделов"
        >
          ← Назад
        </button>

        <Envelope department={department} phase={phase} />

        {!showMorphCard && (
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

        <AnimatePresence mode="sync">
          {showMorphCard && (
            <motion.div
              className="envelope-scene__letter-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <LetterCard
                key={department.id}
                department={department}
                onBack={onClose}
                morphing={phase === 'expanding'}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
