import * as React from "react";

import styles from "./skeleton.module.css";

type SkeletonProps = React.ComponentPropsWithoutRef<"span"> & {
  children?: never;

  /**
   * The height of the component * 4px e.g 4 = 16px
   */
  height?: number;

  /**
   * The width of the component as a percentage
   */
  width?: number;
};

export function Skeleton({
  height,
  width,
  ...props
}: SkeletonProps): JSX.Element {
  return (
    <span
      {...props}
      className={styles.root}
      style={{
        height: height != null ? height * 4 : undefined,
        width: width != null ? `${width}%` : undefined,
      }}
    />
  );
}
