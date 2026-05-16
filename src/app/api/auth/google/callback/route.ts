import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return new NextResponse(html(`
      <div class="error">
        <h2>❌ Authorization Failed</h2>
        <p>Google returned an error: <code>${error}</code></p>
        <a href="/api/auth/google">Try again →</a>
      </div>
    `), { headers: { "Content-Type": "text/html" } });
  }

  if (!code) {
    return new NextResponse(html(`
      <div class="error"><h2>❌ No authorization code received.</h2></div>
    `), { headers: { "Content-Type": "text/html" } });
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
    );

    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      return new NextResponse(html(`
        <div class="error">
          <h2>⚠️ No refresh token returned</h2>
          <p>This usually means the account was already authorized. To force a new refresh token:</p>
          <ol>
            <li>Go to <a href="https://myaccount.google.com/permissions" target="_blank">Google Account Permissions</a></li>
            <li>Remove access for your app</li>
            <li>Visit <a href="/api/auth/google">/api/auth/google</a> again</li>
          </ol>
        </div>
      `), { headers: { "Content-Type": "text/html" } });
    }

    return new NextResponse(html(`
      <div class="success">
        <div class="check">✅</div>
        <h2>Google Calendar Connected!</h2>
        <p>Add this line to your <code>.env.local</code> file, then restart the dev server:</p>
        <div class="token-box">
          <code>GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}</code>
          <button onclick="navigator.clipboard.writeText('GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}').then(()=>this.textContent='Copied!')">Copy</button>
        </div>
        <p class="note">Keep this token secret — it gives access to your calendar.</p>
      </div>
    `), { headers: { "Content-Type": "text/html" } });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new NextResponse(html(`
      <div class="error">
        <h2>❌ Token exchange failed</h2>
        <p>${message}</p>
      </div>
    `), { headers: { "Content-Type": "text/html" } });
  }
}

function html(body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>AutoXpert — Google Calendar Auth</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #F8F8F8; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
    .success, .error { background: white; border-radius: 16px; padding: 40px; max-width: 600px; width: 100%; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .success { border-top: 4px solid #FFB300; }
    .error { border-top: 4px solid #ef4444; }
    .check { font-size: 48px; margin-bottom: 16px; }
    h2 { font-size: 22px; color: #1A1A2E; margin-bottom: 12px; }
    p { color: #555; line-height: 1.6; margin-bottom: 16px; font-size: 15px; }
    code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 13px; }
    .token-box { background: #1A1A2E; color: #FFB300; border-radius: 10px; padding: 16px 20px; font-family: monospace; font-size: 13px; word-break: break-all; display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
    .token-box button { background: #FFB300; color: #1A1A2E; border: none; padding: 8px 14px; border-radius: 6px; font-weight: 700; cursor: pointer; white-space: nowrap; flex-shrink: 0; }
    .note { font-size: 13px; color: #999; }
    a { color: #FF8C00; }
    ol { padding-left: 20px; color: #555; line-height: 2; }
  </style>
</head>
<body>${body}</body>
</html>`;
}
