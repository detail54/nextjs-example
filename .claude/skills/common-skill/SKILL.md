---
name: common-skill
description: 모든 요청/명령에 항상 사용.
---

- prettierrc 설정 고려해서 코드 작성. (요청으로 인해 작업한 파일만.)

```
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

- 상태값 설명이나 함수 설명에 대해 최대한 한글로 간결하게 주석 필수로 작성.
- 모든 문구는 context/ 에 feature별로 authMsg.ts, todosMsg.ts 등 파일에 작성. 키는 대문자로 사용하고 띄어쓰기필요한부분엔 \_ 사용. 하드코딩 금지.
- app 폴던 안에는 각 페이지별 route, layout, page만 구성.
- db는 snake_case, 그외 api response나 frontend 단에서는 모두 camelCase로 사용.
