import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const res = await fetch("http://43.200.179.173:8080/api/v1/games");

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "game Api 응답 에러",
          status: res.status,
          statusText: res.statusText,
        },
        { status: res.status }
      );
    }
    const result = await res.json();

    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "game API 요청 실패", errorMessage: err },
      { status: 500 }
    );
  }
};
