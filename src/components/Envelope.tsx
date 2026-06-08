import type { Department } from '../data/departments';
import '../styles/envelope.css';

export type EnvelopePhase = 'closed' | 'opening' | 'revealed';

type EnvelopeProps = {
  department: Department;
  phase: EnvelopePhase;
};

export function Envelope({ department, phase }: EnvelopeProps) {
  const isAnimating = phase === 'opening';
  const isHidden = phase === 'revealed';

  return (
    <div
      className={`envelope-stage${isHidden ? ' envelope-stage--hidden' : ''}`}
      style={{ '--dept-accent': department.accent } as React.CSSProperties}
      aria-hidden={isHidden}
    >
      <div className={`envelope${isAnimating ? ' envelope--animating' : ''}`}>
        <div className="envelope__back" />

        <div className="envelope__letter">
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
