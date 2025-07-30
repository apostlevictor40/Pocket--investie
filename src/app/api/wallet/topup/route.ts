import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, amount } = await req.json()

  if (!email || !amount) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const updated = await prisma.user.update({
    where: { email },
    data: {
      wallet: {
        increment: Math.floor(Number(amount) * 100),
      },
    },
  })

  return NextResponse.json({
    message: "Wallet topped up successfully",
    wallet: updated.wallet,
  })
    }
