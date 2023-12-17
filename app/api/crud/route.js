import { users } from "@/lib/db";
import { NextResponse } from "next/server";

//get all users
export const GET = async (req, res) => {
  try {
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

//create user
export const POST = async (req, res) => {
  const { name } = await req.json();
  try {
    const newData = { name };
    newData.id = users.length + 1;
    users.push(newData);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
