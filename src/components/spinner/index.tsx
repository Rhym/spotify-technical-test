import styles from "./spinner.module.css";

type SpinnerProps = {
  children?: never;
};

export function Spinner({ children, ...props }: SpinnerProps): JSX.Element {
  return (
    <span {...props} className={styles.root}>
      {children}
    </span>
  );
}
