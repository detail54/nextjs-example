import { type VariantProps } from 'class-variance-authority'
import { buttonStyle } from './BasicButton.styles'

export type BasicButtonProps = VariantProps<typeof buttonStyle> & {
  children: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  onClick?: () => void
}
