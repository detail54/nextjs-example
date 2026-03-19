// ─── 공통 서비스 결과 타입 ────────────────────────────────────────

type ServiceFailure = { ok: false; message: string; status: number }

/** 추가 데이터 없는 성공/실패 결과 */
export type ServiceResult = { ok: true } | ServiceFailure

/** 추가 데이터 포함 성공/실패 결과 */
export type ServiceDataResult<T extends Record<string, unknown>> =
  | ({ ok: true } & T)
  | ServiceFailure
