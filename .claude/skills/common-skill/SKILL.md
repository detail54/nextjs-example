---
name: skill
description: 모든 요청/명령에 항상 사용.
---

- 상태값 설명이나 함수 설명에 대해 최대한 한글로 간결하게 주석 필수로 작성.
- 모든 문구는 context/ 에 feature별로 authMsg.ts, todosMsg.ts 등 파일에 작성. 키는 대문자로 사용하고 띄어쓰기필요한부분엔 \_ 사용. 하드코딩 금지.
- app 폴던 안에는 각 페이지별 route, layout, page만 구성.
- 모든 작은단위 컴포넌트는 재사용 가능하게 구현해주고 components 안에 넣어줘.
- 루트 components에 정의되어있는 컴포넌트를 단위별로 조립해서 사용하는 해당 features 에서만 사용하는 컴포넌트만 feature/components 안에 넣고 앞에 feature 이름 붙여서 생성. 예시 - TodoList, TodoItem 등.
- string, number, boolean 등 단일 값만 받아오는 경우가 아닌 모든 경우에 props와 api request, response params타입은 따로 type.ts파일에 작성. 해당 폴더 안에 type.ts로 분리. 예시 - feature/api/type.ts, feature/components/type.ts, feature/hooks/type.ts.
- db는 snake_case, 그외 api response나 frontend 단에서는 모두 camelCase로 사용.
- frontend에서는 클라이언트 상태는 zustand, 서버 상태는 tanstack query로 관리.
