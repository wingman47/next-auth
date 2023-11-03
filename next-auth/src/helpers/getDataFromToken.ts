import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// used to extract user data for profile page (through "me" route)
export const getDataFromToken = (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET!
    );
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
