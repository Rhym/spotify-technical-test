import { SVGAttributes } from "react";

export type BaseIconProps = SVGAttributes<SVGElement> & {
  /**
   * The width/height of the component
   * @defaultValue `24`
   */
  size?: number;
};

export function BaseIcon({
  children,
  size = 24,
  ...props
}: BaseIconProps): JSX.Element {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...props}>
      {children}
    </svg>
  );
}
