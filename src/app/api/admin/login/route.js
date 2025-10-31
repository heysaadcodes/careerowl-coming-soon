import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "support@thecareerowl.ca";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "careerowl123";
    const JWT_SECRET = process.env.JWT_SECRET || "your-fallback-secret-here";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate JWT token
      const token = jwt.sign(
        {
          email: email,
          isAdmin: true
        },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      return NextResponse.json(
        {
          message: "Login successful",
          isAdmin: true,
          token: token, // This is the crucial part - return the token
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}