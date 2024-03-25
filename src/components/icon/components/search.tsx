import { BaseIcon, type BaseIconProps } from "./base-icon";

export function Search({ ...props }: BaseIconProps): JSX.Element {
  return (
    <BaseIcon {...props} viewBox="0 0 512 512">
      <path
        fill="currentColor"
        d="M384 208a176 176 0 1 0-352 0 176 176 0 1 0 352 0zm-40.7 158c-36.3 31.2-83.6 50-135.3 50C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 51.7-18.8 99-50 135.3l141.3 141.4c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L343.3 366z"
      />
    </BaseIcon>
  );
}
