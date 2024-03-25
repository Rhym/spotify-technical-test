import React from "react";

import type { BaseIconProps } from "../icon/components/base-icon";
import styles from "./icon-button.module.css";

export type IconButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  children?: never;

  /**
   * Icon for the component
   */
  icon: React.ReactElement<BaseIconProps>;
};

export function IconButton({ icon, ...props }: IconButtonProps): JSX.Element {
  return (
    <button {...props} className={styles.root}>
      {icon}
    </button>
  );
}
