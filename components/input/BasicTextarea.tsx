import { type VariantProps } from 'class-variance-authority'
import { textareaStyle } from './BasicTextarea.styles'

type BasicTextareaProps = VariantProps<typeof textareaStyle> & {
  value?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  rows?: number
  maxLength?: number
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}

export default function BasicTextarea({
  value,
  placeholder,
  variant,
  size,
  disabled,
  readOnly,
  rows = 5,
  maxLength,
  className,
  onChange,
  onBlur,
}: BasicTextareaProps) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      className={textareaStyle({ variant, size, className })}
      disabled={disabled}
      readOnly={readOnly}
      rows={rows}
      maxLength={maxLength}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}
