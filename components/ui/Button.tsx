import Link from "next/link";

type ButtonProps = {
  variant?: "filled" | "outline";
  size?: "md" | "lg";
  children: React.ReactNode;
  className?: string;
} & ({ href: string; onClick?: never } | { onClick: () => void; href?: never });

export default function Button({ variant = "filled", size = "md", children, className = "", ...rest }: ButtonProps) {
  const base = "inline-flex items-center gap-2 font-extrabold no-underline transition-colors cursor-pointer";
  const padding = size === "lg" ? "px-[22px] py-[16px] text-[15px]" : "px-[18px] py-[11px] text-[14px]";
  const styles =
    variant === "filled"
      ? "bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-accent-600)]"
      : "border-2 border-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-surface)]";

  const cls = `${base} ${padding} ${styles} ${className}`;

  if ("onClick" in rest && rest.onClick) {
    return (
      <button onClick={rest.onClick} className={cls} style={{ fontFamily: "inherit" }}>
        {children}
      </button>
    );
  }

  return (
    <Link href={(rest as { href: string }).href} className={cls}>
      {children}
    </Link>
  );
}
