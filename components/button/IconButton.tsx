import { iconButtonStyle } from './IconButton.styles'
import { type IconButtonProps } from './type'

// 아이콘 전용 정사각형 버튼
export default function IconButton({
  children,
  type = 'button',
  variant,
  size,
  disabled,
  className,
  ariaLabel,
  onClick,
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={iconButtonStyle({ variant, size, className })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
