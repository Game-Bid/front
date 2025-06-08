import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ auctionId: string }> }
) => {
  const { auctionId } = await params;
  const apiUrl = process.env.NEXT_API_URL;

  try {
    // 백엔드 SSE 서버에 연결
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 백엔드에서 받은 SSE 스트림을 그대로 클라이언트로 전달
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
