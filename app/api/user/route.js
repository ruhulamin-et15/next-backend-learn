import { users } from "@/lib/db";
import { NextResponse } from "next/server";

//get all users
export async function GET() {
  return NextResponse.json(users);
}
