import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, password, name } = await req.json()

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 })
  }

  const hashedPassword = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: "user",
    },
  })

  return NextResponse.json(
    {
      message: "User registered successfully",
      user: { id: user.id, email: user.email },
    },
    { status: 201 }
  )
    }
