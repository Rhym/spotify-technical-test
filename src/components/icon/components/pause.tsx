import { BaseIcon, type BaseIconProps } from "./base-icon";

export function Pause({ ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon {...props} viewBox="0 0 320 512">
      <path
        fill="currentColor"
        d="M128 64H0v384h128V64zm192 0H192v384h128V64z"
      />
    </BaseIcon>
  );
}
