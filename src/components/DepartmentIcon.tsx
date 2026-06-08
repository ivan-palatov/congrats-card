import type { ReactElement, ReactNode } from 'react';

type DepartmentIconProps = {
  id: string;
  className?: string;
};

type IconProps = {
  className?: string;
};

function IconBase({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const icons: Record<string, (props: IconProps) => ReactElement> = {
  directorate: ({ className }) => (
    <IconBase className={className}>
      <path d="M4 19h16" />
      <path d="M6 19V9l6-4 6 4v10" />
      <path d="M9 19v-5h6v5" />
      <path d="M9 9h6" />
    </IconBase>
  ),
  commercial: ({ className }) => (
    <IconBase className={className}>
      <path d="M3 17l4-8 5 4 5-7 4 6" />
      <path d="M3 20h18" />
      <circle cx="18" cy="6" r="2" />
    </IconBase>
  ),
  product: ({ className }) => (
    <IconBase className={className}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
      <path d="M8 17h3" />
      <circle cx="17" cy="17" r="2.5" />
      <path d="M17 15.5v3" />
      <path d="M15.5 17h3" />
    </IconBase>
  ),
  admin: ({ className }) => (
    <IconBase className={className}>
      <path d="M5 10V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M12 14v3" />
      <path d="M9 17h6" />
    </IconBase>
  ),
  accounting: ({ className }) => (
    <IconBase className={className}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8" />
      <path d="M8 11h2" />
      <path d="M14 11h2" />
      <path d="M8 15h2" />
      <path d="M14 15h2" />
      <path d="M8 19h8" />
    </IconBase>
  ),
  supply: ({ className }) => (
    <IconBase className={className}>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5" />
      <path d="M12 12v9" />
      <path d="M12 12L4 7.5" />
    </IconBase>
  ),
  support: ({ className }) => (
    <IconBase className={className}>
      <path d="M4 11a8 8 0 0 1 16 0" />
      <path d="M6 11v2a6 6 0 0 0 12 0v-2" />
      <path d="M12 19v2" />
      <path d="M8 21h8" />
      <path d="M10 11h.01" />
      <path d="M14 11h.01" />
    </IconBase>
  ),
  hr: ({ className }) => (
    <IconBase className={className}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6" />
      <path d="M15 20c0-2.2 1.8-4 4-4" />
      <path d="M12 14a4 4 0 0 1 4 4" />
    </IconBase>
  ),
  legal: ({ className }) => (
    <IconBase className={className}>
      <path d="M12 3v2" />
      <path d="M7 7h10" />
      <path d="M7 7L4 16h6L7 7z" />
      <path d="M17 7l-3 9h6l-3-9z" />
      <path d="M12 7v13" />
    </IconBase>
  ),
  sysadmin: ({ className }) => (
    <IconBase className={className}>
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
      <path d="M11 7h6" />
      <path d="M11 17h6" />
    </IconBase>
  ),
  technical: ({ className }) => (
    <IconBase className={className}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2 2-3.4-3.4 2-2z" />
      <circle cx="15.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
    </IconBase>
  ),
};

export function DepartmentIcon({ id, className }: DepartmentIconProps) {
  const Icon = icons[id];
  if (!Icon) return null;
  return <Icon className={className} />;
}
