---
name: api-skill
description: api, db 관련 작업시 사용.
---

- 인증/권한 관련 로직은 axiosInstance에서 통합관리.
- api 경로는 apiPaths에 정의하여 사용.
- 모든 response는 BasicResponse, ListResponse, PageResponse의 제너릭으로 반환.
- 반환 타입도 반드시 명시.
