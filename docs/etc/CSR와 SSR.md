- [[SPA와 MPA]]
- [[Server Side Rendering]]
		- [[장점]]
		- [[단점]]
- [[Ajax의 등장]]
- [[Client Side Rendering]]
		- [[장점]]
		- [[단점]]

# SPA와 MPA

***SPA (Single Page Application)***

> 하나의 HTML 파일을 기반으로 자바스크립트를 통해 동적으로 화면의 컨텐츠를 바꾸는 방식의 웹 어플리케이션이다.
> 

***MPA (Multiple Page Application)***

> 사용자가 페이지를 요청할 때마다, 웹 서버가 요청한 UI와 필요한 데이터를 HTML로 파싱해서 보여주는 방식의 웹 어플리케이션이다.
> 

전통적인 방식을 이용한다면, SPA가 사용하는 렌더링 방식은 CSR이고, MPA가 사용하는 렌더링 방식은 SSR이다.

# Server Side Rendering

![Untitled](../attachments/CSR와%20SSR/Untitled.png)

사용자가 페이지를 요청할 때마다 해당 요청에 대한 HTML 파일을 받아와서 렌더링한다.

사용자가 요청할 때마다 다음과 같은 과정을 거치기 때문에 사용자는 잠시동안 빈화면을 마주해야 한다.

![클라이언트 요청 → 서버 응답 → 브라우저 렌더링 → View](../attachments/CSR와%20SSR/Untitled%201.png)

클라이언트 요청 → 서버 응답 → 브라우저 렌더링 → View

### 장점

- 초기 로딩 속도가 빠르기 때문에 사용자가 컨텐츠를 빨리 볼 수 있다.
- 검색 엔진 최적화가 가능하다.

### 단점

- 매번 페이지를 요청할 때마다 새로고침 되기 때문에 사용자 경험이 좋지 않다.
- 서버에 매번 요청을 하기 때문에 서버의 부하가 커진다.

# Ajax의 등장

Ajax의 등장으로 현재의 화면은 유치한 채 변경될 부분만 교체할 수 있게 되었다.

브라우저의 자바스크립트 엔진과 서버 사이간에 비동기적으로 XML (혹은 JSON)을 주고받을 수 있기 때문

![Untitled](../attachments/CSR와%20SSR/Untitled%202.png)

하지만 여전히 사용자에게 보여줄 템플릿을 생성하는 입장은 서버측이었다. 이 책임을 클라이언트단으로 옮긴 것이 CSR 방식!

# Client Side Rendering

![Untitled](../attachments/CSR와%20SSR/Untitled%203.png)

어플리케이션 초기 실행시에 HTML과 static 파일을 요청한 후 로드되면, 사용자의 상호작용에 따라 JavaScript를 통해 동적으로 렌더링한다.

사용자 액션에 따라 화면이 바뀌게 되면 변경되는 정보를 서버로부터 가져오는 것이 아니라 브라우저 내부에 이미 저장되어있는 템플릿 정보를 가져와서 사용자에게 보여주게 되는 것이다.

### 장점

- 첫 로딩만 기다리면 동적으로 빠르게 렌더링되기 때문에 높은 반응성을 제공하여 사용자 경험이 좋다.
- 서버에 요청하는 횟수가 훨씬 적기 때문에 서버의 부담이 덜하다.

### 단점

- 모든 스크립트 파일이 로드될 때까지 기다려야 한다.
- 검색엔진 최적화의 문제가 있다.

[SSR, AJAX, CSR](https://lunatics384.medium.com/ssr-ajax-csr-ab355343da71)

[SSR(Sever Side Rendering)과 CSR(Client Side Rendering)](https://ivorycode.tistory.com/entry/SSRSever-Side-Rendering%EA%B3%BC-CSRClient-Side-Rendering)