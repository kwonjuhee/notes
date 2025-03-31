"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/domains/auth/auth.actions";
import { Box } from "../Box";
import { Button } from "../Button";
import { Flex } from "../Flex";
import { Input } from "../Input";
import { Text } from "../Text";
import styles from "./LoginForm.module.css";

export interface LoginFormProps {
  onLoginSuccess?: () => void;
  refreshOnLoginSuccess?: boolean;
}

export const LoginForm = ({ onLoginSuccess, refreshOnLoginSuccess = false }: LoginFormProps) => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      await login(password);
      onLoginSuccess?.();

      if (refreshOnLoginSuccess) {
        router.refresh();
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
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
        hasError={Boolean(errorMessage)}
        onChange={handleChangePassword}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
      />
      <Text className={styles.message} variant="caption12">
        &nbsp;{errorMessage}
      </Text>
      <Button fullWidth disabled={password.length === 0} onClick={handleLogin}>
        잠금 해제
      </Button>
    </Box>
  );
};
