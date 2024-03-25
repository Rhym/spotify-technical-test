import React from "react";

import styles from "./heading.module.css";

type HeadingProps = React.ComponentPropsWithoutRef<"p">;

export const Heading: React.FC<HeadingProps> = ({
  children,
  ...props
}: HeadingProps) => (
  <p {...props} className={styles.heading}>
    {children}
  </p>
);
