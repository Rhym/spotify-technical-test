import { BaseIcon, type BaseIconProps } from "./base-icon";

export function X({ ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon {...props} viewBox="0 0 384 512">
      <path
        fill="currentColor"
        d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256l132.5-132.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6l132.5 132.5z"
      />
    </BaseIcon>
  );
}
