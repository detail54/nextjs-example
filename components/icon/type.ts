import { type VariantProps } from 'class-variance-authority'
import { type LucideIcon } from 'lucide-react'
import { iconStyle } from './Icon.styles'

export type IconProps = VariantProps<typeof iconStyle> & {
  /** lucide-react 아이콘 컴포넌트 */
  icon: LucideIcon
  className?: string
}
