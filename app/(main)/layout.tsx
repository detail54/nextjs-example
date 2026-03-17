import { Lnb } from '@/components/lnb/Lnb'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen bg-secondary-950'>
      <Lnb />
      <main className='flex-1 overflow-auto'>{children}</main>
    </div>
  )
}
