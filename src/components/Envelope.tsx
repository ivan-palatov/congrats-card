import { useEffect, useState } from 'react';
import type { Department } from '../data/departments';
import '../styles/envelope.css';

export type EnvelopePhase = 'closed' | 'opening' | 'revealed';

type EnvelopeProps = {
  department: Department;
  phase: EnvelopePhase;
};

const LETTER_ESCAPE_DELAY_MS = 1150;

export function Envelope({ department, phase }: EnvelopeProps) {
  const isAnimating = phase === 'opening';
  const isHidden = phase === 'revealed';
  const [letterEscaping, setLetterEscaping] = useState(false);

  useEffect(() => {
    if (phase !== 'opening') {
      setLetterEscaping(false);
      return;
    }

    const timer = window.setTimeout(() => setLetterEscaping(true), LETTER_ESCAPE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const envelopeClass = [
    'envelope',
    isAnimating ? 'envelope--animating' : '',
    letterEscaping ? 'envelope--letter-escaping' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`envelope-stage${isHidden ? ' envelope-stage--hidden' : ''}`}
      style={{ '--dept-accent': department.accent } as React.CSSProperties}
      aria-hidden={isHidden}
    >
      <div className={envelopeClass}>
        <div className="envelope__back" />

        <div className={`envelope__letter${letterEscaping ? ' envelope__letter--above' : ''}`}>
          <span className="envelope__letter-preview">{department.name}</span>
        </div>

        <div className="envelope__front" />

        <div className="envelope__flap-wrap">
          <div className="envelope__flap" />
        </div>

        <div className="envelope__seal" aria-hidden="true">
          {department.sealIcon}
        </div>
      </div>
    </div>
  );
}
