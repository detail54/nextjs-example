import { inputStyle } from './BasicInput.styles'
import { type BasicInputProps } from './type'

export default function BasicInput({
  type = 'text',
  value,
  defaultValue,
  placeholder,
  variant,
  size,
  disabled,
  readOnly,
  maxLength,
  className,
  onChange,
  onBlur,
  onKeyDown,
}: BasicInputProps) {
  return (
    <input
      type={type}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className={inputStyle({ variant, size, className })}
      disabled={disabled}
      readOnly={readOnly}
      maxLength={maxLength}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  )
}
