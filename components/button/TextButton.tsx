import { textButtonStyle } from './TextButton.styles'
import { type TextButtonProps } from './type'

export default function TextButton({
  children,
  type = 'button',
  variant,
  size,
  disabled,
  className,
  onClick,
}: TextButtonProps) {
  return (
    <button
      type={type}
      className={textButtonStyle({ variant, size, className })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
