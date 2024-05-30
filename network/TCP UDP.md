## 🚩 TCP와 UDP

- 전송 계층 프로토콜
- 프로세스 간 데이터 전송 기술
- port를 통해 호스트 안에서 프로세스 식별

| TCP (Transmission Control Protocol) | UDP (User Datagram Protocol) |
| --- | --- |
| 연결 지향형, 양방향 통신 (3-way handshake) | 비연결 (3-way handshake X) |
| 신뢰성있는 데이터 전송 보장 (by ack) | 확인 응답 X (응용 프로그램 수준에서 구현해야 함) |
| 순차적인 데이터 전송 보장 (by seq) | 순서 X |
| 흐름제어 및 혼잡 제어 제공 | X |

### UDP 장점

- 일방적으로 데이터를 전송하는 동작 방식으로 인해 전송 속도가 빠름 
- 데이터의 신뢰성보다는 실시간성이 중요할 때 (ex. 영상 스트리밍)
- multicast나 broadcast 통신이 필요할 때

### 데이터 전송 단위 비교

| Segment | Datagram |
| --- | --- |
| MSS 단위로 분할된 데이터에 TCP 헤더가 붙어 캡슐화된 데이터 단위 | UDP 헤더가 붙어 캡슐화된 데이터 단위 |
| <img src="https://user-images.githubusercontent.com/62097867/227858257-1f1bf07b-b0ff-442e-920a-dae72886d108.png" width="600px" /> | <img src="https://user-images.githubusercontent.com/62097867/227898332-fdd75bfe-4339-4a92-80ce-e22cd61e6f84.png" width="600px" /> |

- source port : 송신 포트
- destination port : 수신 포트
- sequence number
  - 분할된 세그먼트의 가장 빠른 바이트 번호가 할당
  - 수신 측에서 이를 통해 데이터를 순서대로 재조립
- acknowledgement number
  - 상대방에게 성공적으로 데이터를 전달받았음을 알리기 위해 사용
  - 다음에 전송받을 데이터의 시퀀스 넘버 할당
- TCP flags : 세그먼트의 기능을 표현
- window size : 수신 버퍼의 크기
- checksum : 무결성 검증

## TCP 통신 과정

`SYN` 패킷 : 연결 설정 요청

`ACK` 패킷 : 다음에 전송받을 데이터 번호 (성공적인 데이터 수신 여부를 의미)

### 1. 연결 설정 (3-way handshake)

![image](https://user-images.githubusercontent.com/62097867/227906993-7a895c66-7060-4b1e-b8e6-90c916f0f507.png)

1. 클라이언트 -> 서버 연결을 요청하는 패킷 송신
   - `SYN` 플래그 설정
   - seq: 랜덤으로 생성한 시퀀스 넘버 `x`

2. 서버 -> 클라이언트 연결 요청에 대한 응답과 동시에 연결을 요청하는 패킷 송신
   - `ACK`, `SYN` 플래그 설정
   - seq: 랜덤으로 생성한 시퀀스 넘버 `y`
   - ack: 클라이언트로 받은 패킷의 시퀀스 넘버에 1을 더한 값 `x+1`

3. 클라이언트 -> 서버 연결 요청에 대한 응답
   - `ACK` 플래그 설정
   - seq: 처음 보냈던 시퀀스 넘버 `x`
   - ack: 서버에서 보낸 시퀀스 넘버에 1을 더한 값 `y+1`

### 2. 데이터 교환

![image](https://user-images.githubusercontent.com/62097867/227907675-bd6252e2-38cb-4eff-a141-21aec1e14728.png)

1. 클라이언트 -> 서버 
   - seq: 세그먼트 바이트 수만큼 다음 시퀀스 넘버를 증가시킴
   - `ACK` 플래그 설정

2. 서버 -> 클라이언트
   - seq: 세그먼트 바이트 수만큼 다음 시퀀스 넘버를 증가시킴
   - ack: 클라이언트로 받은 패킷의 시퀀스 넘버 + 데이터 바이트 수 + 1
   - `ACK` 플래그 설정

💡 `ACK` 확인 응답이 오지 않는다면 패킷이 손실된 경우로 간주하고 데이터를 재전송하는 방식으로 데이터 전송의 신뢰성을 확보한다.

### 3. 연결 해제

![image](https://user-images.githubusercontent.com/62097867/227907198-780c1a30-e015-4dbb-b255-b9781bbc6751.png)

1. 클라이언트 -> 서버 연결 해제를 요청하는 패킷 송신
   - `FIN` 플래그 설정

2. 서버 -> 클라이언트 연결 종료에 대한 응답과 연결 종료를 요청하는 패킷 송신
   - `ACK`, `FIN` 플래그 설정
   - 서버에서 추가 작업이 필요한 경우 `ACK`를 먼저 보내고 작업 종료 후 `FIN`을 보낸다. (4-way handshake)

3. 클라이언트 -> 서버 연결 종료에 대한 응답
   - `ACK` 플래그 설정
