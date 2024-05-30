

## 등장 배경

OAuth가 사용되기 전에는 인증방식의 표준이 없었기 때문에 아이디와 비밀번호를 사용하였다. 하지만 이는 보안상 취약한 구조이다.

이를 해결하기 위해 각자 회사가 개발한 방법을 사용하였다. 예를 들면 구글의 AuthSub, AOL의 OpenAuth, 야후의 BBAuth, 아마존의 웹서비스 API 등이 있다.

OAuth는 이렇게 제각각인 인증 방식을 표준화한 인증 방식이다. OAuth를 이용하면 이 인증을 공유하는 애플리케이션끼리는 별도의 인증이 필요없다. 따라서 여러 애플리케이션을 통합하여 사용하는 것이 가능하게 된다.

OAuth 2.0은 1.0a에 비해 모바일 애플리케이션에 대한 지원이 우수하고 더 높은 보안을 제공하며 토큰 만료 및 리프레시 토큰 기능을 포함한다.


## OAuth란?

외부 서비스 (Google, Facebook, Apple, Twitter 등)의 리소스에 대한 접근 권한을 제 3자 어플리케이션(우리 서비스)에 위임하는 방식을 제공하는 개방형 표준 프로토콜

사용자들이 비밀번호를 제공하지 않아도 외부 서비스의 사용자 정보를 사용할 수 있다.
ex. 구글로 로그인하는 경우 사용자 계정의 구글 캘린더 정보를 가져와 보여줄 수 있다.

- 사용자 입장에서 id, password를 신뢰할 수 없는 서비스에 넘겨주지 않아도 된다.
- 서비스 입장에서 사용자의 민감한 정보를 직접 관리하지 않아도 된다.


## OAuth 2.0 구성

- **Resource Owner (User)** : 보호된 리소스에 접근할 수 있는 자격을 부여해주는 주체. 인증을 수행하여 권한 획득 자격(Authorization Grant)를 클라이언트에 부여한다. (개념적으로는 리소스 소유자가 자격을 부여하는 것이지만 일반적으로 권한 서버가 리소스 소유자와 클라이언트 사이에서 중개 역할 수행)
- **Client** : 보호된 자원을 사용하려고 접근 요청을 하는 애플리케이션
- **Resource Server** : 사용자의 보호된 자원을 보유하는 서버 (Google, Facebook, Apple, Twitter 등)
- **Authorization Server** : 리소스 소유자를 인증/인가를 수행하는 서버로 클라이언트의 접근 자격을 확인하고 access token을 발급하여 권한을 부여하는 역할을 수행한다.


## 인증 승인 방식

### 권한 부여 승인 코드 방식 (Authorization Code Grant)

![[OAuth (Open Authorization)-1.png]]

- 권한 부여 승인을 위해 자체 생성한 authorization code를 전달하는 방식으로 가장 기본적으로 사용한다.
- refresh token 사용이 가능하다.

### 암묵적 승인 방식 (Implicit Grant)

![[OAuth (Open Authorization)-2.png]]

- 자격증명을 안전하게 저장하기 힘든 클라이언트(ex. 브라우저)에게 최적화된 방식
- 권한 부여 승인 코드 없이 바로 access token이 발급된다. (url로 전달)
- refresh token 사용이 불가능한 방식이다.
- 권한 서버는 client_secret을 사용해 클라이언트를 인증하지 않는다.

> authorization code가 필요한 이유
> 
>  인증 서버는 사용자 로그인 이후 redirect uri를 통해서 데이터를 전달하는 방식을 사용한다. 따라서 인가 코드 없이 바로 토큰을 전달한다면 access token이 브라우저를 통해 쉽게 노출되는 문제가 발생한다.

### 패스워드 자격증명 승인 방식 (Password Credentials Grant)

![[OAuth (Open Authorization)-3.png]]

- username과 password를 직접 사용하여 access token을 받는 방식
- 권한 서버, 리소스 서버, 클라이언트가 모두 같은 시스템에 속해있을 때 사용되어야 한다.
- refresh token 사용이 가능하다.

### 클라이언트 자격증명 승인 방식 (Client Credentials Grant)

![[OAuth (Open Authorization)-4.png]]

- 클라이언트의 자격증명만으로 access token을 받는 방식
- 가장 간단한 방식으로 클라이언트가 관리하는 리소스 혹은 권한 서버에 해당 클라이언트를 위한 제한된 리소스 접근 권한이 설정되어 있는 경우 사용된다.
- 자격증명을 안전하게 보관할 수 있는 클라이언트에서만 사용되어야 한다.
- refresh token은 사용할 수 없다.


## OAuth Authorization Flow

먼저 클라이언트를 등록한 뒤 다음과 같은 항목들을 발급받는다.

- client id : 클라이언트 어플리케이션을 구별할 수 있는 식별자
- client secret : client id에 대한 비밀키로서 노출되어서는 안된다.
- authorized redirect url : authorization code를 전달받을 리다이렉트 주소

![[OAuth (Open Authorization).png]]

![[OAuth (Open Authorization)-1.png]]

1. 사용자가 로그인을 요청한다.
2. 권한 서버가 제공하는 authorization url (로그인 페이지)로 이동하고 사용자에게 인증을 요청한다. 이때 client_id, redirect_uri, response_type 등을 쿼리 파라미터로 보낸다.
3. 인증이 성공되었다면 쿼리 스트링으로 넘어온 파라미터들을 통해 client를 검증한다.
	1. client id와 동일한 id 값이 존재하는지
	2. 해당 client id에 등록된 redirect url과 파라미터로 전달된 값과 동일한지
4. 검증 후 최종적으로 사용자의 승인을 받고 클라이언트를 redirect uri로 리다이렉트 시킨다. 이때 redirect uri로 인가 코드(authorization code)가 함께 전달된다.

### Step 2. 토큰 받기

1. 클라이언트는 인가 코드를 권한 서버에 전달하여 access token을 요청한다. 이때 보안을 강화하기 위해 client secret을 추가로 사용할 수 있다.
2. 권한 서버는 유효한 요청인지 검사한 후 access token을 발급하여 응답한다.

### Step 3. 사용자 로그인 처리

클라이언트는 해당 토큰을 서버에 저장해두고 리소스 서버의 자원을 사용하기 위한 API 호출시 해당 토큰을 헤더에 담아 보낸다.


## 프론트엔드와 백엔드의 클라이언트 역할 분담

### authorization url 생성

- 권한 서버가 제공하는 로그인 페이지로 이동하기 위한 authorization url을 생성하기 위해서 client id, redirect uri, scope 등의 정보가 필요하다.
- 프론트엔드에서 생성하게 되면 위 정보들을 프론트엔드 단에서도 가지고 있어야 한다. 동일한 정보를 프론트엔드, 백엔드에서 각각 들고있게 됨

### 인가 코드 전달 및 access token 발급

- 프론트엔드가 백엔드로 인가 코드를 전달한다.
- 백엔드는 전달받은 인가 코드를 권한 서버에 전달하여 access token을 요청한다.
- 프론트엔드에서 직접 access token을 요청해도 되지만 client secret을 사용한다면 이는 유출되어서 안되는 정보이기 때문에 백엔드에서 처리하도록 한다.


## Reference

- https://blog.naver.com/mds_datasecurity/222182943542
- https://tecoble.techcourse.co.kr/post/2021-07-10-understanding-oauth/
- https://hudi.blog/oauth-2.0/