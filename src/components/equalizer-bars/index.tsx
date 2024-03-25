import React from "react";

import styles from "./equalizer-bars.module.css";

export type EqualizerBarsProps = React.ComponentPropsWithoutRef<"span"> & {
  children?: never;
};

export function EqualizerBars({ ...props }: EqualizerBarsProps): JSX.Element {
  return (
    <span {...props} className={styles.root}>
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </span>
  );
}
