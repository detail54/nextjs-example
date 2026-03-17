import type { NoticeItem } from '../api/type'

/** 공지사항 상세 모달 props */
export type NoticeModalProps = {
  notice: NoticeItem | null
  onClose: () => void
}
