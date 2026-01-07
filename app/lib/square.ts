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

    type TeamMemberProfile = {
      teamMemberId?: string;
      displayName?: string;
    };

    const configuredName = (process.env.SQUARE_TEAM_MEMBER_NAME ?? "").trim().toLowerCase();
    let firstAvailable: TeamMemberProfile | null = null;

    // Some versions of the Square SDK return an async-iterable page; others return a plain response.
    // We support the async-iterable case (used elsewhere in this repo).
    const maybeAsyncIterable = profilesPage as unknown as AsyncIterable<TeamMemberProfile>;
    const iteratorFn = (maybeAsyncIterable as { [Symbol.asyncIterator]?: unknown })[Symbol.asyncIterator];
    if (typeof iteratorFn === "function") {
      for await (const profile of maybeAsyncIterable) {
        if (!firstAvailable?.teamMemberId && profile?.teamMemberId) {
          firstAvailable = profile;
        }

        if (configuredName) {
          const display = (profile?.displayName ?? "").toLowerCase();
          if (display.includes(configuredName) && profile?.teamMemberId) {
            console.log(
              `[Square] Resolved team member by name "${configuredName}": ${profile.displayName} (${profile.teamMemberId})`,
            );
            return profile.teamMemberId;
          }
        }
      }
    }

    if (firstAvailable?.teamMemberId) {
      console.log(`[Square] Resolved default team member: ${firstAvailable.displayName} (${firstAvailable.teamMemberId})`);
      return firstAvailable.teamMemberId;
    }
  } catch (error) {
    console.warn("[Square] Failed to list team member profiles:", error);
  }

  throw new Error("No bookable team members found for this location. Please set SQUARE_DEFAULT_TEAM_MEMBER_ID.");
}
