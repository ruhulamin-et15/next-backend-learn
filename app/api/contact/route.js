import connectDB from "@/lib/mongodb";
import Contact from "@/models/contact";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//create
export const POST = async (req) => {
  try {
    const { fullname, email, message } = await req.json();

    try {
      await connectDB();
      await Contact.create({ fullname, email, message });
      return NextResponse.json({ msg: ["message sent successfully"] });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        let errorList = [];
        for (let e in error.errors) {
          errorList.push(error.errors[e].message);
        }
        return NextResponse.json({ msg: errorList });
      } else {
        return NextResponse.json({ msg: ["Unable to send message"] });
      }
    }
  } catch (error) {
    return NextResponse.json(error);
  }
};

//get all message
export const GET = async (req) => {
  try {
    await connectDB();
    const messages = await Contact.find({});
    return NextResponse.json(messages);
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
