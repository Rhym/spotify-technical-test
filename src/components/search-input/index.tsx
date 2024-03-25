import React, { useCallback, useRef } from "react";

import { Icon } from "../icon";
import { Spinner } from "../spinner";
import styles from "./input.module.css";

export type SearchInputProps = React.ComponentPropsWithoutRef<"input"> & {
  /**
   * Handler when the clear button is pressed
   */
  handleOnClear: () => void;

  /**
   * Render the component in a loading state
   */
  isLoading?: boolean;
};

export function SearchInput({
  handleOnClear,
  isLoading,
  disabled,
  value,
  ...props
}: SearchInputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  // Handlers
  //-----------------------------------------------------

  const handleClear = useCallback(() => {
    handleOnClear();
    inputRef.current?.focus();
  }, [handleOnClear]);

  // Render
  //-----------------------------------------------------

  return (
    <div className={styles.root}>
      <input
        {...props}
        ref={inputRef}
        className={styles.input}
        disabled={disabled}
        value={value}
      />
      <div className={styles.affix}>
        {isLoading ? <Spinner /> : <Icon.Search />}
      </div>
      {value != null && value !== "" && !isLoading && !disabled ? (
        <button className={styles.suffix} type="button" onClick={handleClear}>
          <Icon.X />
        </button>
      ) : null}
    </div>
  );
}
