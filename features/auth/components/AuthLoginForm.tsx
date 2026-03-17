'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SquareCheckBig, User, Lock } from 'lucide-react'
import BasicButton from '@/components/button/BasicButton'
import BasicInput from '@/components/input/BasicInput'
import LinkButton from '@/components/button/LinkButton'
import Icon from '@/components/icon/Icon'
import { AUTH_MSG } from '@/context/authMsg'
import { APP_PATHS } from '@/context/appPaths'
import { useLogin } from '../hooks/useLogin'
import { loginFormStyles as s } from './AuthLoginForm.styles'
export default function AuthLoginForm() {
  // 입력 상태
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const { mutate: login, isPending } = useLogin({
    // 로그인 성공 시 보드로 이동
    onSuccess: () => router.push(APP_PATHS.BOARD.ROOT),
  })

  // 로그인 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({ username, password })
  }

  return (
    <div className={s.wrapper}>
      {/* 배경 장식 */}
      <div className={s.blobWrapper}>
        <div className={s.blob1} />
        <div className={s.blob2} />
      </div>

      <div className={s.card}>
        {/* 좌측 브랜드 패널 */}
        <div className={s.brandPanel}>
          <div className={s.brandTop}>
            {/* 브랜드 아이콘 */}
            <div className={s.brandIconWrapper}>
              <Icon icon={SquareCheckBig} size='xl' className='stroke-white' />
            </div>

            <div>
              <h1 className={s.brandName}>{AUTH_MSG.BRAND_NAME}</h1>
              <p className={s.brandDesc}>{AUTH_MSG.BRAND_DESCRIPTION}</p>
            </div>

            {/* 기능 목록 */}
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

        {/* 우측 폼 패널 */}
        <div className={s.formPanel}>
          <div className={s.formHeader}>
            <h2 className={s.formTitle}>{AUTH_MSG.LOGIN_TITLE}</h2>
            <p className={s.formSubtitle}>{AUTH_MSG.LOGIN_SUBTITLE}</p>
          </div>

          <form className={s.form} onSubmit={handleSubmit} noValidate>
            {/* 아이디 입력 */}
            <div className={s.fieldWrapper}>
              <label className={s.label}>{AUTH_MSG.USERNAME_LABEL}</label>
              <div className={s.inputIconWrapper}>
                <span className={s.inputIcon}>
                  <Icon icon={User} size='sm' />
                </span>
                <BasicInput
                  type='text'
                  value={username}
                  placeholder={AUTH_MSG.USERNAME_PLACEHOLDER}
                  className='pl-10'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div className={s.fieldWrapper}>
              <label className={s.label}>{AUTH_MSG.PASSWORD_LABEL}</label>
              <div className={s.inputIconWrapper}>
                <span className={s.inputIcon}>
                  <Icon icon={Lock} size='sm' />
                </span>
                <BasicInput
                  type='password'
                  value={password}
                  placeholder={AUTH_MSG.PASSWORD_PLACEHOLDER}
                  className='pl-10'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* 로그인 버튼 */}
            <div className={s.submitWrapper}>
              <BasicButton
                type='submit'
                variant='primary'
                size='lg'
                disabled={isPending}
                className='w-full'
              >
                {isPending ? AUTH_MSG.LOGIN_LOADING : AUTH_MSG.LOGIN_BUTTON}
              </BasicButton>
            </div>
          </form>

          {/* 하단 텍스트 버튼 링크 */}
          <div className={s.footerLinks}>
            <LinkButton buttonType='text' href='/auth/register'>
              {AUTH_MSG.ADD_ACCOUNT}
            </LinkButton>
            <span className={s.divider}>·</span>
            <LinkButton buttonType='text' href='/auth/find-username'>
              {AUTH_MSG.FIND_USERNAME}
            </LinkButton>
            <span className={s.divider}>·</span>
            <LinkButton buttonType='text' href='/auth/find-password'>
              {AUTH_MSG.FIND_PASSWORD}
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}
