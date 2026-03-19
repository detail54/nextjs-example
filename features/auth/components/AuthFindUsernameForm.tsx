'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SquareCheckBig, Mail } from 'lucide-react'
import BasicButton from '@/components/button/BasicButton'
import BasicInput from '@/components/input/BasicInput'
import LinkButton from '@/components/button/LinkButton'
import Icon from '@/components/icon/Icon'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { APP_PATHS } from '@/context/appPaths'
import { useFindUsername } from '../hooks/useFindUsername'
import { findUsernameFormStyles as s } from './AuthFindUsernameForm.styles'

export default function AuthFindUsernameForm() {
  // 이메일 입력 상태
  const [email, setEmail] = useState('')
  // 조회 결과 아이디 (null: 아직 조회 전 or 새로고침)
  const [foundUsername, setFoundUsername] = useState<string | null>(null)
  // 이메일 없음 에러 표시 여부
  const [notFound, setNotFound] = useState(false)

  const router = useRouter()

  const { mutate: findUsername, isPending } = useFindUsername({
    onSuccess: (username) => {
      setFoundUsername(username)
      setNotFound(false)
    },
    onNotFound: () => {
      setNotFound(true)
    },
  })

  // 이메일 입력 변경 시 에러 초기화
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setNotFound(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    findUsername(email)
  }

  // 비밀번호 찾기로 이동 (찾은 아이디를 query param으로 전달)
  const handleGoToFindPassword = () => {
    router.push(`${APP_PATHS.AUTH.FIND_PASSWORD}?username=${encodeURIComponent(foundUsername!)}`)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.blobWrapper}>
        <div className={s.blob1} />
        <div className={s.blob2} />
      </div>

      <div className={s.card}>
        {/* 좌측 브랜드 패널 */}
        <div className={s.brandPanel}>
          <div className={s.brandTop}>
            <div className={s.brandIconWrapper}>
              <Icon icon={SquareCheckBig} size='xl' className='stroke-white' />
            </div>
            <div>
              <h1 className={s.brandName}>{AUTH_MSG.BRAND_NAME}</h1>
              <p className={s.brandDesc}>{AUTH_MSG.BRAND_DESCRIPTION}</p>
            </div>
            <ul className={s.brandFeatures}>
              {AUTH_MSG.BRAND_FEATURES.map((feature) => (
                <li key={feature} className={s.brandFeatureItem}>
                  <span className={s.brandFeatureDot} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className={s.brandBottom}>
            <p className={s.brandCopyright}>{AUTH_MSG.COPYRIGHT}</p>
          </div>
        </div>

        {/* 우측 패널 */}
        <div className={s.formPanel}>
          <div className={s.formHeader}>
            <h2 className={s.formTitle}>{AUTH_MSG.FIND_USERNAME_TITLE}</h2>
            <p className={s.formSubtitle}>
              {foundUsername ? AUTH_MSG.FIND_USERNAME_RESULT_TITLE : AUTH_MSG.FIND_USERNAME_SUBTITLE}
            </p>
          </div>

          {foundUsername ? (
            /* ── 결과 뷰: 아이디 표시 ── */
            <div className={s.resultBox}>
              <p className={s.resultDesc}>{AUTH_MSG.FIND_USERNAME_RESULT_DESC}</p>
              <p className={s.resultUsername}>{foundUsername}</p>
              <div className={s.resultActions}>
                {/* 비밀번호 찾기 버튼 */}
                <BasicButton
                  type='button'
                  variant='outline'
                  size='lg'
                  className='w-full'
                  onClick={handleGoToFindPassword}
                >
                  {AUTH_MSG.GO_TO_FIND_PASSWORD}
                </BasicButton>
              </div>
            </div>
          ) : (
            /* ── 입력 뷰: 이메일 입력 ── */
            <form className={s.form} onSubmit={handleSubmit} noValidate>
              <div className={s.fieldWrapper}>
                <label className={s.label}>{AUTH_MSG.EMAIL_LABEL}</label>
                <div className={s.inputIconWrapper}>
                  <span className={s.inputIcon}>
                    <Icon icon={Mail} size='sm' />
                  </span>
                  <BasicInput
                    type='email'
                    value={email}
                    placeholder={AUTH_MSG.EMAIL_PLACEHOLDER}
                    className='pl-10'
                    onChange={handleEmailChange}
                  />
                </div>
                {/* 이메일 없음 에러 메시지 */}
                {notFound && <p className={s.errorText}>{AUTH_MSG.FIND_USERNAME_NOT_FOUND}</p>}
              </div>

              <div className={s.submitWrapper}>
                <BasicButton
                  type='submit'
                  variant='primary'
                  size='lg'
                  disabled={!email.trim() || isPending}
                  className='w-full'
                >
                  {isPending ? AUTH_MSG.FIND_USERNAME_LOADING : AUTH_MSG.FIND_USERNAME_BUTTON}
                </BasicButton>
              </div>
            </form>
          )}

          {/* 하단 링크 */}
          <div className={s.footerLinks}>
            <LinkButton buttonType='text' href={APP_PATHS.AUTH.LOGIN}>
              {AUTH_MSG.BACK_TO_LOGIN}
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}
