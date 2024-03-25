import React from "react";

import styles from "./alert.module.css";

export type AlertProps = React.ComponentPropsWithoutRef<"div">;

export function Alert({ children, ...props }: AlertProps): JSX.Element {
  return (
    <div {...props} className={styles.root}>
      {children}
    </div>
  );
}
