type EnvVarKey = "GITHUB_AUTH" | "GITHUB_OWNER" | "GITHUB_REPO" | "MY_PASSWORD" | "JWT_SECRET_KEY";

export const getEnvVar = (key: EnvVarKey) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};
