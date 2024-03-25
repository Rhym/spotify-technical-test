import { BaseIcon, type BaseIconProps } from "./base-icon";

export function Play({ ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon {...props} viewBox="0 0 384 512">
      <path fill="currentColor" d="M384 256 0 32v448l384-224z" />
    </BaseIcon>
  );
}
