import type { Department } from '../data/departments';
import '../styles/envelope.css';

export type EnvelopePhase = 'closed' | 'opening' | 'open';

type EnvelopeProps = {
  department: Department;
  phase: EnvelopePhase;
};

export function Envelope({ department, phase }: EnvelopeProps) {
  const className = ['envelope', phase !== 'closed' ? `envelope--${phase}` : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`envelope-stage ${phase === 'open' ? 'envelope-stage--done' : ''}`}
      style={{ '--dept-accent': department.accent } as React.CSSProperties}
    >
      <div className={className}>
        <div className="envelope__back" />
        <div className="envelope__letter-slot">
          <div className="envelope__letter">
            <span className="envelope__letter-preview">{department.name}</span>
          </div>
        </div>
        <div className="envelope__pocket-left" />
        <div className="envelope__pocket-right" />
        <div className="envelope__flap">
          <div className="envelope__flap-face" />
          <div className="envelope__flap-face envelope__flap-face--inner" />
          <div className="envelope__seal" aria-hidden="true">
            {department.sealIcon}
          </div>
        </div>
      </div>
    </div>
  );
}
