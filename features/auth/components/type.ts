// AuthLoginForm 컴포넌트 props 타입
export type AuthLoginFormProps = {
  /** 계정 추가 클릭 핸들러 */
  onAddAccount: () => void
  /** 아이디 찾기 클릭 핸들러 */
  onFindUsername: () => void
  /** 비밀번호 찾기 클릭 핸들러 */
  onFindPassword: () => void
}
