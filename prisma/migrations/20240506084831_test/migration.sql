-- CreateTable
CREATE TABLE "incorectAnswers" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "score" INTEGER,
    "name" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "incorectAnswers_pkey" PRIMARY KEY ("id")
);
