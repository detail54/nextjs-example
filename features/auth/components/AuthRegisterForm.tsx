'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SquareCheckBig, User, Lock } from 'lucide-react'
import BasicButton from '@/components/button/BasicButton'
import BasicInput from '@/components/input/BasicInput'
import LinkButton from '@/components/button/LinkButton'
import Icon from '@/components/icon/Icon'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { APP_PATHS } from '@/context/appPaths'
import { useRegister } from '../hooks/useRegister'
import { useCheckUsername } from '../hooks/useCheckUsername'
import { registerFormStyles as s } from './AuthRegisterForm.styles'

export default function AuthRegisterForm() {
  // 입력 상태
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  // 중복 확인 결과 (null: 미확인, true: 사용 가능, false: 중복)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
  // 마지막으로 중복 확인한 username (입력 변경 시 재확인 요구)
  const [checkedUsername, setCheckedUsername] = useState('')

  const router = useRouter()

  const { mutate: checkUsername, isPending: isChecking } = useCheckUsername({
    onSuccess: (available) => {
      setUsernameAvailable(available)
      setCheckedUsername(username)
    },
  })

  const { mutate: register, isPending: isRegistering } = useRegister({
    // 등록 성공 시 로그인 페이지로 이동
    onSuccess: () => router.push(APP_PATHS.AUTH.LOGIN),
  })

  // username 입력 변경 시 중복 확인 초기화
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    setUsernameAvailable(null)
    setCheckedUsername('')
  }

  // 중복 확인 핸들러
  const handleCheckUsername = () => {
    if (!username.trim()) return
    checkUsername(username)
  }

  // 비밀번호 일치 여부 (두 필드 모두 입력된 경우에만 표시)
  const passwordMatch =
    password && passwordConfirm ? password === passwordConfirm : null

  // 중복 확인 완료 여부 (확인한 username과 현재 입력값이 동일해야 함)
  const isUsernameChecked = usernameAvailable === true && checkedUsername === username

  // 등록 버튼 활성화 조건
  const isSubmitEnabled =
    isUsernameChecked && passwordMatch === true && !isRegistering

  // 등록 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSubmitEnabled) return
    register({ username, password })
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
            <h2 className={s.formTitle}>{AUTH_MSG.REGISTER_TITLE}</h2>
            <p className={s.formSubtitle}>{AUTH_MSG.REGISTER_SUBTITLE}</p>
          </div>

          <form className={s.form} onSubmit={handleSubmit} noValidate>
            {/* 아이디 입력 + 중복 확인 */}
            <div className={s.fieldWrapper}>
              <label className={s.label}>{AUTH_MSG.USERNAME_LABEL}</label>
              <div className={s.usernameRow}>
                <div className={s.usernameInputWrapper}>
                  <span className={s.inputIcon}>
                    <Icon icon={User} size='sm' />
                  </span>
                  <BasicInput
                    type='text'
                    value={username}
                    placeholder={AUTH_MSG.USERNAME_PLACEHOLDER}
                    className='pl-10'
                    onChange={handleUsernameChange}
                  />
                </div>
                <BasicButton
                  type='button'
                  variant='outline'
                  size='md'
                  disabled={!username.trim() || isChecking}
                  onClick={handleCheckUsername}
                >
                  {isChecking ? AUTH_MSG.CHECKING_USERNAME : AUTH_MSG.CHECK_USERNAME}
                </BasicButton>
              </div>
              {/* 중복 확인 결과 메시지 */}
              <p className={s.statusText(usernameAvailable)}>
                {usernameAvailable === true
                  ? AUTH_MSG.USERNAME_AVAILABLE
                  : AUTH_MSG.USERNAME_TAKEN}
              </p>
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

            {/* 비밀번호 확인 입력 */}
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
              {/* 비밀번호 일치 여부 메시지 */}
              <p className={s.passwordMatchText(passwordMatch)}>
                {passwordMatch === true ? AUTH_MSG.PASSWORD_MATCH : AUTH_MSG.PASSWORD_MISMATCH}
              </p>
            </div>

            {/* 등록 버튼 */}
            <div className={s.submitWrapper}>
              <BasicButton
                type='submit'
                variant='primary'
                size='lg'
                disabled={!isSubmitEnabled}
                className='w-full'
              >
                {isRegistering ? AUTH_MSG.REGISTER_LOADING : AUTH_MSG.REGISTER_BUTTON}
              </BasicButton>
            </div>
          </form>

          {/* 로그인으로 돌아가기 */}
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
