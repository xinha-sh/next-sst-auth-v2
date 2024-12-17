import { type NextRequest, NextResponse } from "next/server";
import { client, setTokens } from "../../auth/auth-fns";

export async function GET(req: NextRequest) {
  console.log("auth/callback");
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const exchanged = await client.exchange(code!, `${url.origin}/api/callback`);
  if (exchanged.err) return NextResponse.json(exchanged.err, { status: 400 });
  await setTokens(exchanged.tokens.access, exchanged.tokens.refresh);
  return NextResponse.redirect(`${url.origin}/`);
}