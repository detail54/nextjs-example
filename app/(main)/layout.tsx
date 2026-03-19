import { Lnb } from '@/components/lnb/Lnb'
import PanelProvider from '@/components/panel/PanelProvider'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen bg-secondary-950'>
      <Lnb />
      <main className='flex-1 overflow-auto'>{children}</main>
      <PanelProvider />
    </div>
  )
}
