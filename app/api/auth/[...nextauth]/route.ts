import { connectToMongoDB } from "@/lib/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { Account, User as AuthUser, getServerSession } from "next-auth";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  // session default is "jwt" --> encrypted JWT = JWE
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectToMongoDB();
        if (!credentials) return null
        const { email, password } = credentials
        const user = await User.findOne({email});
        if (user && await bcryptjs.compare(password, user.password)) {
          return { id: user.id, username: user.username, email: user.email }
        } else {
          throw new Error('Invalid credentials')
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id
  //     }
  //     return token
  //   },
  //   async session({ session, token }) {
  //     if (token) {
  //       session.user.id = token.id
  //     }
  //     return session
  //   }
  // },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
export const getAuth = () => getServerSession(authOptions)