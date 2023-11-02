// create api to clear out the token

import { NextResponse } from "next/server";

export async function GET() {
  try {
    // creating a response object
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
