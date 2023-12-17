import { users } from "@/lib/db";
import { NextResponse } from "next/server";

//get single user
export function GET(request, par) {
  const singleData = users.filter((item) => item.id == par.params.id);

  if (singleData.length === 0) {
    return NextResponse.json({ message: "no data found" }, { status: 404 });
  }
  return NextResponse.json(singleData);
}
