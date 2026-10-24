import { useEffect, useState } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  id?: string;
}

export default function Toggle({ checked, onChange, label, id }: ToggleProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group inline-flex items-center gap-3"
    >
      <span
        className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
          checked ? 'bg-teal-400/80 glow-teal' : 'bg-slate-700'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
      {label && (
        <span className="text-sm font-medium text-slate-200 group-hover:text-teal-300 transition-colors">
          {label}
        </span>
      )}
    </button>
  );
}

export function useToggle(initial = false) {
  const [checked, setChecked] = useState(initial);
  useEffect(() => {
    // noop, keeps hook stable
  }, []);
  return { checked, setChecked, toggle: () => setChecked((c) => !c) };
}
