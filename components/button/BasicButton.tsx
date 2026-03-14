import { buttonStyle } from './BasicButton.styles'
import { type BasicButtonProps } from './type'

export default function BasicButton({
  children,
  type = 'button',
  variant,
  size,
  disabled,
  className,
  onClick,
}: BasicButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyle({ variant, size, className })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
