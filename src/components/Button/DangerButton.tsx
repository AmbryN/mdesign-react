import { MouseEventHandler, ReactNode } from "react";

export default function DangerButton({
  onClick,
  children,
  className,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`${className} mx-1 w-24 rounded bg-red-500 text-white`}
    >
      {children}
    </button>
  );
}
