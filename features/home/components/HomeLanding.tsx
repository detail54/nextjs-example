import LinkButton from '@/components/button/LinkButton'
import { APP_PATHS } from '@/context/appPaths'
import { AUTH_MSG } from '@/context/authMsg'
import { HOME_MSG } from '@/context/homeMsg'
import { homeLandingStyles as s } from './HomeLanding.styles'

// 홈 랜딩 페이지 컴포넌트
export default function HomeLanding() {
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
          <h1 className={s.title}>{AUTH_MSG.BRAND_NAME}</h1>
          <p className={s.subtitle}>{AUTH_MSG.BRAND_DESCRIPTION}</p>
        </div>

        <div className={s.actions}>
          <LinkButton
            buttonType='basic'
            href={APP_PATHS.AUTH.LOGIN}
            variant='primary'
            size='lg'
            className='w-full sm:w-auto'
          >
            {HOME_MSG.LOGIN_BUTTON}
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
