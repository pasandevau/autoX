import { google } from "googleapis";

function getAuth() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
  );
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return auth;
}

function encodeSubject(subject: string): string {
  return `=?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`;
}

function buildRaw(opts: {
  to: string;
  from: string;
  subject: string;
  html: string;
  replyTo?: string;
}): string {
  const headers = [
    `From: ${opts.from}`,
    `To: ${opts.to}`,
    ...(opts.replyTo ? [`Reply-To: ${opts.replyTo}`] : []),
    `Subject: ${encodeSubject(opts.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
  ].join("\r\n");

  const body = Buffer.from(opts.html, "utf-8")
    .toString("base64")
    .replace(/(.{76})/g, "$1\r\n");

  // The blank line between headers and body MUST be preserved — do not filter it
  const raw = `${headers}\r\n\r\n${body}`;

  return Buffer.from(raw).toString("base64url");
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const gmail = google.gmail({ version: "v1", auth: getAuth() });
  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: buildRaw({
        from: `AutoXpert Group <${process.env.GOOGLE_CALENDAR_ID ?? "admin@autoxpertgroup.org"}>`,
        ...opts,
      }),
    },
  });
}
