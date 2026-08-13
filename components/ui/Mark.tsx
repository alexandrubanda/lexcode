interface MarkProps {
  size?: number;
}

export default function Mark({ size = 34 }: MarkProps) {
  const border = Math.max(2, Math.round(size * 0.059));
  const padding = Math.round(size * 0.176);
  const barH = Math.max(2, Math.round(size * 0.088));
  const dotSize = Math.round(size * 0.265);

  return (
    <div
      style={{
        width: size,
        height: size,
        border: `${border}px solid var(--color-text)`,
        padding: padding,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexShrink: 0,
      }}
    >
      <div style={{ height: barH, width: "100%", background: "var(--color-text)" }} />
      <div style={{ width: dotSize, height: dotSize, background: "var(--color-accent)" }} />
    </div>
  );
}
