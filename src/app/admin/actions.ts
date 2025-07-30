import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// ✅ Mark an investment as paid
export async function markInvestmentAsPaid(investmentId: string) {
  return await prisma.investment.update({
    where: { id: investmentId },
    data: {
      status: "paid",
    },
  })
}

// ✅ Top up a user's wallet (admin action)
export async function adminTopUpWallet(email: string, amount: number) {
  return await prisma.user.update({
    where: { email },
    data: {
      wallet: {
        increment: Math.floor(amount * 100), // Convert to Kobo
      },
    },
  })
}

// ✅ Fetch all users (for admin dashboard)
export async function fetchAllUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  })
}

// ✅ Fetch all investments (for admin dashboard)
export async function fetchAllInvestments() {
  return await prisma.investment.findMany({
    orderBy: { createdAt: "desc" },
  })
}

// ✅ Fetch user by email (for profile display or lookup)
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  })
        }
