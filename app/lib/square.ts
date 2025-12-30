import { SquareClient, SquareEnvironment } from "square";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getSquareEnvironment(): (typeof SquareEnvironment)[keyof typeof SquareEnvironment] {
  const raw = (process.env.SQUARE_ENVIRONMENT ?? "sandbox").toLowerCase();
  return raw === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox;
}

export function getSquareClient(): SquareClient {
  return new SquareClient({
    token: getRequiredEnv("SQUARE_ACCESS_TOKEN"),
    environment: getSquareEnvironment(),
  });
}
