// 공통 UI 문구
export const COMMON_MSG = {
  CONFIRM: '확인',
  CANCEL: '취소',
  CLOSE: '닫기',

  // 에픽 삭제 확인 모달
  EPIC_DELETE_CONFIRM_TITLE: '에픽을 삭제하시겠습니까?',
  EPIC_DELETE_CONFIRM_DESC: '에픽에 포함된 모든 태스크도 함께 삭제됩니다.',
  EPIC_DELETE_CONFIRM: '삭제',

  // 태스크 삭제 확인 모달
  TASK_DELETE_CONFIRM_TITLE: '태스크를 삭제하시겠습니까?',
  TASK_DELETE_CONFIRM_DESC: '삭제된 태스크는 복구할 수 없습니다.',
  TASK_DELETE_CONFIRM: '삭제',

  // DatePicker
  DATE_PICKER_PLACEHOLDER: '날짜 선택',
  DATE_PICKER_CLEAR: '날짜 초기화',
  DATE_PICKER_PREV_MONTH: '이전 달',
  DATE_PICKER_NEXT_MONTH: '다음 달',
  DATE_PICKER_ARIA_LABEL: '날짜 선택',
  DATE_PICKER_DAY_LABELS: ['일', '월', '화', '수', '목', '금', '토'] as const,
  DATE_YEAR_SUFFIX: '년',
  DATE_MONTH_SUFFIX: '월',
  DATE_DAY_SUFFIX: '일',
} as const
