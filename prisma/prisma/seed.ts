import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const pwd = await hash("Ch1k@ms__00", 10)
  await prisma.user.upsert({
    where: { email: "pocket-investie@gmail.com" },
    update: { password: pwd, role: "admin" },
    create: {
      email: "pocket-investie@gmail.com",
      password: pwd,
      role: "admin",
    },
  })
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect())
