import validateEmail from "@/app/helpers/validateEmail";
import validatePassword from "@/app/helpers/validatePassword";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  // Read data off req body
  const body = await request.json();
  const { email, password } = body;

  // Validate data
  if (!validateEmail(email) || !validatePassword(password))
    return NextResponse.json(
      {
        message: "Invalid email or password",
      },
      { status: 400 }
    );

  // Lookup the user
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "Invalid email or password",
      },
      { status: 400 }
    );
  }

  // Compare password
  const isCorrectPassword = bcrypt.compareSync(password, user.password);

  if (!isCorrectPassword) {
    return NextResponse.json(
      {
        message: "Invalid email or password",
      },
      { status: 400 }
    );
  }

  // Create jwt token

  // Respond with it

  return Response;
}
