'use client'

import { useState, useCallback } from 'react'
import BasicInput from '@/components/input/BasicInput'
import BasicButton from '@/components/button/BasicButton'
import { MY_PAGE_MSG } from '@/context/messages/myPageMsg'
import { useUpdateEmail } from '../hooks/useUpdateEmail'
import { myPageEmailInlineEditStyles } from './MyPageEmailInlineEdit.styles'

type Props = {
  onClose: () => void
}

// 이메일 인라인 변경 폼
export default function MyPageEmailInlineEdit({ onClose }: Props) {
  // 새 이메일 입력값
  const [newEmail, setNewEmail] = useState('')
  // 현재 비밀번호 입력값
  const [currentPassword, setCurrentPassword] = useState('')
  // 인풋별 에러 메시지
  const [errors, setErrors] = useState({ newEmail: '', currentPassword: '' })

  const { mutate: updateEmail, isPending } = useUpdateEmail({ onSuccess: onClose })

  // 취소 시 초기화 후 닫기
  const handleCancel = useCallback(() => {
    setNewEmail('')
    setCurrentPassword('')
    setErrors({ newEmail: '', currentPassword: '' })
    onClose()
  }, [onClose])

  // 유효성 검사
  const validate = useCallback(() => {
    const next = { newEmail: '', currentPassword: '' }
    if (!newEmail.trim()) next.newEmail = MY_PAGE_MSG.REQUIRED_FIELD
    if (!currentPassword.trim()) next.currentPassword = MY_PAGE_MSG.REQUIRED_FIELD
    setErrors(next)
    return !next.newEmail && !next.currentPassword
  }, [newEmail, currentPassword])

  const handleSubmit = useCallback(() => {
    if (!validate()) return
    updateEmail({ email: newEmail.trim(), currentPassword })
  }, [validate, updateEmail, newEmail, currentPassword])

  return (
    <>
      {/* 새 이메일 */}
      <div className={myPageEmailInlineEditStyles.fieldGroup}>
        <label className={myPageEmailInlineEditStyles.label}>{MY_PAGE_MSG.NEW_EMAIL_LABEL}</label>
        <BasicInput
          type='email'
          value={newEmail}
          placeholder={MY_PAGE_MSG.NEW_EMAIL_PLACEHOLDER}
          variant={errors.newEmail ? 'error' : 'default'}
          size='sm'
          onChange={(e) => setNewEmail(e.target.value)}
        />
        {errors.newEmail && (
          <span className={myPageEmailInlineEditStyles.errorText}>{errors.newEmail}</span>
        )}
      </div>

      {/* 현재 비밀번호 */}
      <div className={myPageEmailInlineEditStyles.fieldGroup}>
        <label className={myPageEmailInlineEditStyles.label}>
          {MY_PAGE_MSG.EMAIL_CURRENT_PASSWORD_LABEL}
        </label>
        <BasicInput
          type='password'
          value={currentPassword}
          placeholder={MY_PAGE_MSG.EMAIL_CURRENT_PASSWORD_PLACEHOLDER}
          variant={errors.currentPassword ? 'error' : 'default'}
          size='sm'
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {errors.currentPassword && (
          <span className={myPageEmailInlineEditStyles.errorText}>{errors.currentPassword}</span>
        )}
      </div>

      <div className={myPageEmailInlineEditStyles.footer}>
        <BasicButton variant='ghost' size='sm' onClick={handleCancel} disabled={isPending}>
          {MY_PAGE_MSG.CANCEL}
        </BasicButton>
        <BasicButton size='sm' onClick={handleSubmit} disabled={isPending}>
          {isPending ? MY_PAGE_MSG.EMAIL_SUBMITTING : MY_PAGE_MSG.EMAIL_SUBMIT}
        </BasicButton>
      </div>
    </>
  )
}
