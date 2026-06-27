function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  apiBaseUrl: getEnvVar("NEXT_PUBLIC_API_BASE_URL", "http://localhost:3001"),
} as const;
