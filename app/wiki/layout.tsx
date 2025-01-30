import { Box } from "@/components/Box";
import { Flex } from "@/components/Flex";
import { SideBar } from "./components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex width="100%">
      <Box flexShrink={0} overflowY="auto" position="sticky" top="0">
        <SideBar />
      </Box>
      <Box flexGrow={1}>{children}</Box>
    </Flex>
  );
}
