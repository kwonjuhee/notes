import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { Text } from "@/components/Text";

export default function NotFound() {
  return (
    <Flex direction="column" align="center" gap={24} marginTop="230px">
      <Text variant="heading30">NOT FOUND</Text>
      <Text variant="label16">존재하지 않는 페이지입니다</Text>
      <Button href="/notes">홈으로 가기</Button>
    </Flex>
  );
}
