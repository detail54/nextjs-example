'use client'

import { useState, useCallback } from 'react'
import BasicInput from '@/components/input/BasicInput'
import BasicButton from '@/components/button/BasicButton'
import { MY_PAGE_MSG } from '@/context/messages/myPageMsg'
import { useUpdatePassword } from '../hooks/useUpdatePassword'
import { myPagePasswordInlineEditStyles } from './MyPagePasswordInlineEdit.styles'

type Props = {
  onClose: () => void
}

// 비밀번호 인라인 변경 폼
export default function MyPagePasswordInlineEdit({ onClose }: Props) {
  // 현재 비밀번호 입력값
  const [currentPassword, setCurrentPassword] = useState('')
  // 새 비밀번호 입력값
  const [newPassword, setNewPassword] = useState('')
  // 새 비밀번호 확인 입력값
  const [confirmPassword, setConfirmPassword] = useState('')
  // 인풋별 에러 메시지
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const { mutate: updatePassword, isPending } = useUpdatePassword({ onSuccess: onClose })

  // 취소 시 초기화 후 닫기
  const handleCancel = useCallback(() => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setErrors({ currentPassword: '', newPassword: '', confirmPassword: '' })
    onClose()
  }, [onClose])

  // 비밀번호 일치 여부 (입력된 경우만)
  const isPasswordMatch = confirmPassword.length > 0 && newPassword === confirmPassword

  // 유효성 검사
  const validate = useCallback(() => {
    const next = { currentPassword: '', newPassword: '', confirmPassword: '' }
    if (!currentPassword.trim()) next.currentPassword = MY_PAGE_MSG.REQUIRED_FIELD
    if (!newPassword.trim()) next.newPassword = MY_PAGE_MSG.REQUIRED_FIELD
    if (!confirmPassword.trim()) {
      next.confirmPassword = MY_PAGE_MSG.REQUIRED_FIELD
    } else if (newPassword !== confirmPassword) {
      next.confirmPassword = MY_PAGE_MSG.PASSWORD_MISMATCH
    }
    setErrors(next)
    return !next.currentPassword && !next.newPassword && !next.confirmPassword
  }, [currentPassword, newPassword, confirmPassword])

  const handleSubmit = useCallback(() => {
    if (!validate()) return
    updatePassword({ currentPassword, newPassword })
  }, [validate, updatePassword, currentPassword, newPassword])

  return (
    <>
      {/* 현재 비밀번호 */}
      <div className={myPagePasswordInlineEditStyles.fieldGroup}>
        <label className={myPagePasswordInlineEditStyles.label}>
          {MY_PAGE_MSG.CURRENT_PASSWORD_LABEL}
        </label>
        <BasicInput
          type='password'
          value={currentPassword}
          placeholder={MY_PAGE_MSG.CURRENT_PASSWORD_PLACEHOLDER}
          variant={errors.currentPassword ? 'error' : 'default'}
          size='sm'
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {errors.currentPassword && (
          <span className={myPagePasswordInlineEditStyles.errorText}>
            {errors.currentPassword}
          </span>
        )}
      </div>

      {/* 새 비밀번호 */}
      <div className={myPagePasswordInlineEditStyles.fieldGroup}>
        <label className={myPagePasswordInlineEditStyles.label}>
          {MY_PAGE_MSG.NEW_PASSWORD_LABEL}
        </label>
        <BasicInput
          type='password'
          value={newPassword}
          placeholder={MY_PAGE_MSG.NEW_PASSWORD_PLACEHOLDER}
          variant={errors.newPassword ? 'error' : 'default'}
          size='sm'
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {errors.newPassword && (
          <span className={myPagePasswordInlineEditStyles.errorText}>{errors.newPassword}</span>
        )}
      </div>

      {/* 새 비밀번호 확인 */}
      <div className={myPagePasswordInlineEditStyles.fieldGroup}>
        <label className={myPagePasswordInlineEditStyles.label}>
          {MY_PAGE_MSG.CONFIRM_PASSWORD_LABEL}
        </label>
        <BasicInput
          type='password'
          value={confirmPassword}
          placeholder={MY_PAGE_MSG.CONFIRM_PASSWORD_PLACEHOLDER}
          variant={errors.confirmPassword ? 'error' : 'default'}
          size='sm'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword ? (
          <span className={myPagePasswordInlineEditStyles.errorText}>
            {errors.confirmPassword}
          </span>
        ) : isPasswordMatch ? (
          <span className={myPagePasswordInlineEditStyles.matchText}>
            {MY_PAGE_MSG.PASSWORD_MATCH}
          </span>
        ) : null}
      </div>

      <div className={myPagePasswordInlineEditStyles.footer}>
        <BasicButton variant='ghost' size='sm' onClick={handleCancel} disabled={isPending}>
          {MY_PAGE_MSG.CANCEL}
        </BasicButton>
        <BasicButton size='sm' onClick={handleSubmit} disabled={isPending}>
          {isPending ? MY_PAGE_MSG.PASSWORD_SUBMITTING : MY_PAGE_MSG.PASSWORD_SUBMIT}
        </BasicButton>
      </div>
    </>
  )
}
