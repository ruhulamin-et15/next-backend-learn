import { users } from "@/lib/db";
import { NextResponse } from "next/server";

//get single data using id
export const GET = async (req) => {
  try {
    const id = req.url.split("crud/")[1];

    const singleData = users.filter((user) => user.id.toString() === id);

    if (singleData.length === 0) {
      return NextResponse.json({ message: "no data found" }, { status: 404 });
    }
    return NextResponse.json({ message: "OK", singleData });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
};

// user delete using id
export const DELETE = async (req) => {
  try {
    const id = req.url.split("crud/")[1];

    //find the index of the user to delete
    const userIndex = users.findIndex((user) => user.id.toString() === id);
    if (userIndex === -1) {
      return NextResponse.json(
        { message: "error", error: "user not found" },
        { status: 404 }
      );
    }
    //remove the user from users Array
    users.splice(userIndex, 1);
    return NextResponse.json(
      { message: "user deleted successfully", users },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
};

// user update using id
export const PUT = async (req) => {
  try {
    const id = req.url.split("crud/")[1];
    const { username } = await req.json();
    const user = users.find((user) => user.id.toString() === id);
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    //updating part
    user.username = username;
    return NextResponse.json(
      { message: "user updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
};
