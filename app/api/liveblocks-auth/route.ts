import { Liveblocks } from "@liveblocks/node";
import { NextRequest, NextResponse } from "next/server";

function getLiveblocks() {
  return new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
  });
}

const NAMES = [
  "Ada Lovelace",
  "Grace Hopper",
  "Alan Turing",
  "Margaret Hamilton",
  "Linus Torvalds",
  "Tim Berners-Lee",
  "Hedy Lamarr",
  "Dennis Ritchie",
];

const COLORS = [
  "#FF4F30",
  "#3B82F6",
  "#22C55E",
  "#EAB308",
  "#A855F7",
  "#EC4899",
  "#14B8A6",
  "#F97316",
];

function getSessionUser(request: NextRequest): {
  userId: string;
  name: string;
  color: string;
} {
  const cookie = request.cookies.get("lb-session");

  if (cookie?.value) {
    try {
      return JSON.parse(cookie.value);
    } catch {
      // Cookie corrupted, create new session
    }
  }

  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const userId = `user-${Math.random().toString(36).slice(2, 9)}`;

  return { userId, name, color };
}

export async function POST(request: NextRequest) {
  const user = getSessionUser(request);

  const liveblocks = getLiveblocks();

  const session = liveblocks.prepareSession(user.userId, {
    userInfo: {
      name: user.name,
      color: user.color,
    },
  });

  session.allow("demo-concriterio", session.FULL_ACCESS);

  const { body, status } = await session.authorize();

  const response = new NextResponse(body, { status });

  response.cookies.set("lb-session", JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return response;
}
