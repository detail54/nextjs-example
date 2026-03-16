import { type VariantProps } from 'class-variance-authority'
import { type ReactNode } from 'react'
import { buttonStyle } from './BasicButton.styles'
import { textButtonStyle } from './TextButton.styles'
import { iconButtonStyle } from './IconButton.styles'

export type BasicButtonProps = VariantProps<typeof buttonStyle> & {
  children: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export type TextButtonProps = VariantProps<typeof textButtonStyle> & {
  children: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  onClick?: () => void
}

export type IconButtonProps = VariantProps<typeof iconButtonStyle> & {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  /** 접근성 레이블 */
  ariaLabel?: string
  onClick?: () => void
}

// LinkButton 공통 기반 props
type BaseLinkButtonProps = {
  href: string
  className?: string
  /** 새 탭에서 열기 */
  target?: '_blank' | '_self'
  /** 접근성 레이블 (아이콘 버튼에 필수) */
  ariaLabel?: string
}

// basic: BasicButton 스타일 + Link
type BasicLinkButtonProps = BaseLinkButtonProps &
  VariantProps<typeof buttonStyle> & {
    buttonType: 'basic'
    children: string
  }

// text: TextButton 스타일 + Link
type TextLinkButtonProps = BaseLinkButtonProps &
  VariantProps<typeof textButtonStyle> & {
    buttonType: 'text'
    children: string
  }

// icon: 아이콘 버튼 스타일 + Link
type IconLinkButtonProps = BaseLinkButtonProps &
  VariantProps<typeof iconButtonStyle> & {
    buttonType: 'icon'
    children: ReactNode
  }

export type LinkButtonProps = BasicLinkButtonProps | TextLinkButtonProps | IconLinkButtonProps
