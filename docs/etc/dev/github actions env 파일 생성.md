1. 레포지토리 secrets에 환경변수를 등록한다.
2. yml 파일에서 .env파일 생성 단계를 추가한다.

```yaml
- name: Generate Enviromnet Variables File
        run: |
          echo "REACT_APP_API_URL=${{ secrets.REACT_APP_API_URL }}" >> .env
          echo "REACT_APP_KAKAO_CLIENT_SECRET=${{ secrets.REACT_APP_KAKAO_CLIENT_SECRET }}" >> .env
          echo "REACT_APP_KAKAO_API_KEY=${{ secrets.REACT_APP_KAKAO_API_KEY }}" >> .env
          echo "REACT_APP_KAKAO_REDIRECT_URL=${{ secrets.REACT_APP_KAKAO_REDIRECT_URL }}" >> .env
          echo "REACT_APP_KAKAO_LOGOUT_REDIRECT_URL=${{ secrets.REACT_APP_KAKAO_LOGOUT_REDIRECT_URL }}" >> .env
```