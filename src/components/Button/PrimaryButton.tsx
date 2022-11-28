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
      className={`${className} mx-1 w-24 rounded bg-blue-500 text-white`}
      {...restProps}
    >
      {children}
    </button>
  );
}
