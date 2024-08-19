# Message Structure

```json
type: Subject

body

footer
```

### Type

어떤 의도로 커밋했는지 type을 명시한다.

| type |  |
| --- | --- |
| Feat | 새로운 기능을 추가한 경우 |
| Fix | 버그를 고친 경우 |
| Docs | 문서를 수정한 경우 [[]] |
| Style | 코드 포맷 변경, 세미 콜론 누락, 오타 수정, 변수명 변경 등 (코드 수정이 없음) |
| Refactor | 프로덕션 코드 리팩토링 |
| Test | 테스트 추카, 테스트 리팩토링 (프로덕션 코드 수정이 없음) |
| Chore | 빌드 관련 업데이트, 패키지 매니저 수정 등 (프로덕션 코드 수정이 없음) |
| Rename | 파일 혹은 폴더명을 수정하거나 옮김 |
| Remove | 파일을 삭제함 |
| Design | CSS 등 UI 변경 |
| Comment | 필요한 주석 추가 및 변경 |
| !HOTFIX | 급하게 치명적인 버그를 고친 경우 |

### Subject

- Do not end with a period
- Use imperative tone to describe what a commit does, rather than what it did.

### Body

- optional
- Use when a commit requires a bit of explanation and context
- Explain what and why

### Footer

- optional
- reference issue tracker IDs


https://udacity.github.io/git-styleguide/