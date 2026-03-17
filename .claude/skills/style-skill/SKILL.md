---
name: style-skill
description: 스타일 관련 규칙. 컴포넌트 생성 및 스타일 작업시 항상 사용.
---

- 반응형 고려하여 작업.
- 새 페이지 생성시 상단 여백 60px.
- 새 컴포넌트 생성시 componentName.tsx + componentName.style.ts 무조건 한쌍. tsx에서 스타일 import해서 사용.
- 글로벌 스타일 설정 금지. 따로 요청할때만 작성/수정.
- tailwind.config.ts에 설정되어있는 컬러만 사용.
- 스타일정의 문자열은 프리티어 printWidth 100만큼 지정하고 긴 경우 cva에 여러줄 나눠서 작성. 순서는 1. 블록 타입 관련. 2. 배치와 margin, padding 관련. 3. 요소 round, border와 같은 속성관련. 4. 텍스트 관련 (word break, white space, color, size 등). 5. 애니메이션. 6. 그외
