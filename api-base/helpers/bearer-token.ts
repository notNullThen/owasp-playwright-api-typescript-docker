export const formatBearerToken = (token: string): string => {
  const prefix = "Bearer " as const;
  return token.startsWith(prefix) ? token : prefix + token;
};
