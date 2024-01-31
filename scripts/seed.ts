const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "프로그래밍" },
        { name: "영어" },
        { name: "수학" },
        { name: "과학" },
        { name: "미술" },
        { name: "음악" },
        { name: "스포츠" },
        { name: "기타" },
      ],
    });
    console.log("Seeding finished.");
  } catch (error) {
    console.log("Error seeding the database: ", error);
  } finally {
    await db.$disconnect();
  }
}

main();
