import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    async function main() {
        // Add prisma queries here
        // const allUsers = await prisma.TeamPerformance.findMany()
        // console.log(allUsers)
      }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })