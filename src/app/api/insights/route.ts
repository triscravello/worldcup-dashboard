import { NextRequest, NextResponse } from "next/server";
import {
    BedrockRuntimeClient,
    ConverseCommand
} from "@aws-sdk/client-bedrock-runtime";
import { getMatch } from "@/lib/api";

// Initialize the Bedrock client using environment variables for auth
const client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || "us-east-1",
});

export async function POST(request: NextRequest) {
    try {
        const { matchId } = await request.json();

        // Validate that a match ID was provided
        if (!matchId) {
            return NextResponse.json(
                { error: "matchId is required" },
                { status: 400 }
            );
        }

        // Fetch the match data from the World Cup API
        const match = await getMatch(matchId);

        // Only generate insights for completed matches
        if (match.finished !== 'TRUE') {
            return NextResponse.json(
                { error: "Insights are only available for completed matches" },
                { status: 400 }
            );
        }

        // Build a tactical analysis prompt with match context
        const prompt = `You are a football tactical analyst. Provide a brief, insightful tactical summary (3-4 sentences) for this completed FIFA World Cup 2026 match:\n\n${match.home_team_name_en} ${match.home_score} - ${match.away_score} ${match.away_team_name_en}\nStage: ${match.type === "group" ? `Group ${match.group}` : match.group}\nGoal scorers - Home: ${match.home_scorers !== "null" ? match.home_scorers : "None"}, Away: ${match.away_scorers !== "null" ? match.away_scorers : "None"}\n\nFocus on what the scoreline tells us about tactics, key moments, and implications for the tournament.`;

        // Send the prompt to Claude Sonnet 5 via Bedrock
        const command = new ConverseCommand({
            modelId: "us.anthropic.claude-sonnet-5",
            messages: [
                {
                    role: "user",
                    content: [{ text: prompt }],
                },
            ],
            inferenceConfig: {
                maxTokens: 256,
            },
        });

        const response = await client.send(command);
        const insight = response.output?.message?.content?.[0]?.text || "No insight generated";

        return NextResponse.json({ insight });
    } catch (error: unknown) {
        console.error("Bedrock error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to generate insight", },
            { status: 500 }
        );
    }
}