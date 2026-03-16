---
name: common-skill
description: 타입 작업시 사용.
---

- string, number, boolean 등 단일 값만 받아오는 경우가 아닌 모든 경우에 props와 api request, response params타입은 따로 type.ts파일에 작성. 해당 폴더 안에 type.ts로 분리. 예시 - feature/api/type.ts, feature/components/type.ts, feature/hooks/type.ts.
- 구분하기 쉽게 비슷한 타입들끼리 묶어서 나열.
- 필드 타입이 직접 지정하는 특정 string이나 number일 경우, 직접 나열하지않고 타입으로 따로 분류해서 사용.
