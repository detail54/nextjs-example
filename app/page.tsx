import Link from 'next/link'
import BasicButton from '@/components/button/BasicButton'
import { homeStyles as s } from './page.styles'

export default function Home() {
  return (
    <div className={s.wrapper}>
      {/* 배경 장식 */}
      <div className={s.blobWrapper}>
        <div className={s.blob1} />
        <div className={s.blob2} />
      </div>

      <div className={s.content}>
        {/* 브랜드 아이콘 */}
        <div className={s.iconWrapper}>
          <svg
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='none'
            stroke='white'
            strokeWidth='2.2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M9 11l3 3L22 4' />
            <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' />
          </svg>
        </div>

        <div className='space-y-3'>
          <h1 className={s.title}>TaskFlow</h1>
          <p className={s.subtitle}>팀과 함께 더 스마트하게 일하세요</p>
        </div>

        <div className={s.actions}>
          <Link href='/auth/login' className={s.loginButton}>
            <BasicButton variant='primary' size='lg' className='w-full'>
              로그인하기
            </BasicButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
