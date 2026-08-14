"use client";

import Button from "./Button";

interface Props {
  size?: "md" | "lg";
  variant?: "filled" | "outline";
  className?: string;
  children: React.ReactNode;
}

export default function BookingButton({ children, ...rest }: Props) {
  return (
    <Button
      onClick={() => document.dispatchEvent(new CustomEvent("open-booking"))}
      {...rest}
    >
      {children}
    </Button>
  );
}
