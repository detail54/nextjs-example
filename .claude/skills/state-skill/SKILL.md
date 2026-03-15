---
name: state-skill
description: 서버상태, 클라이언트 상태 관리 작업시 사용.
---

- 클라이언트 상태는 zustand로 관리.
- 서버상태는 tanstack query로 관리.
- 불필요한 클라이어트 상태 확장 금지.
- 모든 GET요청은 useQuery로 관리.
- 페이지네이션으로 관리되는 useQuery항목에 useMutation 으로 create, delete 시 해당 항목 useQuery 모두 초기화. update시 해당 페이지 쿼리키 값만 invalidateQueries로 업데이트.
