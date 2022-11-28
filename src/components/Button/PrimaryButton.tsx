import { ReactNode } from "react";

export default function PrimaryButton({
  children,
  className,
  ...restProps
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`${className} w-24 rounded bg-blue-500 text-white`}
      {...restProps}
    >
      {children}
    </button>
  );
}
