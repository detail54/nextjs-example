import { iconStyle } from './Icon.styles'
import { type IconProps } from './type'

// lucide-react 아이콘 래퍼 - 크기/색상을 className으로 제어
export default function Icon({ icon: LucideIcon, size, className }: IconProps) {
  return <LucideIcon className={iconStyle({ size, className })} />
}
