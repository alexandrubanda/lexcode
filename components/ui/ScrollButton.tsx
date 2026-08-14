"use client";

import Button from "./Button";

interface Props {
  target: string;
  size?: "md" | "lg";
  variant?: "filled" | "outline";
  className?: string;
  children: React.ReactNode;
}

export default function ScrollButton({ target, children, ...rest }: Props) {
  return (
    <Button
      onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })}
      {...rest}
    >
      {children}
    </Button>
  );
}
