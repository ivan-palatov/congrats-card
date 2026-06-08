import { useCallback, useState } from 'react';
import type { Department } from './data/departments';
import { LandingHero } from './components/LandingHero';
import { DepartmentList } from './components/DepartmentList';
import { EnvelopeScene } from './components/EnvelopeScene';
import { TopoBackground } from './components/TopoBackground';
import './styles/global.css';

function App() {
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const scrollToDepartments = useCallback(() => {
    document.getElementById('departments')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSelectDepartment = useCallback((department: Department) => {
    setSelectedDepartment(department);
  }, []);

  const handleCloseEnvelope = useCallback(() => {
    setSelectedDepartment(null);
    requestAnimationFrame(() => {
      document.getElementById('departments')?.scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

  return (
    <div className="app">
      <div className="app__bg" />
      <div className="app__grid" />
      <TopoBackground />

      <div className="app__content">
        <LandingHero onSelectDepartment={scrollToDepartments} />
        <DepartmentList onSelect={handleSelectDepartment} />
      </div>

      {selectedDepartment && (
        <EnvelopeScene department={selectedDepartment} onClose={handleCloseEnvelope} />
      )}

      <p className="app__credit">
        Powered by AI <span className="app__credit-sub">(по лекциям Александра Клянчина)</span>
      </p>
    </div>
  );
}

export default App;
