- [SOP (Same-Origin Policy)](SOP%20(Same-Origin%20Policy)))
- [CORS (Cross-Origin Resource Sharing)](.md))
- [CORS의 동작 과정](CORS의%20동작%20과정)
	- [단순 요청 (Simple Request)](단순%20요청%20(Simple%20Request)))
	- [예비 요청 (Preflight Request)](예비%20요청%20(Preflight%20Request)))
	- [인증된 요청 (Credentialed Request)](인증된%20요청%20(Credentialed%20Request)))
- [CORS 문제 해결 방법](CORS%20문제%20해결%20방법)
	- [서버에서 Access-Control-Allow-Origin 세팅하기](서버에서%20Access-Control-Allow-Origin%20세팅하기)
	- [프록시 설정](프록시%20설정)
	- [nginx 프록시 설정](nginx%20프록시%20설정)
- [HTML tag는 Cross-Origin 정책을 따른다.](HTML%20tag는%20Cross-Origin%20정책을%20따른다.)

## SOP (Same-Origin Policy)

> 같은 출처에서만 리소스를 공유할 수 있도록 하는 보안 정책

XSS나 CSRF 등의 보안 취약점을 노린 공격을 방어할 수 있다.

하지만 다른 출처의 리소스를 가져와서 사용하는 경우가 많아지면서 CORS 정책을 지킨 리소스 요청을 허용하게 되었다.

CORS 등장 이전에는 `JSONP` 라는 방식을 사용했었는데 현재는 보안상의 이슈로 사용하지 않는다.

## CORS (Cross-Origin Resource Sharing)

> HTTP 헤더를 사용하여 다른 출처(Origin)의 리소스를 공유할 수 있도록 하는 정책

같은 출처가 아닌 A, B가 있다고 가정하면, A가 B의 리소스를 요청했을 때, 추가 http 헤더를 붙여  A에서 B의 리소스를 요청할 수 있다는 것을 브라우저에게 알려주는 것.

📌 **동일** **출처(Origin)를 판단하는 기준은 url의 구성요소 3가지 ⇒ protocol, host, port**

![Untitled](../attachments/CORS%20(Cross-Origin%20Resource%20Sharing)/Untitled.png)

📌 출처를 비교하는 로직은 **브라우저**에 구현되어 있는 스펙이다. CORS 정책을 위반하는 요청에 서버가 정상적으로 응답을 하더라도 브라우저가 이 응답을 분석해서 CORS 정책 위반이라고 판단되면 그 응답을 사용하지 않고 버린다.

## CORS의 동작 과정

### 단순 요청 (Simple Request)

예비 요청 없이 바로 본 요청을 보내고 CORS 정책 위반 여부를 확인하는 방식이다.

![Untitled 1](../attachments/CORS%20(Cross-Origin%20Resource%20Sharing)/Untitled%201.png)

1. 클라이언트는 HTTP 요청 헤더의 `Origin`에 **요청을 보내는 출처**를 담아 전달한다.
2. 서버는 응답 헤더의 `Access-Control-Allow-Origin`에 **리소스를 접근하는 것이 허용된 출처**를 담아 전달한다.
3. 응답을 받은 브라우저는 자신이 보냈던 요청의 `Origin`과 서버가 보내준 응답의 `Access-Control-Allow-Origin`을 비교한다.
4. 응답이 유효하지 않다면 사용하지 않고 버린다.

<aside>
⚠️ 출처를 비교하는 로직은 **브라우저**에 구현되어 있는 스펙으로 응답의 파기 여부는 브라우저가 결정한다. **서버는 CORS 정책 위반 여부를 판단하지 않기 때문에** CORS 정책을 위반하는 요청에 서버가 정상적으로 응답을 할 수도 있다.
브라우저가 CORS 정책 위반 여부를 판단하는 것은 응답이 도착한 이후이기 때문에 서버 쪽 로그에는 정상 응답을 했다는 로그만 남기 때문에 헷갈리면 안된다!

</aside>

### 예비 요청 (Preflight Request)

![Untitled 2](../attachments/CORS%20(Cross-Origin%20Resource%20Sharing)/Untitled%202.png)

브라우저는 요청을 한번에 보내지 않고 예비 요청과 본 요청으로 나누어서 서버로 전송한다.

이때 브라우저가 본 요청을 보내기 전에 보내는 예비 요청을 **Preflight**라고 부르며 이 예비 요청에는 **`OPTIONS`** HTTP 메소드가 사용된다. 예비 요청의 역할은 본 요청을 보내기 전에 브라우저 스스로 이 요청을 보내는 것이 안전한지 확인하는 것이다.

이후 브라우저는 자신이 보낸 예비 요청과 서버가 응답에 담아준 허용 정책을 비교한 후 요청을 보내는 것이 안전하다고 판단되면 같은 엔드포인트로 다시 본 요청을 보내게 된다.

예비 요청의 Origin과 서버가 보내준 응답 헤더의 Access-Control-Allow-Origin이 같지 않으면 이 요청이 CORS 정책을 위반했다고 판단한다.

서버가 본 요청에 대한 응답을 하면 브라우저는 최종적으로 이 응답 데이터를 자바스크립트에게 넘겨준다.

### 인증된 요청 (Credentialed Request)

인증 관련 정보를 포함할 때 사용되는 방식이다.

기본적으로 브라우저가 제공하는 XMLHttpRequest 객체나 fetch API는 별도의 옵션없이 브라우저의 쿠키 정보나 인증과 관련된 헤더를 요청에 담지 않는다.

인증과 관련된 정보를 담을 수 있게 해주는 옵션이 바로 `credentials` 옵션이다. 이 옵션에는 다음과 같은 값을 사용할 수 있다.

| same-origin (기본값) | 같은 출처 간 요청에만 인증 정보를 담는다. |
| --- | --- |
| include | 모든 요청에 인증 정보를 담는다. |
| omit | 모든 요청에 인증 정보를 담지 않는다 |

`credentials` 값을 `include`로 사용하면 동일 출처 여부와 상관없이 요청에 인증이 포함된다. 이처럼 요청에 인증 정보가 담겨있는 상태에서 다른 출처의 리소스를 요청하게 되면 브라우저는 CORS 정책 위반 여부를 검사하는 룰에 두 가지를 추가하게 된다.

- Access-Control-Allow-Origin 에는 *를 사용할 수 없으며, 정확한 출처를 명시해야 한다.
- 응답 헤더에 Access-Control-Allow-Credentials가 true로 설정되어야 한다.

## CORS 문제 해결 방법

### 서버에서 Access-Control-Allow-Origin 세팅하기

- 서버에서 해당 값을 알맞게 세팅해주는 것이다.
- 가장 정석적이고 근본적인 해결책
- 와일드카드(*)를 사용하게 되면 모든 출처에서 오는 요청을 받으므로 보안 이슈가 발생할 수 있다.

### 프록시 설정

브라우저가 요청을 보낼 때 웹팩이 요청을 프록싱해주기 때문에 CORS 정책을 우회할 수 있다.

개발 환경에서만 통하는 방법으로 근본적인 문제 해결 방법이 아니다.

1. CRA 프로젝트일 경우 package.json에 proxy 추가
2. webpack dev server의 proxy 기능

### nginx 프록시 설정


## HTML tag

- link 태그의 href에서 다른 origin의 리소스(css 등)에 접근하는 것이 가능하다.
- img 태그의 src에서 다른 origin의 리소스에 접근하는 것이 가능하다.
- img 태그의 src, link 태그로 css, script 태그 등은 Cross-Origin 허용
- 하지만 스크립트 내에서 생성된 HTTP 요청은 SOP 적용