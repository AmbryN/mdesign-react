import { MouseEventHandler, ReactNode } from "react";

export default function WarningButton({
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
      className={`${className} w-24 rounded bg-orange-500 text-white`}
    >
      {children}
    </button>
  );
}