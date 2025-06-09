import { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

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
