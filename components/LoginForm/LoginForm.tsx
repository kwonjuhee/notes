import { useState } from "react";
import { Box } from "../Box";
import { Button } from "../Button";
import { Flex } from "../Flex";
import { Input } from "../Input";
import { Text } from "../Text";
import styles from "./LoginForm.module.css";

export interface LoginFormProps {}

export const LoginForm = () => {
  const [password, setPassword] = useState("");

  const login = () => {
    // @TODO
  };

  return (
    <Box width="300px" height="300px" margin="auto" padding="16px">
      <Flex direction="column" align="center" gap={8}>
        <Text variant="heading30">🔒</Text>
        <Text variant="heading20">private</Text>
      </Flex>
      <Input
        className={styles.field}
        placeholder="암호를 입력해주세요"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            login();
          }
        }}
      />
      <Button fullWidth disabled={password.length === 0} onClick={login}>
        잠금 해제
      </Button>
    </Box>
  );
};
