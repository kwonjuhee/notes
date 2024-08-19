- [Nginx](#Nginx)
- [Web Server](#Web%20Server)
- [Reverse Proxy](#Reverse%20Proxy)
- [Redirect HTTP to HTTPS](#Redirect%20HTTP%20to%20HTTPS)

# Nginx

> 경량 웹 서버이다. 클라이언트로부터 요청을 받았을 때 요청에 맞는 정적 파일을 응답해주는 HTTP Web Server로 활용되기도 하고, Reverse Proxy Server로 활용하여 WAS 서버의 부하를 줄일 수 있는 로드 밸런서로 활용되기도 한다.
> 
- Apache
    - 클라이언트로부터 받은 요청을 처리할 때 새로운 프로세스 또는 스레드를 생성하여 처리한다. 요청마다 스레드가 생성되므로 접속하는 사용자가 많으면 그만큼 스레드가 생성되어 CPU와 메모리 자원의 소모가 커진다.
    
    ![Untitled](attachments/Nginx/Untitled.png)
    
- 프로세스나 스레드라는 개념 대신 이벤트 처리 방식
    - 한 개 또는 고정된 프로세스만 생성하여 사용하고, 비동기 방식으로 요청들을 Concurrency 하게 처리할 수 있다.
- 프로세스와 스레드 생성 비용이 존재하지 않고 적은 자원으로도 효율적인 운용이 가능하다. 단일 서버에서도 동시에 많은 연결을 처리할 수 있다.

![Untitled](attachments/Nginx/Untitled%201.png)

- http 블록
    - HTTP 부분과 관련된 모듈의 지시어와 블록을 정의
    - http 블록의 내용은 server 블록의 기본값이 되고 server 블록의 내용은 location 블록의 기본값이 된다. 만약 상위 블록에서 선언된 지시어를 하위 블록에서 다시 선언하면 상위의 지시어는 무시된다.
    - server 블록 - 하나의 호스트를 선언하는데 사용
    - location 블록 - 특정 URL을 처리하는 방법을 정의
    - events 블록 - 네트워크의 작동 환경을 설정하는 지시어를 제공

# Web Server

> 클라이언트로부터 HTTP 요청을 받아들이고 HTML 문서와 같은 웹 페이지를 반환한다.
> 

```
server {
  listen 80;
  location / {
    root   /home/user/myapp/build;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html; # URI로 들어온 값과 동일한 파일이나 폴더를 찾고 없으면 index.html 을 보여준다. 예를 들어 /login 으로 요청이 들어온다면 login.html 혹은 login/index.html 을 찾을 것이다. React 는 SPA이기 때문에 index.html 밖에 없다. 따라서 해당 이름으로 된 파일이 없을 경우 index.html 을 보여주도록 설정하면 된다.
  }
}
```

# Reverse Proxy

> 리버스 프록시란 외부 클라이언트에서 서버로 접근 시 중간에서 중개자 역할을 하여 내부 서버로 접근할 수 있도록 도와주는 서버
> 

![Untitled](attachments/Nginx/Untitled%202.png)

- **보안** : 외부 사용자로부터 내부망에 있는 서버의 존재를 숨길 수 있다. 모든 요청은 리버스 프록시 서버에서 받으며, 매핑되는 내부 서버로 요청을 전달한다. 또한 Nginx는 SSL 설정도 가능하다.
- **로드밸런싱** : 리버스 프록시 서버가 내부 서버에 대한 정보를 알고 있으므로, 각 서버의 상태에 따라 부하를 분산시키며 요청을 전달할 수 있다.

- CORS 설정 가능
- proxy_pass로 포워딩

```
http {
    server {
        listen 80; # listen 미설정시 default -> 80
				server_name # 도메인이 있을 경우
				location /api {
			    add_header 'Access-Control-Allow-Origin' '*'; # CORS 관련 설정
			    proxy_pass http://localhost:8000; # :80/api 으로 들어온 요청을 :8000/api 으로 포워딩한다.
			    proxy_set_header X-Real-IP $remote_addr; # 실제 접속자의 IP
			    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 실제 접속자의 IP
					#X-Forwarded-For만 사용할 경우 변조의 위험이 있으므로 X-Real-IP를 같이 사용해준다.
			    proxy_set_header Host $http_host; #http 요청이 들어왔을시 호스트 명
			  }
    }
}
```

- Forward Proxy란
    
    ![Untitled](attachments/Nginx/Untitled%203.png)
    

# Redirect HTTP to HTTPS

![Untitled](attachments/Nginx/Untitled%204.png)

- 데이터를 보호하기 위해 https 기반 통신 구현
    - 오디오 및 비디오의 스트림을 주고 받을 때 서버 연결 자체의 보안은 TLS/SSL 기반의 HTTPS, 미디어 스트림의 보안은 DTLS 을 사용하여 보안성을 확보한다.
- 준비 사항
    - 인증서 (letsencrypt 무료 인증서)
- 과정
    - http로 접근시 443포트로 리다이렉트
    - 모든 요청을 https 로 받게됨