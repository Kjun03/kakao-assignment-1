import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}/todos`;
    
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("POST 프록시 에러:", error);
    return NextResponse.json({ error: "백엔드 통신 실패" }, { status: 500 });
  }
}