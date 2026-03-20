import { Lnb } from '@/layouts/lnb/Lnb'
import EpicSidePanel from '@/features/common/components/EpicSidePanel'
import TaskSidePanel from '@/features/common/components/TaskSidePanel'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen bg-secondary-950'>
      <Lnb />
      <main className='flex-1 overflow-auto'>{children}</main>
      <EpicSidePanel />
      <TaskSidePanel />
    </div>
  )
}
