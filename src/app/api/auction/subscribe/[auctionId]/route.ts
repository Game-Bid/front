import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ auctionId: string }> }
) => {
  const { auctionId } = await params;
  const apiUrl = process.env.NEXT_API_URL;

  try {
    const response = await fetch(
      `${apiUrl}/api/v1/auction/subscribe/${auctionId}`,
      {
        headers: {
          Accept: "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      }
    );

    if (!response.ok || !response.body) {
      throw new Error(`SSE 요청 실패: ${response.status}`);
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Cache-Control",
      },
    });
  } catch (error) {
    console.error("SSE Proxy Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
