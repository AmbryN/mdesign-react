import { MouseEventHandler, ReactNode } from "react";

import PrimaryButton from "@components/Button/PrimaryButton";
import WarningButton from "@components/Button/WarningButton";
import DangerButton from "@components/Button/DangerButton";

export default function Button({
  variant,
  className,
  children,
  ...restProps
}: {
  variant: string;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) {
  const selectVariant = (variant: string) => {
    switch (variant) {
      case "primary":
        return (
          <PrimaryButton className={className} {...restProps}>
            {children}
          </PrimaryButton>
        );
      case "warning":
        return (
          <WarningButton className={className} {...restProps}>
            {children}
          </WarningButton>
        );
      case "danger":
        return (
          <DangerButton className={className} {...restProps}>
            {children}
          </DangerButton>
        );
      default:
        return (
          <PrimaryButton className={className} {...restProps}>
            {children}
          </PrimaryButton>
        );
    }
  };

  return selectVariant(variant);
}
