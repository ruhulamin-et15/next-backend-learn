import connectDB from "@/lib/mongodb";
import Contact from "@/models/contact";
import { NextResponse } from "next/server";

//get single message using id
export const GET = async (req) => {
  try {
    await connectDB();
    const id = req.url.split("contact/")[1];
    const singleMessage = await Contact.findById(id);
    if (!singleMessage) {
      return NextResponse.json(
        { message: "message not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "OK", singleMessage });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
};

//delete message using id
export const DELETE = async (req) => {
  try {
    await connectDB();
    const id = req.url.split("contact/")[1];
    const deleteMessage = await Contact.findByIdAndDelete(id);
    if (!deleteMessage) {
      return NextResponse.json({ message: "failed to delete message" });
    }
    return NextResponse.json({ message: "message deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
};

// Update message by ID
export const PUT = async (req, res) => {
  try {
    await connectDB();
    const id = req.url.split("contact/")[1];
    const { fullname, email, message } = await req.json();
    const updatedUser = await Contact.findByIdAndUpdate(
      id,
      { $set: { fullname, email, message } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "user not found" });
    } else {
      return NextResponse.json({
        message: "User updated successfully",
        user: updatedUser,
      });
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", error });
  }
};
