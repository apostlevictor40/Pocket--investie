import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { amount, email } = await req.json()

  if (!amount || !email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const investment = await prisma.investment.create({
    data: {
      email,
      amount: Math.floor(Number(amount) * 100),
      status: "pending",
    },
  })

  return NextResponse.json({ message: "Investment recorded", investment }, { status: 201 })
    }
