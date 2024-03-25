import React from "react";

import styles from "./typography.module.css";

type TypographyProps = Omit<React.ComponentPropsWithoutRef<"p">, "color"> & {
  /**
   * The text colour of the component
   * @defaultValue `default`
   */
  color?: "default" | "weak";

  /**
   * The font size of the component
   * @defaultValue `default`
   */
  level?: "default" | "sm";
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  color = "default",
  level = "default",
  ...props
}: TypographyProps) => (
  <p
    {...props}
    className={`${styles.typography} ${
      color !== "default" ? styles[`typography--color-${color}`] : ""
    } ${level !== "default" ? styles[`typography--level-${level}`] : ""}`}
  >
    {children}
  </p>
);
