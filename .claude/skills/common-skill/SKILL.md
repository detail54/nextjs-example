---
name: skill
description: 모든 요청/명령에 항상 사용.
---

- 문구는 context/ 에 feature별로 authMsg.ts, todosMsg.ts 등 파일에 작성. 키는 대문자로 사용하고 띄어쓰기필요한부분엔 \_ 사용.
- app 폴던 안에는 각 페이지별 route, layout, page만 구성.
- 모든 작은단위 컴포넌트는 재사용 가능하게 구현해주고 components 안에 넣어줘.
- 루트 components에 정의된거 단위별로 조립해서 사용하는 해당 features 에서만 사용하는 컴포넌트만 feature/components 안에 넣고 앞에 feature 이름 붙여서 넣줘. 예를들면 TodoList, TodoItem 이런 컴포넌트들.
- string, number, bolean 이런 단일 값만 받아오는 경우가 아닌 모든 props와 api request, response 타입은 따로 type.ts파일에 작성. 해당 디렉터리안에 type.ts로 분리. 예를들면 feature/api/type.ts, feature/components/type.ts, feature/hooks/type.ts 이렇게.
- 상태값 설명이나 함수 설명에 대해 최대한 한글로 간결하게 주석 필수로 작성.
- db는 snake_case, 그외 api response나 frontend 단에서는 모두 camelCase로 사용.
- frontend에서는 클라이언트 상태는 zustand, 서버 상태는 tanstack query로 관리.
