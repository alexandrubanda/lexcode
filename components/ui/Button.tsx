import Link from "next/link";

interface ButtonProps {
  href: string;
  variant?: "filled" | "outline";
  size?: "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export default function Button({ href, variant = "filled", size = "md", children, className = "" }: ButtonProps) {
  const base = "inline-flex items-center gap-2 font-extrabold no-underline transition-colors";
  const padding = size === "lg" ? "px-[22px] py-[16px] text-[15px]" : "px-[18px] py-[11px] text-[14px]";
  const styles =
    variant === "filled"
      ? "bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-accent-600)]"
      : "border-2 border-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-surface)]";

  return (
    <Link href={href} className={`${base} ${padding} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
