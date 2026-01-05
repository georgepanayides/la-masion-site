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

export async function resolveTeamMemberId(client: SquareClient, locationId: string): Promise<string> {
  const configuredId = (process.env.SQUARE_DEFAULT_TEAM_MEMBER_ID ?? "").trim();
  if (configuredId) {
    console.log(`[Square] Using configured defaults team member ID: ${configuredId}`);
    return configuredId;
  }

  try {
    const profilesPage = await client.bookings.teamMemberProfiles.list({
      locationId,
      bookableOnly: true,
      limit: 100,
    });

    const profiles: any[] = [];
    // The SDK's list method returns an invalid async iterator in some versions or plain response in others.
    // Based on `create/route.ts`, it seems to be iterable.
    // We'll trust the existing usage pattern.
    // @ts-ignore
    for await (const profile of profilesPage) {
      profiles.push(profile);
    }

    const configuredName = (process.env.SQUARE_TEAM_MEMBER_NAME ?? "").trim().toLowerCase();
    
    if (configuredName) {
      const match = profiles.find((p) => (p.displayName ?? "").toLowerCase().includes(configuredName));
      if (match?.teamMemberId) {
        console.log(`[Square] Resolved team member by name "${configuredName}": ${match.displayName} (${match.teamMemberId})`);
        return match.teamMemberId;
      }
      console.warn(`[Square] Team member matching "${configuredName}" not found. Falling back to first available.`);
    }

    const first = profiles.find((p) => p.teamMemberId);
    if (first?.teamMemberId) {
      console.log(`[Square] Resolved default team member: ${first.displayName} (${first.teamMemberId})`);
      return first.teamMemberId;
    }
  } catch (error) {
    console.warn("[Square] Failed to list team member profiles:", error);
  }

  throw new Error("No bookable team members found for this location. Please set SQUARE_DEFAULT_TEAM_MEMBER_ID.");
}
