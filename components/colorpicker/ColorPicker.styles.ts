import { cva } from 'class-variance-authority'

export const colorPickerStyles = {
  // 컨테이너
  wrapper: cva('flex flex-wrap gap-1.5')(),

  // 색상 스와치 버튼
  swatch: cva(
    'w-5 h-5 rounded-full border-2 transition-transform duration-100 hover:scale-110 cursor-pointer flex-shrink-0',
    {
      variants: {
        selected: {
          true: 'border-white scale-110',
          false: 'border-transparent',
        },
      },
      defaultVariants: { selected: false },
    },
  ),

  // 기본(리셋) 버튼
  resetBtn: cva(
    'flex items-center justify-center w-5 h-5 rounded-full border-2 border-dashed' +
      ' border-secondary-500 text-secondary-400 hover:border-secondary-300 hover:text-secondary-200' +
      ' transition-colors duration-100 cursor-pointer flex-shrink-0 text-xs font-bold',
  )(),
}
