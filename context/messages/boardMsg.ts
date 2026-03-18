// 보드 관련 문구 상수
export const BOARD_MSG = {
  PAGE_TITLE: '보드',
  COLUMN_TODO: '할 일',
  COLUMN_IN_PROGRESS: '진행 중',
  COLUMN_DONE: '완료',
  EMPTY_EPICS: '등록된 에픽이 없습니다.',
  EMPTY_COLUMN: '태스크가 없습니다.',
  TASKS_UNIT: '개',

  // 태스크 인라인 생성
  TASK_CREATE: '만들기',
  TASK_TITLE_PLACEHOLDER: '태스크 제목을 입력하세요',

  // 태스크 상세 패널
  TASK_PANEL_TITLE: '태스크 상세',
  TASK_STATUS_LABEL: '상태',
  TASK_DUE_DATE_LABEL: '마감일',
  TASK_DESCRIPTION_LABEL: '설명',
  TASK_TITLE_EMPTY: '제목 없음',
  TASK_DESCRIPTION_EMPTY: '설명을 추가하세요',

  // 에픽 등록/수정 패널
  EPIC_REGISTER: '에픽 등록',
  EPIC_REGISTER_TITLE: '에픽 등록',
  EPIC_EDIT_TITLE: '에픽 수정',
  EPIC_TITLE_LABEL: '에픽명',
  EPIC_TITLE_PLACEHOLDER: '에픽명을 입력하세요',
  EPIC_DESCRIPTION_LABEL: '설명',
  EPIC_DESCRIPTION_PLACEHOLDER: '에픽에 대한 설명을 입력하세요',
  EPIC_SUBMIT: '등록',
  EPIC_UPDATE_SUBMIT: '수정',
  EPIC_STATUS_LABEL: '상태',
  EPIC_STATUS_ACTIVE: '활성',
  EPIC_STATUS_INACTIVE: '비활성',
  EPIC_STATUS_COMPLETED: '완료',
  EPIC_DUE_DATE_LABEL: '마감일',
  EPIC_MORE_BUTTON: '더보기',
  EPIC_EDIT: '수정',
  EPIC_DELETE: '삭제',

  // 에픽 수정 완료 토스트
  EPIC_UPDATE_SUCCESS: '에픽이 수정되었습니다.',

  // 에픽 삭제 확인 모달
  EPIC_DELETE_CONFIRM_TITLE: '에픽을 삭제하시겠습니까?',
  EPIC_DELETE_CONFIRM_DESC: '에픽에 포함된 모든 태스크도 함께 삭제됩니다.',
  EPIC_DELETE_CONFIRM: '삭제',
} as const
