import { departments } from '../data/departments';
import type { Department } from '../data/departments';
import { DepartmentCard } from './DepartmentCard';
import './DepartmentList.css';

type DepartmentListProps = {
  onSelect: (department: Department) => void;
};

export function DepartmentList({ onSelect }: DepartmentListProps) {
  return (
    <section className="dept-list" id="departments">
      <div className="dept-list__header">
        <p className="mono">Выберите отдел</p>
        <h2 className="dept-list__title">Поздравления команде</h2>
        <p className="dept-list__desc">
          У каждого отдела — своё письмо в конверте. Нажмите на карточку, чтобы открыть.
        </p>
      </div>

      <div className="dept-list__grid">
        {departments.map((dept, i) => (
          <DepartmentCard key={dept.id} department={dept} index={i} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
