// 공지사항 관리 페이지 문구 상수
export const NOTICE_MANAGE_MSG = {
  // 목록 페이지
  PAGE_TITLE: '공지사항 관리',
  CREATE_BUTTON: '공지 등록',
  EMPTY: '등록된 공지사항이 없습니다.',

  // 목록 컬럼
  COLUMN_NUMBER: '번호',
  COLUMN_TITLE: '제목',
  COLUMN_PUBLISHED: '게시',
  COLUMN_PINNED: '고정',
  COLUMN_AUTHOR: '작성자',
  COLUMN_CREATED_AT: '작성일',
  COLUMN_ACTIONS: '관리',

  // 게시/고정 상태 뱃지
  PUBLISHED: '게시',
  UNPUBLISHED: '미게시',
  PINNED: '고정',
  UNPINNED: '-',

  // 정렬 옵션
  PAGE_SIZE_SUFFIX: '개씩 보기',
  SORT_CREATED_DESC: '작성일 최신순',
  SORT_CREATED_ASC: '작성일 오래된순',
  SORT_TITLE_ASC: '제목 오름차순',
  SORT_TITLE_DESC: '제목 내림차순',

  // 등록 페이지
  NEW_PAGE_TITLE: '공지 등록',

  // 수정 페이지
  EDIT_PAGE_TITLE: '공지 수정',

  // 폼 공통
  LABEL_TITLE: '제목',
  TITLE_PLACEHOLDER: '제목을 입력하세요',
  LABEL_CONTENT: '내용',
  CONTENT_PLACEHOLDER: '내용을 입력하세요',
  LABEL_IS_PUBLISHED: '게시 여부',
  LABEL_IS_PINNED: '상단 고정',
  SUBMIT_CREATE: '등록',
  SUBMIT_EDIT: '수정 저장',
  SUBMITTING: '저장 중...',
  CANCEL: '취소',

  // 유효성
  REQUIRED_TITLE: '제목을 입력해주세요',
  REQUIRED_CONTENT: '내용을 입력해주세요',

  // 성공 메시지
  CREATE_SUCCESS: '공지사항이 등록되었습니다',
  UPDATE_SUCCESS: '공지사항이 수정되었습니다',
  DELETE_SUCCESS: '공지사항이 삭제되었습니다',

  // 실패 메시지
  CREATE_FAILED: '공지사항 등록에 실패했습니다',
  UPDATE_FAILED: '공지사항 수정에 실패했습니다',
  DELETE_FAILED: '공지사항 삭제에 실패했습니다',

  // 삭제 확인 모달
  DELETE_CONFIRM_TITLE: '공지사항 삭제',
  DELETE_CONFIRM_DESC: '이 공지사항을 삭제하시겠습니까? 삭제 후 복구할 수 없습니다.',
  DELETE_CONFIRM_LABEL: '삭제',

  // 액션 버튼
  ACTION_EDIT: '수정',
  ACTION_DELETE: '삭제',
} as const
