'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SquareCheckBig, User, Mail, Lock } from 'lucide-react'
import BasicButton from '@/components/button/BasicButton'
import BasicInput from '@/components/input/BasicInput'
import LinkButton from '@/components/button/LinkButton'
import Icon from '@/components/icon/Icon'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { APP_PATHS } from '@/context/appPaths'
import { useFindPassword } from '../hooks/useFindPassword'
import { useResetPassword } from '../hooks/useResetPassword'
import { findPasswordFormStyles as s } from './AuthFindPasswordForm.styles'

type Props = {
  // 아이디 찾기에서 넘어온 경우 미리 채워진 아이디
  initialUsername?: string
}

export default function AuthFindPasswordForm({ initialUsername }: Props) {
  // 아이디 입력 (아이디 찾기에서 넘어온 경우 초기값 설정)
  const [username, setUsername] = useState(initialUsername ?? '')
  // 이메일 입력 상태
  const [email, setEmail] = useState('')
  // 새 비밀번호 입력 상태
  const [newPassword, setNewPassword] = useState('')
  // 비밀번호 확인 입력 상태
  const [passwordConfirm, setPasswordConfirm] = useState('')
  // 검증 성공 여부 (true이면 비밀번호 재설정 뷰로 전환)
  const [verified, setVerified] = useState(false)
  // 일치하지 않음 에러 표시 여부
  const [notFound, setNotFound] = useState(false)

  // 검증 시 사용했던 username/email 저장 (재설정 API 호출에 사용)
  const [verifiedUsername, setVerifiedUsername] = useState('')
  const [verifiedEmail, setVerifiedEmail] = useState('')

  const router = useRouter()

  const { mutate: findPassword, isPending: isVerifying } = useFindPassword({
    onSuccess: () => {
      setVerifiedUsername(username)
      setVerifiedEmail(email)
      setVerified(true)
      setNotFound(false)
    },
    onNotFound: () => {
      setNotFound(true)
    },
  })

  const { mutate: resetPassword, isPending: isResetting } = useResetPassword({
    // 재설정 성공 시 로그인 페이지로 이동
    onSuccess: () => router.push(APP_PATHS.AUTH.LOGIN),
  })

  // 검증 폼 제출
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !email.trim()) return
    findPassword({ username, email })
  }

  // 재설정 폼 제출
  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isResetEnabled) return
    resetPassword({ username: verifiedUsername, email: verifiedEmail, password: newPassword })
  }

  // 비밀번호 일치 여부 (두 필드 모두 입력된 경우에만 표시)
  const passwordMatch = newPassword && passwordConfirm ? newPassword === passwordConfirm : null

  // 변경하기 버튼 활성화 조건
  const isResetEnabled = passwordMatch === true && !isResetting

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
            <h2 className={s.formTitle}>{AUTH_MSG.FIND_PASSWORD_TITLE}</h2>
            <p className={s.formSubtitle}>
              {verified ? AUTH_MSG.RESET_PASSWORD_SUBTITLE : AUTH_MSG.FIND_PASSWORD_SUBTITLE}
            </p>
          </div>

          {verified ? (
            /* ── 비밀번호 재설정 뷰 ── */
            <form className={s.form} onSubmit={handleResetSubmit} noValidate>
              {/* 새 비밀번호 */}
              <div className={s.fieldWrapper}>
                <label className={s.label}>{AUTH_MSG.NEW_PASSWORD_LABEL}</label>
                <div className={s.inputIconWrapper}>
                  <span className={s.inputIcon}>
                    <Icon icon={Lock} size='sm' />
                  </span>
                  <BasicInput
                    type='password'
                    value={newPassword}
                    placeholder={AUTH_MSG.NEW_PASSWORD_PLACEHOLDER}
                    className='pl-10'
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* 비밀번호 확인 */}
              <div className={s.fieldWrapper}>
                <label className={s.label}>{AUTH_MSG.PASSWORD_CONFIRM_LABEL}</label>
                <div className={s.inputIconWrapper}>
                  <span className={s.inputIcon}>
                    <Icon icon={Lock} size='sm' />
                  </span>
                  <BasicInput
                    type='password'
                    value={passwordConfirm}
                    placeholder={AUTH_MSG.PASSWORD_CONFIRM_PLACEHOLDER}
                    className='pl-10'
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
                <p className={s.passwordMatchText(passwordMatch)}>
                  {passwordMatch === true ? AUTH_MSG.PASSWORD_MATCH : AUTH_MSG.PASSWORD_MISMATCH}
                </p>
              </div>

              <div className={s.submitWrapper}>
                <BasicButton
                  type='submit'
                  variant='primary'
                  size='lg'
                  disabled={!isResetEnabled}
                  className='w-full'
                >
                  {isResetting ? AUTH_MSG.RESET_PASSWORD_LOADING : AUTH_MSG.RESET_PASSWORD_BUTTON}
                </BasicButton>
              </div>
            </form>
          ) : (
            /* ── 검증 뷰: 아이디 + 이메일 입력 ── */
            <form className={s.form} onSubmit={handleVerifySubmit} noValidate>
              {/* 아이디 */}
              <div className={s.fieldWrapper}>
                <label className={s.label}>{AUTH_MSG.USERNAME_LABEL}</label>
                {initialUsername ? (
                  /* 아이디 찾기에서 넘어온 경우 - 읽기전용 텍스트 */
                  <p className={s.readonlyUsername}>{username}</p>
                ) : (
                  <div className={s.inputIconWrapper}>
                    <span className={s.inputIcon}>
                      <Icon icon={User} size='sm' />
                    </span>
                    <BasicInput
                      type='text'
                      value={username}
                      placeholder={AUTH_MSG.USERNAME_PLACEHOLDER}
                      className='pl-10'
                      onChange={(e) => {
                        setUsername(e.target.value)
                        setNotFound(false)
                      }}
                    />
                  </div>
                )}
              </div>

              {/* 이메일 */}
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
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setNotFound(false)
                    }}
                  />
                </div>
                {/* 일치하지 않음 에러 메시지 */}
                {notFound && <p className={s.errorText}>{AUTH_MSG.FIND_PASSWORD_NOT_FOUND}</p>}
              </div>

              <div className={s.submitWrapper}>
                <BasicButton
                  type='submit'
                  variant='primary'
                  size='lg'
                  disabled={!username.trim() || !email.trim() || isVerifying}
                  className='w-full'
                >
                  {isVerifying ? AUTH_MSG.FIND_PASSWORD_LOADING : AUTH_MSG.FIND_PASSWORD_BUTTON}
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
