import { NextResponse } from "next/server";

//api route
export async function GET() {
  return NextResponse.json("api is working");
}
