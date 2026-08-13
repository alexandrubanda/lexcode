import Link from "next/link";
import Mark from "./Mark";

interface LogoProps {
  size?: number;
  href?: string;
}

export default function Logo({ size = 34, href = "#top" }: LogoProps) {
  const fontSize = Math.round(size * 0.647);

  return (
    <Link
      href={href}
      className="flex items-center gap-3 no-underline text-[var(--color-text)]"
    >
      <Mark size={size} />
      <span style={{ fontSize, fontWeight: 800, letterSpacing: "-0.03em" }}>Lexcode</span>
    </Link>
  );
}
