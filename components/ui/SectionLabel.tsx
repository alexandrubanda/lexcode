interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
}

export default function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <div
      className="text-[12px] font-extrabold tracking-[0.14em] uppercase mb-[14px]"
      style={{ color: light ? "var(--color-accent-500)" : "var(--color-neutral-600)" }}
    >
      {children}
    </div>
  );
}
