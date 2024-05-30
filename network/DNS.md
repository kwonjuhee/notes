## DNS (Domain Name System)

> 웹 브라우저는 IP 주소를 통해 상호작용한다. 하지만 사람이 복잡한 IP 주소를 일일이 기억하는 것은 어렵기 때문에 문자로 구성된 **도메인**이 등장하였다.

🚩 **DNS**는 도메인과 IP 주소를 서로 연결시켜주는 시스템이다.

- 체계적인 분류와 관리를 위해 `.`으로 연결된 계층 구조를 갖고 있다.
- 각 네임 서버는 도메인 계층의 일부 영역(zone)을 담당하고 그 영역에 속한 도메인을 관리한다.
- 상위 계층의 네임 서버는 하위 계층의 도메인에 대한 정보를 관리하고 하위 계층 네임 서버의 IP 주소를 갖고있다.
- 하나의 서버가 여러 도메인을 가질 수도, 여러 IP 주소가 하나의 도메인에 대응할 수도 있다.
- DNS 프로토콜은 대부분 UDP를 이용한다.
   - 신뢰성보다는 속도가 중요
   - dns 서버는 클라이언트와 연결 상태를 유지할 필요가 없다. -> 더 많은 클라이언트 수용 가능

## DNS 계층 구조

<p align="center">
<img src="https://user-images.githubusercontent.com/62097867/227954825-3a16b7e6-bd0a-41e7-8c57-deaeece04c35.png" width="700px" />
</p>
                                  
- **Root 네임서버**
  - 루트 도메인을 관리하는 DNS

- **TLD 네임서버**
  - 최상위 도메인 (Top Level Domain)
  - gTLD (generic) : .com .org .net 등등
  - ccTLD (country code) : 국가 코드 도메인 .kr, .us, .jp 등등

- **authoritative 네임서버**
  - DNS 레코드를 보유하고 있는 서버
  - DNS A Record에서 찾은 IP 주소를 resolver에게 제공
  - CNAME Record(alias)를 갖고있다면 도메인을 제공
    - resolver는 해당 도메인의 IP 주소를 찾기위해 전체 DNS lookup 과정을 다시 수행

## Recursive DNS Resolver

<p align="center">
<img src="https://user-images.githubusercontent.com/62097867/227949917-7ca01aee-098d-4e55-8f5c-15a8b9c5bab1.png" width="700px" />
</p>

- 클라이언트는 DNS 시스템에 직접 쿼리를 수행하지 않고 DNS resolver에게 요청한다.
- DNS resolver는 캐시된 데이터를 응답하거나 네임서버에 쿼리를 수행한다.
- 대부분의 인터넷 사용자는 ISP에서 제공하는 resolver를 사용한다.
- local DNS?

## DNS 쿼리 과정

![image](https://user-images.githubusercontent.com/62097867/227949829-0628a675-4cac-47c8-9fa7-21ddf70f205a.png)

1. 사용자가 웹 브라우저 주소창에 도메인(`example.com`)을 입력하면 쿼리가 인터넷으로 이동하여 DNS resolver에게 전달된다.
2. resolver는 root 서버(`.`)에게 요청한다.
3. root 서버는 요청한 도메인의 정보가 저장되어 있는 TLD 서버(`.com`)의 주소를 응답한다.
4. DNS resovler는 `.com` TLD에게 요청한다.
5. TLD 서버는 `example.com` 도메인 네임서버의 IP 주소를 응답한다.
6. 마지막으로 DNS resovler는 도메인 네임서버에 요청을 보낸다.
7. DNS resolver는 네임서버로부터 `example.com`의 IP주소가 응답받는다.
8. DNS resolver는 전달받은 IP 주소를 웹 브라우저에게 응답한다.

=> IP 주소를 반환하면 브라우저는 해당 IP 주소에 HTTP 요청을 하고 서버로부터 웹 페이지를 응답받는다!

## DNS 캐싱

- DNS 쿼리를 더 빨리 해결하여 로드 시간을 개선하고 bandwidth/CPU 소비를 줄일 수 있다.
- DNS 데이터는 다양한 위치에 캐시될 수 있고 DNS 레코드는 지정된 시간(TTL)동안 유지된다.

<p align="center">
<img src="https://user-images.githubusercontent.com/62097867/227952976-1d3fb83e-3aaa-4e7a-a7e2-33a6ac407fd6.png" width="700px" />
</p>

**1. 브라우저 캐싱 확인**

   - 모던 브라우저는 기본적으로 DNS 레코드를 캐시하도록 설계되어 있다.
   - DNS 쿼리가 요청되면 제일 먼저 브라우저 캐시를 확인한다.

**2. OS 수준 캐싱 확인**

   - stub resolver 혹은 DNS 클라이언트라고 한다.
   - 브라우저 캐시를 확인한 후 stub resolver가 자체 캐시를 확인한다.
   - 여기서도 캐시된 것이 없으면 ISP 내부의 DNS recursive resolver에게 DNS 쿼리를 전달한다.

**3. recursive resolver 캐싱 확인**

   - A 레코드가 없지만 NS 레코드가 있는 경우 해당 네임서버에 바로 쿼리한다.
   - NS 레코드가 없으면 root 서버를 건너 뛰고 TLD 서버에 쿼리한다.
   - TLD 서버 주소가 없는 경우 root 서버로 쿼리한다.

https://www.cloudflare.com/learning/dns/what-is-dns/

