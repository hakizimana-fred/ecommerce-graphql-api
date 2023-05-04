import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const connectDb = async () => {
  try {
    await prisma.$connect();
    console.log(`successfully connected to db`);
  } catch (e) {
    console.log(`failed to connect to db`);
    process.exit(1);
  }
};
