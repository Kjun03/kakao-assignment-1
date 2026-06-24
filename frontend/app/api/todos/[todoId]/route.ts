import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ todoId: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.todoId;
    const body = await request.json();

    const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`;

    const response = await fetch(BACKEND_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("PUT 프록시 에러:", error);
    return NextResponse.json({ error: "백엔드 통신 실패" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ todoId: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.todoId;

    const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`;

    const response = await fetch(BACKEND_URL, {
      method: "DELETE",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("DELETE 프록시 에러:", error);
    return NextResponse.json({ error: "백엔드 통신 실패" }, { status: 500 });
  }
}