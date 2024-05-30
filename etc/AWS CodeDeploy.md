# appspec.yml 이란?

🔎 CodeDeploy에서 S3에 저장된 빌드 결과물을 인스턴스에 배포하기 위해 사용하는 스크립트

# appspec의 세가지 섹션

### files

```yaml
files:
  - source:  /
    destination: /home/ubuntu/(폴더이름)
```

- source : S3에서 인스턴스에 복사할 수정될 파일 또는 디렉토리를 식별한다. appspec.yml 파일에 상대적인 경로이다.
- destination : 인스턴스에서 파일이 복사되어야 하는 위치를 식별한다.
- source (S3) → destination (EC2)

### permissions

```yaml
permissions:
  - object: /home/ubuntu/(폴더이름)
    pattern: "**"
    owner: ubuntu
    group: ubuntu
		mode: 755
```

files 섹션에서 정의한 파일이 인스턴스에 복사된 후 해당 파일에 대한 권한을 설정한다.

- object : 권한이 적용되는 파일 또는 디렉터리를 지정한다.
- pattern (optional) : 권한을 적용할 패턴을 지정한다. 지정하지 않거나 `“**”`로 지정하면 타입이 일치하는 모든 파일에 적용된다.
- owner (optional) : object의 소유자 이름. 지정하지 않으면 원본 파일에 적용된 기존의 모든 소유자가 복사 작업 후에도 아무것도 변경되지 않는다.
- group (optional) : object의 그룹 이름. 지정하지 않으면 원본 파일에 적용된 모든 소유자가 복사 작업 후에도 아무것도 변경되지 않는다.
- mode (optional) : object에 적용할 권한을 지정하는 숫자 값

### hooks

- 수명 주기 이벤트 후크
    
    ![Untitled](../attachments/AWS%20CodeDeploy/Untitled.png)
    

```yaml
hooks:
  AfterInstall:
    - location: scripts/deploy.sh
      timeout: 60
      runas: ubuntu
```

배포 수명 주기 이벤트 후크를 스크립트와 매핑한다.

- location : 스크립트 경로. 어플리케이션 root를 기준으로 함.
- timeout (optional) : 스크립트 실행에 허용되는 최대 시간
- runas (optional) : 스크립트 실행 사용자. 기본적으로 인스턴스에서 실행중인 CodeDeploy 에이전트

# 배포 스크립트

```bash
#!/usr/bin/env bash

echo "> FE 배포합니다~"
sudo cp -rf /home/ubuntu/(폴더이름)/dist/* /var/www/html
```

빌드 결과물을 `/var/www/html` (웹서버의 기본 경로)로 복사한다.

🔎 `#!/usr/bin/env bash`는 절대경로에 상관없이 인터프리터의 위치를 찾아서 실행해준다.