import { connectToMongoDB } from "@/lib/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";

connectToMongoDB();

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "User with email already exists",
        },
        { status: 400 }
      );
    }
    // hashing
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const NewUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const newUser = await NewUser.save();

    return NextResponse.json({
      message: "User Created",
      success: true,
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
