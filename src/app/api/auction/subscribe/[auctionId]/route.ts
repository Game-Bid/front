// import { NextRequest } from "next/server";

// export const runtime = "edge";
// export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ auctionId: string }> }
) => {
  const { auctionId } = await params;
  const apiUrl = process.env.NEXT_API_URL;

  // 디버깅용 로그
  console.log("SSE Proxy - AuctionId:", auctionId);
  console.log("SSE Proxy - API URL:", apiUrl);

  try {
    const response = await fetch(
      `${apiUrl}/api/v1/auction/subscribe/${auctionId}`,
      {
        headers: {
          Accept: "text/event-stream",
          "Cache-Control": "no-cache",
          // Connection 헤더 제거 (Edge Runtime에서 문제될 수 있음)
        },
      }
    );

    console.log("SSE Proxy - Response status:", response.status);
    console.log(
      "SSE Proxy - Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SSE Proxy - Backend error:", errorText);
      throw new Error(`SSE 요청 실패: ${response.status} - ${errorText}`);
    }

    if (!response.body) {
      throw new Error("No response body");
    }

    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        // Connection: "keep-alive", // 제거
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Cache-Control",
        "X-Accel-Buffering": "no", // 프록시 버퍼링 방지
      },
    });
  } catch (error) {
    console.error("SSE Proxy Error:", error);
    return new Response(
      `Proxy Error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }
};

// export const GET = async (
//   request: NextRequest,
//   { params }: { params: Promise<{ auctionId: string }> }
// ) => {
//   const { auctionId } = await params;
//   const apiUrl = process.env.NEXT_API_URL;

//   try {
//     const response = await fetch(
//       `${apiUrl}/api/v1/auction/subscribe/${auctionId}`,
//       {
//         headers: {
//           Accept: "text/event-stream",
//           "Cache-Control": "no-cache",
//           Connection: "keep-alive",
//         },
//       }
//     );

//     if (!response.ok || !response.body) {
//       throw new Error(`SSE 요청 실패: ${response.status}`);
//     }

//     return new Response(response.body, {
//       headers: {
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache",
//         Connection: "keep-alive",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET",
//         "Access-Control-Allow-Headers": "Cache-Control",
//       },
//     });
//   } catch (error) {
//     console.error("SSE Proxy Error:", error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// };

// import { NextRequest } from "next/server";

// export const runtime = "edge";
// export const dynamic = "force-dynamic";

// export const GET = async (
//   req: NextRequest,
//   { params }: { params: Promise<{ auctionId: string }> }
// ) => {
//   const { auctionId } = await params;
//   const apiUrl = process.env.NEXT_API_URL;
//   const url = `${apiUrl}/api/v1/auction/subscribe/${auctionId}`;

//   const { readable, writable } = new TransformStream();
//   const writer = writable.getWriter();
//   // const encoder = new TextEncoder();

//   try {
//     const response = await fetch(url, {
//       headers: {
//         Accept: "text/event-stream",
//         "Cache-Control": "no-cache",
//         Connection: "keep-alive",
//       },
//     });

//     if (!response.ok || !response.body) {
//       throw new Error(`SSE 요청 실패: ${response.status}`);
//     }

//     const reader = response.body.getReader();

//     const pump = async () => {
//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
//         await writer.write(value);
//       }
//       writer.close();
//     };

//     pump().catch((err) => {
//       console.error("SSE Proxy Streaming Error:", err);
//       writer.close();
//     });

//     return new Response(readable, {
//       headers: {
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache",
//         Connection: "keep-alive",
//       },
//     });
//   } catch (err) {
//     console.error("SSE Proxy Error:", err);
//     writer.close();
//     return new Response("Internal Server Error", { status: 500 });
//   }
// };
