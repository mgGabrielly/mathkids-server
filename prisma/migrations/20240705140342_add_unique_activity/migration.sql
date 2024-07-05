/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `activities` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "activities_description_key" ON "activities"("description");
