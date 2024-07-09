import { connectToMongoDB } from "@/dbconfig/dbconfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";

import bcryptjs from 'bcryptjs';

connectToMongoDB();

// POST
export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const {username, email, password} = req

        const user = await User.findOne({email})
        if (user) {
            return NextResponse.json({
                error: 'User with email already exists'
            }, {status: 400})
        }
        // hashing
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const NewUser = new User({
            username, 
            email,
            password: hashedPassword
        })

        const savedUser = await NewUser.save()

        return NextResponse.json({
            message: 'User Created',
            success: true,
            savedUser
        })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {status: 500})
    }
}