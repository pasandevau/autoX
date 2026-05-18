import { google } from "googleapis";
import { NextResponse } from "next/server";

const PROPERTY_ID = "538214564";

function getAuth() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`
  );
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return auth;
}

export async function GET() {
  try {
    const auth = getAuth();
    const analyticsData = google.analyticsdata({ version: "v1beta", auth });

    const [overview, dailyUsers, topPages, devices, sources] = await Promise.all([
      // Overview stats (last 28 days)
      analyticsData.properties.runReport({
        property: `properties/${PROPERTY_ID}`,
        requestBody: {
          dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
          metrics: [
            { name: "activeUsers" },
            { name: "sessions" },
            { name: "screenPageViews" },
            { name: "engagementRate" },
            { name: "averageSessionDuration" },
            { name: "bounceRate" },
          ],
        },
      }),

      // Daily users for last 30 days chart
      analyticsData.properties.runReport({
        property: `properties/${PROPERTY_ID}`,
        requestBody: {
          dateRanges: [{ startDate: "29daysAgo", endDate: "today" }],
          dimensions: [{ name: "date" }],
          metrics: [{ name: "activeUsers" }, { name: "sessions" }],
          orderBys: [{ dimension: { dimensionName: "date" } }],
        },
      }),

      // Top pages
      analyticsData.properties.runReport({
        property: `properties/${PROPERTY_ID}`,
        requestBody: {
          dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
          dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
          metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
          limit: 10,
        },
      }),

      // Device breakdown
      analyticsData.properties.runReport({
        property: `properties/${PROPERTY_ID}`,
        requestBody: {
          dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
          dimensions: [{ name: "deviceCategory" }],
          metrics: [{ name: "activeUsers" }],
        },
      }),

      // Traffic sources
      analyticsData.properties.runReport({
        property: `properties/${PROPERTY_ID}`,
        requestBody: {
          dateRanges: [{ startDate: "28daysAgo", endDate: "today" }],
          dimensions: [{ name: "sessionDefaultChannelGroup" }],
          metrics: [{ name: "sessions" }, { name: "activeUsers" }],
          orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
          limit: 8,
        },
      }),
    ]);

    const overviewRow = overview.data.rows?.[0]?.metricValues ?? [];

    return NextResponse.json({
      overview: {
        activeUsers:     parseInt(overviewRow[0]?.value ?? "0"),
        sessions:        parseInt(overviewRow[1]?.value ?? "0"),
        pageViews:       parseInt(overviewRow[2]?.value ?? "0"),
        engagementRate:  parseFloat(overviewRow[3]?.value ?? "0"),
        avgSessionDuration: parseFloat(overviewRow[4]?.value ?? "0"),
        bounceRate:      parseFloat(overviewRow[5]?.value ?? "0"),
      },
      dailyUsers: (dailyUsers.data.rows ?? []).map((r) => ({
        date:    r.dimensionValues?.[0]?.value ?? "",
        users:   parseInt(r.metricValues?.[0]?.value ?? "0"),
        sessions: parseInt(r.metricValues?.[1]?.value ?? "0"),
      })),
      topPages: (topPages.data.rows ?? []).map((r) => ({
        path:   r.dimensionValues?.[0]?.value ?? "",
        title:  r.dimensionValues?.[1]?.value ?? "",
        views:  parseInt(r.metricValues?.[0]?.value ?? "0"),
        users:  parseInt(r.metricValues?.[1]?.value ?? "0"),
      })),
      devices: (devices.data.rows ?? []).map((r) => ({
        device: r.dimensionValues?.[0]?.value ?? "",
        users:  parseInt(r.metricValues?.[0]?.value ?? "0"),
      })),
      sources: (sources.data.rows ?? []).map((r) => ({
        channel:  r.dimensionValues?.[0]?.value ?? "",
        sessions: parseInt(r.metricValues?.[0]?.value ?? "0"),
        users:    parseInt(r.metricValues?.[1]?.value ?? "0"),
      })),
    });
  } catch (err) {
    console.error("[/api/admin/analytics]", err);
    const message = err instanceof Error ? err.message : "Failed to fetch analytics";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
