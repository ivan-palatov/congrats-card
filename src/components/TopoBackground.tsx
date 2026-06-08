export function TopoBackground() {
  return (
    <svg
      className="app__topo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="topo" width="200" height="200" patternUnits="userSpaceOnUse">
          <path
            d="M0 100 Q50 60 100 100 T200 100 M0 140 Q50 100 100 140 T200 140 M0 60 Q50 20 100 60 T200 60"
            fill="none"
            stroke="#2a7a8c"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#topo)" />
      <ellipse cx="720" cy="450" rx="500" ry="300" fill="none" stroke="#c9a227" strokeWidth="0.5" opacity="0.3" />
      <ellipse cx="720" cy="450" rx="350" ry="200" fill="none" stroke="#c9a227" strokeWidth="0.5" opacity="0.2" />
      <ellipse cx="720" cy="450" rx="200" ry="110" fill="none" stroke="#c9a227" strokeWidth="0.5" opacity="0.15" />
    </svg>
  );
}
