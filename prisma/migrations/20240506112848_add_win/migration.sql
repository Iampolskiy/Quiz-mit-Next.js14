/*
  Warnings:

  - You are about to drop the column `name` on the `incorectAnswers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "incorectAnswers" DROP COLUMN "name",
ADD COLUMN     "win" BOOLEAN;
