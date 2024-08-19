쿼리가 stale한 경우 여전히 데이터를 cache에서 가져오지만 특정 조건에서 background refetch가 발생한다.

서버 데이터가 자주 변경되지 않는다면 매번 background refetch를 할 필요가 없다. staleTime 옵션으로 적절한 background refetch 시간을 설정한다.

- refetchOnMount : 캐시가 있고 stale 상태면 refetch한다. (default: true)
- refetchOnWindowFocus : window가 focus시 stale 상태면 자동으로 refetch한다. (default: true)
- refetchInterval : auto refetch (focus 되어있을 때만)
- refetchIntervalBackground 브라우저에 focus 되어있지 않아도 auto refetch. 수시로 데이터가 변경되는 경우에 좋다.
