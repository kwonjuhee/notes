# WebRTC란?

- Web Real-Time Communication의 약자
- 비디오, 음성 및 일반 데이터가 peer간에 실시간으로 전송되도록 지원하는 오픈소스
- 공개 웹 표준으로 구현되며 JavaScript API로 제공

# WebRTC의 기술 및 프로토콜

peer간 단순 연결시 작동하지 않음

- 연결을 시도하는 **방화벽**을 통과해야 함
- **단말에 Public IP가 없다**면 유일한 주소값을 할당해야 함
- **라우터가 peer간의 직접 연결을 허용하지 않을** 때, 데이터를 릴레이해야함.

## ICE (Interactive Connectivity Establishment)

- 브라우저가 peer를 통한 연결이 가능하도록 해주는 프레임 워크
- P2P 네트워킹에서 두 컴퓨터가 직접 서로 통신하는 방법을 찾기 위해 사용되는 프레임워크
- 위의 작업들을 수행하기 위해 **STUN**과 **TURN** 서버 **둘 다 혹은 하나**의 서버를 사용

![Untitled](attachments/WebRTC/Untitled.png)

## STUN (Session Traversal Utilities for NAT)

![Untitled](attachments/WebRTC/Untitled%201.png)

- 클라이언트는 STUN 서버에 다음을 요청함
    - 클라이언트 자신의 Public Address (IP:Port)
    - 라우터의 NAT 뒤에 있는 peer가 접근 가능한지에 대한 답변

## NAT

- 단말에 Public IP 주소를 할당하기 위해 사용
- 라우터는 공개 IP 주소를 갖고 있지만 라우터에 연결되어 있는 모든 단말들은 비공개 IP 주소를 갖고 있기 때문
- 단말의 비공개 주소로부터 라우터의 공개 주소와 유일한 포트를 기반으로 번역함. 이 덕분에, 각각의 단말이 공개 IP 없이 인터넷 상에서 검색 가능.
- 몇몇 라우터들은 Symmetric NAT이라고 불리는 제한을 위한 NAT을 채용함. 오직 이전에 연결한 적이 있는 peer과의 연결들만 허용함.
- STUN 서버에 의해 공개 IP 주소를 발견하다고 해도 모든 연결이 허용되는 것은 아님 (이것이 STUN 서버에 다른 peer가 접근 가능한지 여부를 요청하는 이유)

## TURN (Traversal Using Relays aroung NAT)

- Symmetric NAT 제한을 우회
- 패킷 어쩌구 오버헤드

피어간 직접 통신이 실패할 경우 미디어 스트리밍을 릴레이 해주는 서버. 그래서 오버헤드 발생

P2P 연결을 위해서, peer간의 offer와 answer를 통한 session 정보를 중계해주는 서버를 만들어 줘야함.

하지만 P2P 연결로 다인원의 데이터 송수신을 지원하게 되면, 클라이언트 측면에서의 과부하가 심하게 옴.

이를 위한 해결책으로, SFU와 MCU 방식의 미디어 서버를 둔다.

# 서버의 종류

![Untitled](attachments/WebRTC/Untitled%202.png)

Uplink : 나의 데이터를 연결된 다른 사용자에게 보내는 갯수

Downlink: 연결된 다른 사용자의 데이터가 나에게 들어오는 갯수

## Signaling 서버 (P2P/Mesh)

- peer간의 offer, answer라는 session 정보 signal만을 중개함.
- 처음 peer간의 정보를 중계할 때만 서버에 부하가 발생하고, 연결이 완료된 후에는 별도의 부하가 없다.
- 1:1 연결에 적합
- N:M 연결에서 클라이언트의 과부하가 급격하게 증가

## SFU (Selective Forwarding Unit)

- peer간 미디어 트래픽을 중개하는 중앙 서버 방식
- 서버와 클라이언트 간의 peer를 연결
- 모든 연결 형식에서 클라이언트는 서버에게만 자신의 데이터를 보내면 됨 (Uplink 1개)
- 상대방의 수만큼 데이터를 받는 peer를 유지해야함 (Downlink는 signaling 서버일때와 동일)
- 1:N 또는 소규모의 N:M 형식의 실시간 스트리밍에 적합함.

## MCU


# 시그널링 흐름

## 1. SDP 교환 - Offer, Answer

![Untitled](attachments/WebRTC/Untitled%203.png)

![Untitled](attachments/WebRTC/Untitled%204.png)

1. Alice 가 SDP 형태의 Offer 메시지를 생성한다.
2. Alice가 생성된 Offer 메시지를 본인의 LocalDescription으로 등록한다.
3. Alice가 Offer메시지를 시그널링 서버에게 전달한다.
4. 시그널링서버는 상대방 Bob을 찾아서 SDP 정보를 전달한다.
5. Bob은 전달받은 Offer메시지를 본인의 RemoteDecsription에 등록한다.
6. Bob은 Answer 메시지를 생성한다.
7. 생성된 Answer 메시지를 본인의 LocalDescription으로 등록한다.
8. Bob은 Answer 메시지를 시그널링서버에게 전달한다.
9. 시그널링서버는 상대방 Alice를 찾아서 Answer 메시지를 전달한다.
10. Alice는 전달받은 Anser 메시지를 본인의 RemoteDescription에 등록한다.

## 2. ICE 협상

SDP를 서로 교환한 후, 각 peer들은 서로의 주소 값을 알기 위해 ICE Candidate를 교환한다. 이 떄 NAT Traversal 기술이 사용된다.

# 서버 구현

- 각 peer간 SDP 메시지 Offer, Answer를 전달해주고 ICE 후보를 주고 받을 수 있도록 돕는 서버
- peer 관리를 해주는 포워딩 서버
    - 룸은 소켓이 참여하고 나갈 수 있는 임의의 채널
    - 클라이언트의 하위 집합에 이벤트를 브로드캐스트하는 데 사용할 수 있다.

[http://jaynewho.com/post/36](http://jaynewho.com/post/36)

![Untitled](attachments/WebRTC/Untitled%205.png)