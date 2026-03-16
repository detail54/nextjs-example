import Link from 'next/link'
import { buttonStyle } from './BasicButton.styles'
import { textButtonStyle } from './TextButton.styles'
import { iconButtonStyle } from './IconButton.styles'
import { type LinkButtonProps } from './type'

// Next.js Link 기반 버튼 - 키보드 탭 네비게이션 지원
export default function LinkButton(props: LinkButtonProps) {
  const { href, className, buttonType, ariaLabel, target } = props

  if (buttonType === 'basic') {
    const { variant, size, children } = props
    return (
      <Link
        href={href}
        target={target}
        aria-label={ariaLabel}
        className={buttonStyle({ variant, size, className })}
      >
        {children}
      </Link>
    )
  }

  if (buttonType === 'text') {
    const { variant, size, children } = props
    return (
      <Link
        href={href}
        target={target}
        aria-label={ariaLabel}
        className={textButtonStyle({ variant, size, className })}
      >
        {children}
      </Link>
    )
  }

  // icon
  const { variant, size, children } = props
  return (
    <Link
      href={href}
      target={target}
      aria-label={ariaLabel}
      className={iconButtonStyle({ variant, size, className })}
    >
      {children}
    </Link>
  )
}
