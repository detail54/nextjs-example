import { type VariantProps } from 'class-variance-authority'
import { inputStyle } from './BasicInput.styles'

export type BasicInputProps = VariantProps<typeof inputStyle> & {
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'url'
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  maxLength?: number
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
